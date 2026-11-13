# NEA · nea.com.es

Periódico digital generado en el servidor (Vercel). Los artículos los escribe el agente IA de Kelatos (Agentes V2) y la
web los lee en vivo de la API pública: no hay artículos en este repositorio.

- `api/nea.js`: único punto de entrada (portada, secciones, artículos, páginas, sitemaps, RSS). Rutas en `vercel.json`.
- `lib/nea.js`: lectura de la API y plantillas HTML con todo el SEO.
- `lib/secciones.js`: las 15 secciones y cómo se traduce la `category` de un artículo a su sección.
- `lib/paginas.js`: Quiénes somos, Política editorial y páginas legales.
- `assets/`: estilos, logotipo (SVG + PNG para Google News), favicon e imagen para redes.

Variables de entorno (Vercel):

| Variable | Valor | Nota |
|---|---|---|
| `NEA_ORG` | `nea` | Opcional: por defecto `nea` (org 81 de Agentes V2, ya creada en modo «medio»). |
| `KELATOS_BLOG_API` | (opcional) | Por defecto `https://db.affirmatechnology.com/kelatos-api/publico/blog`. |

Estrategia SEO y reglas para el agente IA: ver [SEO.md](SEO.md).
