// Secciones de NEA (mismo esquema de secciones que la prensa generalista española).
// `nombre` es lo que debe usar el agente IA como «category» de cada artículo; también se aceptan el slug
// o el nombre sin tildes. Cualquier categoría desconocida cae en «Sociedad».
const SECCIONES = [
  { slug: "internacional", nombre: "Internacional", desc: "Noticias internacionales: Europa, América, Oriente Próximo, Asia y África explicadas con contexto." },
  { slug: "opinion", nombre: "Opinión", desc: "Análisis, tribunas y columnas sobre la actualidad de España y del mundo." },
  { slug: "espana", nombre: "España", desc: "Actualidad nacional: política, comunidades autónomas, tribunales y la información que importa en España." },
  { slug: "economia", nombre: "Economía", desc: "Economía, mercados, empleo, vivienda, impuestos y finanzas personales explicados de forma clara." },
  { slug: "sociedad", nombre: "Sociedad", desc: "Sociedad: consumo, igualdad, movilidad, sucesos y los cambios que afectan a la vida diaria." },
  { slug: "educacion", nombre: "Educación", desc: "Educación: colegios, universidad, becas, FP, oposiciones y calendario escolar." },
  { slug: "clima-y-medio-ambiente", nombre: "Clima y Medio Ambiente", desc: "Clima y medio ambiente: cambio climático, energía, biodiversidad y tiempo extremo." },
  { slug: "ciencia", nombre: "Ciencia", desc: "Ciencia: investigación, espacio, medicina, divulgación y descubrimientos explicados." },
  { slug: "tecnologia", nombre: "Tecnología", desc: "Tecnología: inteligencia artificial, móviles, internet, ciberseguridad y empresas tecnológicas." },
  { slug: "salud-y-bienestar", nombre: "Salud y Bienestar", desc: "Salud y bienestar: medicina, nutrición, salud mental, ejercicio y sanidad pública." },
  { slug: "cultura", nombre: "Cultura", desc: "Cultura: libros, cine, música, arte, teatro y patrimonio." },
  { slug: "deportes", nombre: "Deportes", desc: "Deportes: fútbol, baloncesto, tenis, motor, ciclismo y el resto de la actualidad deportiva." },
  { slug: "gente", nombre: "Gente", desc: "Gente: personajes, celebridades, realeza y vida social." },
  { slug: "estilo", nombre: "Estilo", desc: "Estilo: moda, belleza, gastronomía, viajes y tendencias." },
  { slug: "television", nombre: "Televisión", desc: "Televisión y series: estrenos, plataformas, audiencias y críticas." },
];

const normal = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const POR_CLAVE = new Map();
for (const s of SECCIONES) { POR_CLAVE.set(s.slug, s); POR_CLAVE.set(normal(s.nombre), s); }
// Alias habituales que puede devolver la IA.
for (const [alias, slug] of Object.entries({ nacional: "espana", politica: "espana", mundo: "internacional", internacionales: "internacional", clima: "clima-y-medio-ambiente", "medio-ambiente": "clima-y-medio-ambiente", salud: "salud-y-bienestar", bienestar: "salud-y-bienestar", tv: "television", series: "television", deporte: "deportes", "inteligencia-artificial": "tecnologia", ia: "tecnologia", vivienda: "economia" }))
  POR_CLAVE.set(alias, POR_CLAVE.get(slug));

const DEFECTO = POR_CLAVE.get("sociedad");
/** Sección de un artículo a partir de su categoría (nunca devuelve null). */
const seccionDe = (categoria) => POR_CLAVE.get(normal(categoria)) || DEFECTO;
/** Sección por slug de URL, o null. */
const seccionPorSlug = (slug) => SECCIONES.find((s) => s.slug === slug) || null;

module.exports = { SECCIONES, seccionDe, seccionPorSlug, normal };
