// NEA (nea.com.es): periódico digital generado en el servidor (Vercel).
//
// Los artículos NO viven en este repositorio: los escribe el agente IA de Kelatos (Agentes V2) y se leen en vivo de la API
// pública, igual que los blogs del resto de webs de la familia:
//   GET {API}?org=<NEA_ORG>          -> lista de artículos publicados
//   GET {API}/<slug>?org=<NEA_ORG>   -> un artículo (texto en Markdown)
// La «category» de cada artículo decide su sección (ver lib/secciones.js).
//
// La organización «nea» ya existe en Agentes V2 (org 81, modo «medio»): es el valor por defecto. NEA_ORG en Vercel solo hace
// falta para apuntar a otra organización (p. ej. pruebas). OJO: con una clave desconocida la API devuelve los artículos de OTRA
// organización.

const { SECCIONES, seccionDe, seccionPorSlug } = require("./secciones");

const API = (process.env.KELATOS_BLOG_API || "https://db.affirmatechnology.com/kelatos-api/publico/blog").replace(/\/$/, "");
const ORG = (process.env.NEA_ORG || "nea").trim();
const SITIO = "https://www.nea.com.es"; // dominio principal en Vercel (nea.com.es redirige a www)
const NOMBRE = "NEA";
const LEMA = "Noticias de España y del mundo";
const REDACCION = "Redacción NEA";
const POR_PAGINA = 20;

