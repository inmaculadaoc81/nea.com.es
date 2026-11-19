// Páginas institucionales de NEA y datos legales del titular (LSSI-CE y RGPD).

const TITULAR = "Affirma Technology Group, S.L.";
const NIF = "B72990443";
const DOMICILIO = "Calle Blasco de Garay, 63, Bj 2, 28015 Madrid (España)";
const TIENDA = "Calle Joaquín María López, 26, Madrid";
const HORARIO = "de lunes a viernes, de 09:30 a 18:00";
// Correo de contacto: PENDIENTE de que el titular lo facilite (la LSSI exige un email). Mientras esté vacío, los textos
// remiten al domicilio social. Al rellenarlo, aparece automáticamente en todas las páginas.
const CORREO = "";
const ESCRIBIR_A = CORREO ? `<a href="mailto:${CORREO}">${CORREO}</a>` : `nuestro domicilio social (${DOMICILIO})`;
const { ic } = require("./iconos");
/** Rejilla de tarjetas con icono: [[icono, título, texto], …] */
const tarjetas = (items) => `<ul class="valores">${items.map(([i, t, x]) => `<li><span class="valor-ic">${ic(i)}</span><h3>${t}</h3><p>${x}</p></li>`).join("")}</ul>`;

module.exports = {
  "quienes-somos": {
    titulo: "Quiénes somos",
    tipo: "AboutPage",
    icono: "noticia",
    lema: "Un periódico digital para entender la actualidad de España y del mundo.",
    desc: "NEA es un periódico digital de información general sobre la actualidad de España y del mundo. Conoce nuestro proyecto y cómo trabajamos.",
    html: `<p class="legal-entradilla">NEA es un periódico digital de información general. Publicamos cada día noticias y explicaciones sobre la actualidad de España y del mundo, ordenadas en las secciones clásicas de la prensa generalista: Internacional, España, Economía, Sociedad, Educación, Clima y Medio Ambiente, Ciencia, Tecnología, Salud y Bienestar, Cultura, Deportes, Gente, Estilo, Televisión y Opinión.</p>
${tarjetas([
  ["lupa", "Contexto", "No nos quedamos en el titular: explicamos qué ha pasado, por qué importa y a quién afecta."],
  ["escudo", "Rigor", "Datos verificables y fuentes identificables: organismos oficiales, documentos públicos y estadísticas."],
  ["reloj", "Cada día", "Actualidad de quince secciones, de Internacional a Televisión, publicada a diario."],
  ["ia", "Transparencia", "Usamos inteligencia artificial y lo decimos en cada artículo, con reglas editoriales claras."],
])}
<h2>Nuestro propósito</h2>
<p>Queremos que cualquier lector entienda en pocos minutos qué ha pasado, por qué importa y qué puede cambiar en su día a día. Priorizamos el contexto, los datos verificables y un lenguaje claro sobre el ruido y el titular fácil.</p>
<h2>Cómo trabajamos</h2>
<p>La redacción de NEA combina criterio editorial con herramientas de inteligencia artificial que ayudan a documentar, redactar y ordenar la información. Todo el proceso se rige por nuestra <a href="/politica-editorial">política editorial</a>, que explica cómo elegimos los temas, qué fuentes usamos y cómo corregimos los errores.</p>
<h2>Nuestras secciones</h2>
<ul class="mini-secs">${require("./secciones").SECCIONES.map((x) => `<li><a href="/${x.slug}">${ic(x.slug)}${x.nombre}</a></li>`).join("")}</ul>
<h2>Contacto</h2>
<p>Para sugerencias, correcciones o cualquier consulta puedes escribirnos a ${ESCRIBIR_A}, ${HORARIO}.</p>`,
  },
  "politica-editorial": {
    titulo: "Política editorial",
    icono: "escudo",
    lema: "Los principios que guían todo lo que publica NEA.",
    desc: "Principios editoriales de NEA: selección de temas, fuentes, uso de inteligencia artificial, independencia y política de correcciones.",
    html: `${tarjetas([
  ["lupa", "Rigor y fuentes", "Cada dato con su fuente."],
  ["ia", "Uso de IA", "Herramientas con reglas: nada inventado."],
  ["balanza", "Independencia", "Sin vínculos con partidos ni empresas."],
  ["pluma", "Opinión", "Separada de la información."],
  ["correccion", "Correcciones", "Corregimos y lo indicamos."],
])}
<h2>${ic("lupa", "ic h2-ic")}Rigor y fuentes</h2>
<p>Cada información se apoya en fuentes identificables: organismos oficiales, documentos públicos, estadísticas, comunicados y medios de referencia. Distinguimos con claridad los hechos de las opiniones y enlazamos a la fuente original siempre que es posible.</p>
<h2 id="ia">${ic("ia", "ic h2-ic")}Uso de inteligencia artificial</h2>
<p>NEA utiliza herramientas de inteligencia artificial para detectar temas de actualidad, resumir documentación y redactar borradores. Estas herramientas trabajan con instrucciones editoriales precisas: no inventar datos, citas ni declaraciones, no atribuir hechos sin fuente y señalar la incertidumbre cuando la haya. Lo indicamos al final de cada artículo para que el lector lo sepa.</p>
<h2>${ic("balanza", "ic h2-ic")}Independencia</h2>
<p>NEA no está vinculado a ningún partido político, empresa ni institución sobre la que informe. Los contenidos patrocinados, si los hubiera, se identificarán siempre de forma visible.</p>
<h2>${ic("pluma", "ic h2-ic")}Opinión</h2>
<p>Los textos de la sección Opinión son análisis y no representan hechos noticiosos. Se identifican siempre con la etiqueta de su sección.</p>
<h2 id="correcciones">${ic("correccion", "ic h2-ic")}Correcciones</h2>
<p>Si detectas un error, escríbenos a ${ESCRIBIR_A} indicando el enlace del artículo. Revisamos todas las solicitudes y, cuando procede, corregimos el texto y actualizamos la fecha de modificación.</p>`,
  },
  "aviso-legal": {
    titulo: "Aviso legal",
    icono: "balanza",
    noindex: true,
    desc: "Aviso legal de NEA (nea.com.es).",
    html: `<p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
<ul><li><strong>Titular:</strong> ${TITULAR}</li><li><strong>CIF:</strong> ${NIF}</li><li><strong>Domicilio social:</strong> ${DOMICILIO}</li><li><strong>Tienda física:</strong> ${TIENDA}</li>${CORREO ? `<li><strong>Correo electrónico:</strong> ${ESCRIBIR_A}</li>` : ""}<li><strong>Horario de atención:</strong> ${HORARIO}</li><li><strong>Sitio web:</strong> https://www.nea.com.es</li></ul>
<h2>Propiedad intelectual</h2>
<p>Los textos, el diseño, el logotipo y el resto de elementos de NEA están protegidos por la normativa de propiedad intelectual. Se permite citar breves fragmentos con enlace a la fuente original. Las fotografías pertenecen a sus autores, indicados en cada pie de foto.</p>
<h2>Responsabilidad</h2>
<p>NEA trabaja para que la información publicada sea exacta y esté actualizada, pero no se responsabiliza de las decisiones tomadas a partir de ella. Los enlaces a sitios de terceros se ofrecen como referencia y NEA no controla su contenido.</p>`,
  },
  privacidad: {
    titulo: "Política de privacidad",
    icono: "escudo",
    noindex: true,
    desc: "Política de privacidad de NEA (nea.com.es).",
    html: `<p><strong>Responsable del tratamiento:</strong> ${TITULAR}, CIF ${NIF}, con domicilio social en ${DOMICILIO}.${CORREO ? ` Contacto: ${ESCRIBIR_A}.` : ""} Horario de atención: ${HORARIO}.</p>
<p><strong>Delegado de Protección de Datos:</strong> no aplica (el titular no está obligado a designarlo).</p>
<h2>Qué datos tratamos</h2>
<p>NEA no tiene registro de usuarios ni formularios. Solo tratamos los datos que nos envíes voluntariamente por correo electrónico (por ejemplo, una solicitud de corrección), con la única finalidad de responderte. La base legal es tu consentimiento y los conservaremos el tiempo necesario para atender tu solicitud.</p>
<h2>Datos técnicos</h2>
<p>Nuestro proveedor de alojamiento (Vercel Inc.) registra datos técnicos de conexión, como la dirección IP, por motivos de seguridad y funcionamiento del servicio. Las tipografías se cargan desde Google Fonts.</p>
<h2>Tus derechos</h2>
<p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${ESCRIBIR_A}, adjuntando copia de tu documento de identidad. Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`,
  },
  cookies: {
    titulo: "Política de cookies",
    icono: "enlace",
    noindex: true,
    desc: "Política de cookies de NEA (nea.com.es).",
    html: `<p>Al entrar en NEA te mostramos una ventana en la que puedes <strong>aceptar</strong>, <strong>rechazar</strong> o <strong>configurar</strong> las cookies. Puedes cambiar tu elección en cualquier momento desde <a href="/cookies" data-consent-abrir>Configurar cookies</a>, también disponible al pie de cada página.</p>
<h2>Qué tipos de cookies usamos</h2>
<ul>
<li><strong>Necesarias:</strong> imprescindibles para el funcionamiento de la web y para recordar tu elección sobre las cookies (se guarda en el almacenamiento local del navegador durante 12 meses). No requieren consentimiento.</li>
<li><strong>Analíticas:</strong> permiten medir la audiencia de forma anónima y agregada. Solo se activan si las aceptas.</li>
<li><strong>Publicidad:</strong> permiten mostrar anuncios y medir su rendimiento. Solo se activan si las aceptas.</li>
</ul>
<h2>Cookies que se instalan si las aceptas</h2>
<div class="tabla"><table><thead><tr><th>Cookie</th><th>Proveedor</th><th>Finalidad</th><th>Duración</th></tr></thead><tbody>
<tr><td>_ga</td><td>Google Analytics (Google Ireland Ltd.)</td><td>Distinguir visitantes de forma anónima para medir la audiencia</td><td>2 años</td></tr>
<tr><td>_ga_&lt;ID&gt;</td><td>Google Analytics (Google Ireland Ltd.)</td><td>Mantener el estado de la sesión de medición</td><td>2 años</td></tr>
</tbody></table></div>
<p>Estas cookies se gestionan a través de Google Tag Manager, que <strong>solo se carga si aceptas las cookies analíticas</strong>. Si las rechazas o retiras tu consentimiento, no se cargan y se eliminan las que hubiera. Google puede tratar datos fuera del Espacio Económico Europeo con las garantías previstas en su <a href="https://policies.google.com/privacy?hl=es" rel="noopener" target="_blank">política de privacidad</a>.</p>
<p>Actualmente NEA no utiliza cookies publicitarias. Si se incorporan, esta tabla se actualizará antes de activarlas.</p>
<h2>Cómo eliminar las cookies</h2>
<p>Además de la configuración de NEA, puedes bloquear o borrar las cookies desde los ajustes de tu navegador (Chrome, Firefox, Safari, Edge).</p>`,
  },
};
