// Único punto de entrada de NEA: portada, secciones, artículos, páginas, sitemaps y RSS (ver rewrites en vercel.json).
const nea = require("../lib/nea");

// Vercel guarda la respuesta 5 minutos y, si la API de Kelatos no responde, sigue sirviendo la última copia hasta 1 día.
const CACHE_OK = "public, s-maxage=300, stale-while-revalidate=86400";
const CACHE_CORTA = "public, s-maxage=60, stale-while-revalidate=600";

module.exports = async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return res.status(405).send("Método no permitido");
  const q = req.query || {};
  const r = String(q.r || "");
  const html = () => res.setHeader("Content-Type", "text/html; charset=utf-8");
  const xmlT = (t = "application/xml") => res.setHeader("Content-Type", `${t}; charset=utf-8`);
  const noEncontrado = () => { html(); res.setHeader("Cache-Control", CACHE_CORTA); return res.status(404).send(nea.renderNoEncontrado()); };

  try {
    if (r === "pagina") {
      const out = nea.renderPagina(String(q.p || ""));
      if (!out) return noEncontrado();
      html(); res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
      return res.status(200).send(out);
    }
    if (r === "404") return noEncontrado();

    if (r === "articulo") {
      const slug = String(q.slug || "").toLowerCase();
      const a = await nea.articulo(slug);
      if (!a) return noEncontrado();
      const buena = nea.urlDe(a);
      if (`/${q.s}/${slug}` !== buena) { res.setHeader("Cache-Control", CACHE_OK); return res.redirect(301, buena); } // sección equivocada en la URL
      const todos = await nea.listaArticulos().catch(() => []);
      html(); res.setHeader("Cache-Control", CACHE_OK);
      return res.status(200).send(await nea.renderArticulo(a, todos));
    }

    const posts = await nea.listaArticulos();
    res.setHeader("Cache-Control", CACHE_OK);
    switch (r) {
      case "portada": html(); return res.status(200).send(nea.renderPortada(posts));
      case "seccion": {
        const s = nea.seccionPorSlug(String(q.s || ""));
        const pag = Math.max(1, parseInt(q.pagina, 10) || 1);
        const out = s && nea.renderSeccion(s, posts, pag);
        if (!out) return noEncontrado();
        html(); return res.status(200).send(out);
      }
      case "sitemap": xmlT(); return res.status(200).send(nea.renderSitemap(posts));
      case "news": res.setHeader("Cache-Control", CACHE_CORTA); xmlT(); return res.status(200).send(nea.renderNewsSitemap(posts));
      case "rss": {
        const s = q.s ? nea.seccionPorSlug(String(q.s)) : null;
        if (q.s && !s) return noEncontrado();
        xmlT("application/rss+xml"); return res.status(200).send(nea.renderRss(posts, s));
      }
      default: return noEncontrado();
    }
  } catch (e) {
    console.error("nea:", r, e && e.message);
    res.setHeader("Cache-Control", "no-store");
    if (r === "portada") { html(); return res.status(200).send(nea.renderPortada([])); }
    if (r === "sitemap") { xmlT(); return res.status(200).send(nea.renderSitemap([])); }
    return res.status(503).send("NEA no está disponible ahora mismo. Inténtalo de nuevo en unos minutos.");
  }
};