// ── Utilidades ──
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const xml = esc;
const TZ = "Europe/Madrid";
const fechaHora = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const f = d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", timeZone: TZ }).replace(".", "");
  const h = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
  return `${f} · ${h}`;
};
const hora = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: TZ }); };
const hoyLargo = () => { const s = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ }); return s.charAt(0).toUpperCase() + s.slice(1); };
const isoDe = (p) => p.published_at || (p.date ? `${String(p.date).slice(0, 10)}T08:00:00Z` : new Date().toISOString());
const isoMod = (p) => (p.updated && String(p.updated).slice(0, 10) !== String(p.date || "").slice(0, 10) ? `${String(p.updated).slice(0, 10)}T08:00:00Z` : isoDe(p));
const urlDe = (p) => `/${seccionDe(p.category).slug}/${p.slug}`;
const recortar = (s, n) => { s = String(s || ""); return s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…"; };

// ── Fuente de datos ──
async function pedir(ruta) {
  const r = await fetch(`${API}${ruta}${ruta.includes("?") ? "&" : "?"}org=${encodeURIComponent(ORG)}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`La API respondió ${r.status}`);
  return r.json();
}
let fuente = {
  async lista() {
    if (!ORG) return [];
    const j = await pedir("");
    return (j && Array.isArray(j.posts) ? j.posts : []).filter((p) => p && p.slug && p.title);
  },
  async uno(slug) {
    if (!ORG) return null;
    const j = await pedir(`/${slug}`);
    return j && j.post && j.post.body ? j.post : null;
  },
};
/** Solo para la vista previa local (scripts/preview): sustituye la API por datos de ejemplo. */
const usarFuente = (f) => { fuente = f; };

/** Artículos publicados, del más reciente al más antiguo. */
async function listaArticulos() {
  return (await fuente.lista()).sort((a, b) => isoDe(b).localeCompare(isoDe(a)));
}
async function articulo(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return fuente.uno(slug);
}

// ── Markdown → HTML (se descarta el HTML en bruto) ──
let marked = null;
async function aHtml(md) {
  if (!marked) { const { Marked } = await import("marked"); marked = new Marked({ gfm: true, breaks: false, renderer: { html: () => "" } }); }
  return marked.parse(String(md || ""))
    .replace(/<a href="(https?:\/\/(?!(?:www\.)?nea\.com\.es)[^"]+)"/g, '<a rel="noopener" target="_blank" href="$1"')
    .replace(/<h1>/g, "<h2>").replace(/<\/h1>/g, "</h2>")
    .replace(/<table>/g, '<div class="tabla"><table>').replace(/<\/table>/g, "</table></div>");
}

// ── Piezas comunes ──
const LOGO = (clase = "logo", src = "/assets/logo.svg") => `<img class="${clase}" src="${src}" width="172" height="60" alt="${NOMBRE}">`;
const ORGANIZACION = {
  "@type": "NewsMediaOrganization",
  "@id": `${SITIO}/#organizacion`,
  name: NOMBRE,
  url: `${SITIO}/`,
  logo: { "@type": "ImageObject", url: `${SITIO}/assets/logo-600x60.png`, width: 600, height: 60 },
  publishingPrinciples: `${SITIO}/politica-editorial`,
  correctionsPolicy: `${SITIO}/politica-editorial#correcciones`,
  ethicsPolicy: `${SITIO}/politica-editorial`,
  masthead: `${SITIO}/quienes-somos`,
  actionableFeedbackPolicy: `${SITIO}/politica-editorial#correcciones`,
};
const WEBSITE = { "@type": "WebSite", "@id": `${SITIO}/#web`, url: `${SITIO}/`, name: NOMBRE, alternateName: "NEA Noticias", inLanguage: "es-ES", publisher: { "@id": ORGANIZACION["@id"] } };
const migas = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITIO}${url}` })) });

function cabecera(activa) {
  const enlaces = SECCIONES.map((s) => `<li><a href="/${s.slug}"${s.slug === activa ? ' aria-current="page"' : ""}>${esc(s.nombre)}</a></li>`).join("");
  return `<a class="saltar" href="#contenido">Saltar al contenido</a>
<div class="franja"><div class="wrap franja-in"><span class="hoy">${esc(hoyLargo())}</span><span class="franja-links"><a href="/quienes-somos">Quiénes somos</a><a href="/rss.xml">RSS</a></span></div></div>
<header class="cab">
  <div class="wrap cab-in">
    <button class="btn-menu" type="button" aria-controls="cajon" aria-expanded="false"><span class="hamb" aria-hidden="true"></span><span class="btn-menu-txt">Secciones</span></button>
    <a class="marca" href="/" aria-label="${NOMBRE}, ir a la portada">${LOGO()}</a>
    <span class="lema">${LEMA}</span>
  </div>
  <nav class="secs" aria-label="Secciones"><div class="wrap"><ul>${enlaces}</ul></div></nav>
</header>
<div class="cajon" id="cajon" hidden>
  <div class="cajon-fondo" data-cerrar></div>
  <aside class="cajon-panel" aria-label="Todas las secciones">
    <div class="cajon-cab">${LOGO("logo logo-s")}<button class="cajon-x" type="button" data-cerrar aria-label="Cerrar">×</button></div>
    <ul>${SECCIONES.map((s) => `<li><a href="/${s.slug}">${esc(s.nombre)}</a></li>`).join("")}</ul>
    <div class="cajon-pie"><a href="/quienes-somos">Quiénes somos</a><a href="/politica-editorial">Política editorial</a></div>
  </aside>
</div>`;
}

function pie() {
  const cols = [SECCIONES.slice(0, 5), SECCIONES.slice(5, 10), SECCIONES.slice(10)];
  return `<footer class="pie">
  <div class="wrap">
    <div class="pie-top">
      <div class="pie-marca">${LOGO("logo logo-inv", "/assets/logo-blanco.svg")}<p>${LEMA}. Información clara, contrastada y explicada, cada día.</p></div>
      ${cols.map((c) => `<ul class="pie-col">${c.map((s) => `<li><a href="/${s.slug}">${esc(s.nombre)}</a></li>`).join("")}</ul>`).join("")}
    </div>
    <div class="pie-bot">
      <nav aria-label="Información legal"><a href="/quienes-somos">Quiénes somos</a><a href="/politica-editorial">Política editorial</a><a href="/aviso-legal">Aviso legal</a><a href="/privacidad">Privacidad</a><a href="/cookies">Cookies</a><a href="/rss.xml">RSS</a></nav>
      <p>© ${new Date().getFullYear()} ${NOMBRE}. NEA utiliza herramientas de inteligencia artificial en la elaboración de sus contenidos. <a href="/politica-editorial#ia">Más información</a>.</p>
    </div>
  </div>
</footer>
<script>
(function(){var c=document.getElementById("cajon"),b=document.querySelector(".btn-menu");if(!c||!b)return;
function abrir(){c.hidden=false;b.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";}
function cerrar(){c.hidden=true;b.setAttribute("aria-expanded","false");document.body.style.overflow="";}
b.addEventListener("click",abrir);c.addEventListener("click",function(e){if(e.target.closest("[data-cerrar]")||e.target.closest("a"))cerrar();});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!c.hidden)cerrar();});
var cp=document.querySelector("[data-copiar]");if(cp)cp.addEventListener("click",function(){navigator.clipboard&&navigator.clipboard.writeText(location.href).then(function(){cp.textContent="Enlace copiado";});});})();
</script>`;
}

function pagina({ titulo, descripcion, ruta, imagen, tipoOg = "website", jsonld = [], cuerpo, noindex = false, activa = "", extraHead = "" }) {
  const canonical = `${SITIO}${ruta}`;
  const img = imagen || `${SITIO}/assets/og.png`;
  const robots = noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:site_name" content="${NOMBRE}"><meta property="og:locale" content="es_ES"><meta property="og:type" content="${tipoOg}">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(descripcion)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(img)}">
<meta name="twitter:card" content="summary_large_image">
${extraHead}
<meta name="theme-color" content="#111418">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="${NOMBRE}" href="${SITIO}/rss.xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&display=swap">
<link rel="stylesheet" href="/assets/nea.css">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": [ORGANIZACION, WEBSITE, ...jsonld] }).replace(/</g, "\\u003c")}</script>
</head>
<body>
${cabecera(activa)}
<main id="contenido">
${cuerpo}
</main>
${pie()}
</body>
</html>`;
}

