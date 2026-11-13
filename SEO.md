# NEA · Estrategia SEO

Periódico digital de información general (nea.com.es). Secciones con el esquema de la prensa generalista española:
Internacional, Opinión, España, Economía, Sociedad, Educación, Clima y Medio Ambiente, Ciencia, Tecnología,
Salud y Bienestar, Cultura, Deportes, Gente, Estilo y Televisión.

## 1. Posicionamiento

Competir de tú a tú con los grandes medios por la última hora es inviable para un medio nuevo. NEA se posiciona como
**el medio que explica la actualidad**: piezas de servicio y contexto que contestan a lo que la gente busca *después* de
leer la noticia ("qué cambia", "a quién afecta", "cómo se calcula", "plazos", "claves").

Tres tipos de pieza, por orden de prioridad:

| Tipo | Ejemplo | Por qué |
|---|---|---|
| **Explicativa de actualidad** | «Qué cambia con la nueva ley de vivienda y a quién afecta» | Capta tráfico de Google Discover y Noticias el día de la noticia y sigue posicionando semanas después |
| **Servicio / evergreen** | «Calendario escolar 2026-2027 por comunidades», «Cómo leer la factura de la luz» | Tráfico estable de búsqueda; se actualiza cada año en la misma URL |
| **Contexto** | «Qué es una moción de censura y cuántas ha habido» | Enlaza desde las piezas de actualidad y concentra autoridad temática |

## 2. Lo que ya está implementado en la web

- **HTML completo en servidor** (Vercel, caché 5 min + `stale-while-revalidate`): Google ve todo el contenido sin JavaScript.
- **URLs limpias y semánticas**: `/<seccion>/<slug>` (p. ej. `/economia/como-leer-la-factura-de-la-luz`). Si un artículo
  cambia de sección, la URL antigua redirige con 301 a la correcta.
- **Datos estructurados** (JSON-LD): `NewsMediaOrganization` (con `publishingPrinciples`, `correctionsPolicy`, `masthead`),
  `WebSite`, `NewsArticle` (fecha de publicación y modificación, sección, imagen, palabras clave), `BreadcrumbList`,
  `CollectionPage` + `ItemList` en secciones.
- **Sitemap de Google News** `/news-sitemap.xml` (solo últimas 48 h, como exige Google) + sitemap general `/sitemap.xml`
  con imágenes. Ambos declarados en `robots.txt`.
- **RSS** general `/rss.xml` y por sección `/rss/<seccion>.xml` (útil para Google News Publisher Center, agregadores y
  redes).
- **Google Discover**: `max-image-preview:large`, imagen 1200 px de ancho en `og:image`, títulos sin clickbait.
- **Metadatos sociales**: Open Graph (`article:published_time`, `article:section`, `article:tag`) y Twitter Card grande.
- **E-E-A-T / confianza**: páginas *Quiénes somos* y *Política editorial* (fuentes, uso de IA, correcciones), aviso de IA
  en cada artículo y en el pie, autoría «Redacción NEA».
- **Secciones vacías con `noindex`** hasta que tengan contenido (evita páginas pobres en el índice).
- **Rendimiento**: sin frameworks ni JavaScript pesado, imágenes con `loading="lazy"` salvo la principal
  (`fetchpriority="high"`), CSS único.
- **Accesibilidad**: enlace «saltar al contenido», jerarquía H1→H2→H3 correcta, menú navegable con teclado y Escape.

## 3. Reglas para el agente de IA (estrategia de Agentes V2)

Estas reglas deben ir en la configuración de la organización NEA cuando se dé de alta:

- **category**: exactamente uno de los nombres de sección de arriba (la web también acepta el slug o el nombre sin tildes;
  si no reconoce la categoría, el artículo cae en Sociedad).
- **title** (60-70 caracteres): la palabra clave principal al principio, informativo, sin mayúsculas sostenidas ni
  clickbait («No creerás…» penaliza en Discover).
- **description** (140-160 caracteres): la entradilla; resume el qué y el porqué, se usa como meta description.
- **slug**: corto (4-7 palabras), sin fechas ni stopwords innecesarias, para poder actualizar la pieza el año siguiente.
- **Imagen**: siempre, horizontal, mínimo 1200 px de ancho, con crédito (Pexels/Unsplash o fuente oficial).
- **Estructura del cuerpo**: primer párrafo que responde qué/quién/cuándo/dónde/por qué; subtítulos H2 en forma de
  pregunta o clave ("Qué cambia", "A quién afecta", "Plazos"); tablas para datos; enlaces a la fuente oficial
  (BOE, INE, ministerios, organismos europeos).
- **Prohibido inventar**: citas, cifras, declaraciones, nombres o hechos sin fuente. Si no hay dato, se dice. En salud,
  economía personal y derecho (temas YMYL) se cita siempre una fuente oficial.
- **Opinión**: solo análisis argumentado; nunca firmar como una persona real.
- **Enlazado interno**: 2-3 enlaces a piezas anteriores de NEA relacionadas (contexto → actualidad y viceversa).
- **Descubrimiento de temas**: RSS de organismos oficiales (BOE, INE, Moncloa, AEMET, Comisión Europea), agencias y
  Google Trends España; priorizar temas con búsqueda sostenida y ángulo explicativo.
- **Ritmo**: un medio de noticias necesita frecuencia. Recomendado empezar con 2-3 piezas diarias repartidas en mañana
  y tarde, y subir según el rendimiento en Search Console. La publicación es automática (sin aprobación manual).

## 4. Calendario de contenidos evergreen (actualizar cada año en la misma URL)

| Mes | Temas |
|---|---|
| Enero | Subida del SMI y pensiones, cuesta de enero, cambios fiscales del año |
| Febrero-marzo | Campaña de la Renta (calendario, novedades, deducciones) |
| Abril | Semana Santa: tráfico, tiempo, festivos por comunidad |
| Mayo-junio | Selectividad/PAU, becas, calendario escolar, rebajas |
| Julio-agosto | Operación salida, olas de calor, viajes, Champions/temporada deportiva |
| Septiembre | Vuelta al cole, nuevo curso político, estrenos de series |
| Octubre | Cambio de hora, campaña de vacunación, Presupuestos |
| Noviembre-diciembre | Black Friday, Lotería de Navidad, festivos del año siguiente, resumen del año |

## 5. Pasos pendientes para el lanzamiento

1. **Datos legales**: completar los campos `[ENTRE CORCHETES]` de `lib/paginas.js` (titular, NIF, domicilio, correo).
2. **Dominio en Vercel**: conectar `nea.com.es` (y `www` → redirección al dominio raíz).
3. **Search Console**: verificar `sc-domain:nea.com.es` y enviar `sitemap.xml` y `news-sitemap.xml`.
4. **Google News Publisher Center**: dar de alta la publicación con el logotipo (`/assets/logo-600x60.png`), las
   secciones (con sus feeds RSS) y la URL de política editorial.
5. **Organización en Agentes V2** (clave sugerida `nea`) con las reglas del punto 3. Cuando exista, añadir la variable de
   entorno `NEA_ORG=nea` en Vercel y volver a desplegar. **No poner la variable antes**: con una clave desconocida la API
   devuelve artículos de otra organización.
6. Opcional: Google Analytics (necesitará banner de cookies) y perfiles sociales (X, Facebook, WhatsApp Channel) para
   añadir a `sameAs` del JSON-LD de la organización.