// ── Piezas de noticia ──
function foto(p, tam = "", carga = "lazy") {
  if (p.image) return `<img class="foto${tam}" src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="${carga}" decoding="async"${carga === "eager" ? ' fetchpriority="high"' : ""} width="1200" height="675">`;
  const s = seccionDe(p.category);
  return `<div class="foto${tam} foto-vacia" aria-hidden="true"><span>${esc(s.nombre)}</span></div>`;
}
const antetitulo = (p) => { const s = seccionDe(p.category); return `<a class="ante" href="/${s.slug}">${esc(s.nombre)}</a>`; };
const firma = (p) => `<p class="firma"><span>${REDACCION}</span><time datetime="${esc(isoDe(p))}">${esc(fechaHora(isoDe(p)))}</time></p>`;

function tarjeta(p, { tipo = "normal", carga = "lazy", hTag = "h3" } = {}) {
  const url = urlDe(p);
  if (tipo === "lista") {
    return `<article class="t t-lista">${antetitulo(p)}<${hTag} class="tit"><a href="${url}">${esc(p.title)}</a></${hTag}></article>`;
  }
  if (tipo === "apertura") {
    return `<article class="t t-apertura"><a class="t-img" href="${url}" tabindex="-1" aria-hidden="true">${foto(p, " foto-g", carga)}</a>
<div class="t-txt">${antetitulo(p)}<${hTag} class="tit"><a href="${url}">${esc(p.title)}</a></${hTag}><p class="entradilla">${esc(p.description)}</p>${firma(p)}</div></article>`;
  }
  const conEntradilla = tipo === "destacada";
  return `<article class="t t-${tipo}"><a class="t-img" href="${url}" tabindex="-1" aria-hidden="true">${foto(p, "", carga)}</a>
${antetitulo(p)}<${hTag} class="tit"><a href="${url}">${esc(p.title)}</a></${hTag}>${conEntradilla ? `<p class="entradilla">${esc(recortar(p.description, 170))}</p>` : ""}${firma(p)}</article>`;
}

const ultimaHora = (lista) => `<aside class="ultima" aria-labelledby="ult-tit"><h2 class="cinta" id="ult-tit"><span class="punto"></span>Lo último</h2><ol>
${lista.map((p) => `<li><time datetime="${esc(isoDe(p))}">${esc(hora(isoDe(p)))}</time><div>${antetitulo(p)}<a class="ult-tit" href="${urlDe(p)}">${esc(p.title)}</a></div></li>`).join("\n")}
</ol></aside>`;

function bloqueSeccion(s, posts) {
  const [a, ...resto] = posts;
  return `<section class="bloque" aria-labelledby="b-${s.slug}">
  <h2 class="bloque-tit" id="b-${s.slug}"><a href="/${s.slug}">${esc(s.nombre)}</a><a class="mas" href="/${s.slug}">Ver todo <span aria-hidden="true">→</span></a></h2>
  <div class="bloque-grid${resto.length ? "" : " solo"}">${tarjeta(a, { tipo: "destacada" })}${resto.length ? `<div class="bloque-col">${resto.map((p) => tarjeta(p)).join("")}</div>` : ""}</div>
</section>`;
}

// ── Portada ──
function renderPortada(posts) {
  const jsonld = [{ "@type": "WebPage", "@id": `${SITIO}/#portada`, url: `${SITIO}/`, name: `${NOMBRE}: ${LEMA}`, isPartOf: { "@id": WEBSITE["@id"] }, inLanguage: "es-ES" }];
  const titulo = `${NOMBRE} | Noticias de última hora de España y del mundo`;
  const descripcion = "NEA, periódico digital: noticias de última hora y actualidad de España, internacional, economía, sociedad, ciencia, tecnología, cultura y deportes, explicadas con contexto.";
  let cuerpo;
  if (!posts.length) {
    cuerpo = `<h1 class="oculto">${NOMBRE}: noticias de última hora de España y del mundo</h1>
<section class="wrap pronto">
  <p class="ante">Edición digital</p>
  <p class="pronto-tit">La actualidad, explicada con calma.</p>
  <p class="pronto-txt">NEA es un periódico digital de información general. Muy pronto encontrarás aquí las noticias del día de España y del mundo, organizadas por secciones.</p>
  <ul class="pronto-secs">${SECCIONES.map((s) => `<li><a href="/${s.slug}"><strong>${esc(s.nombre)}</strong><span>${esc(recortar(s.desc.split(":").pop().trim(), 80))}</span></a></li>`).join("")}</ul>
</section>`;
  } else {
    const [lead, s1, s2, ...resto] = posts;
    const fila = resto.slice(0, 4);
    const usados = new Set([lead, s1, s2, ...fila].filter(Boolean).map((p) => p.slug));
    const ult = posts.slice(0, 10);
    const bloques = SECCIONES.map((s) => {
      const delaSec = posts.filter((p) => seccionDe(p.category).slug === s.slug && !usados.has(p.slug)).slice(0, 4);
      return delaSec.length ? bloqueSeccion(s, delaSec) : "";
    }).join("");
    cuerpo = `<h1 class="oculto">${NOMBRE}: noticias de última hora de España y del mundo</h1>
<div class="wrap">
  <section class="apertura" aria-label="Noticias principales">
    <div class="apertura-main">${tarjeta(lead, { tipo: "apertura", carga: "eager", hTag: "h2" })}
      ${s1 || s2 ? `<div class="apertura-sec">${[s1, s2].filter(Boolean).map((p) => tarjeta(p, { tipo: "destacada", hTag: "h2" })).join("")}</div>` : ""}
    </div>
    ${ultimaHora(ult)}
  </section>
  ${fila.length ? `<section class="fila" aria-label="Más noticias">${fila.map((p) => tarjeta(p)).join("")}</section>` : ""}
  ${bloques}
</div>`;
  }
  return pagina({ titulo, descripcion, ruta: "/", jsonld, cuerpo });
}

// ── Sección ──
function renderSeccion(s, todos, pag = 1) {
  const posts = todos.filter((p) => seccionDe(p.category).slug === s.slug);
  const total = Math.max(1, Math.ceil(posts.length / POR_PAGINA));
  if (pag > total) return null;
  const trozo = posts.slice((pag - 1) * POR_PAGINA, pag * POR_PAGINA);
  const ruta = pag > 1 ? `/${s.slug}?pagina=${pag}` : `/${s.slug}`;
  const titulo = pag > 1 ? `${s.nombre}: últimas noticias (página ${pag}) | ${NOMBRE}` : `${s.nombre}: últimas noticias y actualidad | ${NOMBRE}`;
  const jsonld = [
    { "@type": "CollectionPage", "@id": `${SITIO}${ruta}#pagina`, url: `${SITIO}${ruta}`, name: `${s.nombre} | ${NOMBRE}`, description: s.desc, isPartOf: { "@id": WEBSITE["@id"] }, inLanguage: "es-ES",
      mainEntity: { "@type": "ItemList", itemListElement: trozo.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITIO}${urlDe(p)}` })) } },
    migas([["Portada", "/"], [s.nombre, `/${s.slug}`]]),
  ];
  const nav = total > 1 ? `<nav class="paginas" aria-label="Páginas">${pag > 1 ? `<a rel="prev" href="/${s.slug}${pag > 2 ? `?pagina=${pag - 1}` : ""}">← Más recientes</a>` : "<span></span>"}<span>Página ${pag} de ${total}</span>${pag < total ? `<a rel="next" href="/${s.slug}?pagina=${pag + 1}">Anteriores →</a>` : "<span></span>"}</nav>` : "";
  let lista;
  if (!trozo.length) lista = `<p class="vacio">Todavía no hay noticias publicadas en ${esc(s.nombre)}. Vuelve muy pronto o consulta la <a href="/">portada</a>.</p>`;
  else if (pag === 1) {
    const [a, b, c, ...resto] = trozo;
    lista = `<div class="sec-top">${tarjeta(a, { tipo: "apertura", carga: "eager", hTag: "h2" })}<div class="sec-top-col">${[b, c].filter(Boolean).map((p) => tarjeta(p, { hTag: "h2" })).join("")}</div></div>
<div class="sec-rejilla">${resto.map((p) => tarjeta(p, { tipo: "destacada", hTag: "h2" })).join("")}</div>`;
  } else lista = `<div class="sec-rejilla">${trozo.map((p) => tarjeta(p, { tipo: "destacada", hTag: "h2" })).join("")}</div>`;
  const cuerpo = `<div class="wrap">
  <header class="sec-cab"><h1>${esc(s.nombre)}</h1><p>${esc(s.desc)}</p></header>
  ${lista}
  ${nav}
</div>`;
  return pagina({ titulo, descripcion: s.desc, ruta, jsonld, cuerpo, noindex: !trozo.length, activa: s.slug,
    extraHead: `<link rel="alternate" type="application/rss+xml" title="${NOMBRE} · ${esc(s.nombre)}" href="${SITIO}/rss/${s.slug}.xml">` });
}

// ── Artículo ──
async function renderArticulo(p, todos) {
  const s = seccionDe(p.category);
  const url = urlDe(p);
  const html = await aHtml(p.body);
  const pub = isoDe(p), mod = isoMod(p);
  const relacionados = todos.filter((x) => x.slug !== p.slug && seccionDe(x.category).slug === s.slug).slice(0, 4);
  const masLeer = relacionados.length < 4 ? todos.filter((x) => x.slug !== p.slug && !relacionados.includes(x)).slice(0, 4 - relacionados.length) : [];
  const enlace = encodeURIComponent(`${SITIO}${url}`), texto = encodeURIComponent(p.title);
  const jsonld = [
    { "@type": "NewsArticle", "@id": `${SITIO}${url}#articulo`, mainEntityOfPage: `${SITIO}${url}`, headline: recortar(p.title, 110), description: p.description,
      image: p.image ? [p.image] : [`${SITIO}/assets/og.png`], datePublished: pub, dateModified: mod, articleSection: s.nombre, inLanguage: "es-ES",
      keywords: [p.keyword, ...(p.tags || [])].filter(Boolean).join(", "), wordCount: String(p.body || "").split(/\s+/).length, isAccessibleForFree: true,
      author: [{ "@type": "Organization", name: REDACCION, url: `${SITIO}/quienes-somos` }], publisher: { "@id": ORGANIZACION["@id"] } },
    migas([["Portada", "/"], [s.nombre, `/${s.slug}`], [p.title, url]]),
  ];
  const extraHead = `<meta property="article:published_time" content="${esc(pub)}"><meta property="article:modified_time" content="${esc(mod)}"><meta property="article:section" content="${esc(s.nombre)}">${(p.tags || []).map((t) => `<meta property="article:tag" content="${esc(t)}">`).join("")}`;
  const cuerpo = `<article class="nota">
  <div class="wrap nota-cab">
    <nav class="migas" aria-label="Ruta"><a href="/">Portada</a><span aria-hidden="true">›</span><a href="/${s.slug}">${esc(s.nombre)}</a></nav>
    <h1>${esc(p.title)}</h1>
    <p class="nota-entradilla">${esc(p.description)}</p>
    <div class="nota-meta">
      <p class="firma"><span>${REDACCION}</span><time datetime="${esc(pub)}">${esc(fechaHora(pub))}</time>${mod !== pub ? `<span class="act">Actualizado: <time datetime="${esc(mod)}">${esc(fechaHora(mod))}</time></span>` : ""}${p.readingMinutes ? `<span>${Number(p.readingMinutes)} min de lectura</span>` : ""}</p>
      <div class="compartir" aria-label="Compartir">
        <a href="https://api.whatsapp.com/send?text=${texto}%20${enlace}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="https://x.com/intent/post?text=${texto}&url=${enlace}" target="_blank" rel="noopener">X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${enlace}" target="_blank" rel="noopener">Facebook</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${enlace}" target="_blank" rel="noopener">LinkedIn</a>
        <button type="button" data-copiar>Copiar enlace</button>
      </div>
    </div>
  </div>
  ${p.image ? `<figure class="wrap nota-foto">${foto(p, " foto-g", "eager")}${p.imageCredit ? `<figcaption>${esc(p.imageAlt || "")}${p.imageAlt ? ". " : ""}Foto: ${esc(p.imageCredit)}</figcaption>` : ""}</figure>` : ""}
  <div class="wrap nota-cuerpo">
    <div class="texto">${html}</div>
    ${(p.tags || []).length ? `<ul class="etiquetas" aria-label="Temas">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <p class="nota-ia">Este artículo se ha elaborado con ayuda de herramientas de inteligencia artificial siguiendo la <a href="/politica-editorial">política editorial de NEA</a>. ¿Has visto un error? <a href="/politica-editorial#correcciones">Solicita una corrección</a>.</p>
  </div>
</article>
${relacionados.length + masLeer.length ? `<section class="wrap relacionados" aria-labelledby="rel-tit"><h2 class="bloque-tit" id="rel-tit">${relacionados.length ? `Más en ${esc(s.nombre)}` : "Más noticias"}</h2><div class="fila">${[...relacionados, ...masLeer].map((x) => tarjeta(x)).join("")}</div></section>` : ""}`;
  return pagina({ titulo: `${p.title} | ${NOMBRE}`, descripcion: p.description, ruta: url, imagen: p.image, tipoOg: "article", jsonld, cuerpo, activa: s.slug, extraHead });
}

function renderNoEncontrado() {
  return pagina({ titulo: `Página no encontrada | ${NOMBRE}`, descripcion: "La página que buscas no existe o se ha movido.", ruta: "/404", noindex: true,
    cuerpo: `<div class="wrap vacio-pag"><p class="ante">Error 404</p><h1>No encontramos esta página</h1><p>Puede que la noticia se haya movido o que el enlace no sea correcto.</p><p><a class="boton" href="/">Ir a la portada</a></p></div>` });
}

// ── Páginas institucionales ──
const PAGINAS = require("./paginas");
function renderPagina(id) {
  const pg = PAGINAS[id];
  if (!pg) return null;
  return pagina({ titulo: `${pg.titulo} | ${NOMBRE}`, descripcion: pg.desc, ruta: `/${id}`, noindex: !!pg.noindex,
    jsonld: [{ "@type": pg.tipo || "WebPage", url: `${SITIO}/${id}`, name: pg.titulo, isPartOf: { "@id": WEBSITE["@id"] } }, migas([["Portada", "/"], [pg.titulo, `/${id}`]])],
    cuerpo: `<div class="wrap legal"><h1>${esc(pg.titulo)}</h1>${pg.html}</div>` });
}

// ── Sitemaps y RSS ──
function renderSitemap(posts) {
  const ultima = posts[0] ? isoMod(posts[0]) : new Date().toISOString();
  const urls = [
    [`${SITIO}/`, ultima],
    ...SECCIONES.filter((s) => posts.some((p) => seccionDe(p.category).slug === s.slug)).map((s) => [`${SITIO}/${s.slug}`, isoMod(posts.find((p) => seccionDe(p.category).slug === s.slug))]),
    ...Object.keys(PAGINAS).filter((k) => !PAGINAS[k].noindex).map((k) => [`${SITIO}/${k}`, null]),
    ...posts.map((p) => [`${SITIO}${urlDe(p)}`, isoMod(p), p]),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(([loc, mod, p]) => `<url><loc>${xml(loc)}</loc>${mod ? `<lastmod>${xml(mod)}</lastmod>` : ""}${p && p.image ? `<image:image><image:loc>${xml(p.image)}</image:loc></image:image>` : ""}</url>`).join("\n")}
</urlset>`;
}

/** Sitemap de Google News: solo artículos de las últimas 48 horas (máx. 1000). */
function renderNewsSitemap(posts) {
  const limite = Date.now() - 48 * 3600 * 1000;
  const recientes = posts.filter((p) => new Date(isoDe(p)).getTime() >= limite).slice(0, 1000);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recientes.map((p) => `<url><loc>${xml(SITIO + urlDe(p))}</loc><news:news><news:publication><news:name>${NOMBRE}</news:name><news:language>es</news:language></news:publication><news:publication_date>${xml(isoDe(p))}</news:publication_date><news:title>${xml(p.title)}</news:title></news:news></url>`).join("\n")}
</urlset>`;
}

function renderRss(posts, s = null) {
  const lista = (s ? posts.filter((p) => seccionDe(p.category).slug === s.slug) : posts).slice(0, 50);
  const enlace = s ? `${SITIO}/${s.slug}` : `${SITIO}/`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${xml(s ? `${NOMBRE} · ${s.nombre}` : `${NOMBRE} · ${LEMA}`)}</title>
<link>${enlace}</link>
<description>${xml(s ? s.desc : "Últimas noticias de NEA.")}</description>
<language>es-es</language>
<atom:link href="${SITIO}${s ? `/rss/${s.slug}.xml` : "/rss.xml"}" rel="self" type="application/rss+xml"/>
${lista.map((p) => `<item><title>${xml(p.title)}</title><link>${xml(SITIO + urlDe(p))}</link><guid isPermaLink="true">${xml(SITIO + urlDe(p))}</guid><pubDate>${new Date(isoDe(p)).toUTCString()}</pubDate><category>${xml(seccionDe(p.category).nombre)}</category><description>${xml(p.description)}</description>${p.image ? `<media:content url="${xml(p.image)}" medium="image"/>` : ""}</item>`).join("\n")}
</channel>
</rss>`;
}

module.exports = {
  listaArticulos, articulo, usarFuente, urlDe, seccionDe, seccionPorSlug,
  renderPortada, renderSeccion, renderArticulo, renderNoEncontrado, renderPagina, renderSitemap, renderNewsSitemap, renderRss, PAGINAS,
};
