// Páginas institucionales de NEA. Los datos marcados con [CORCHETES] en las páginas legales deben completarse con los
// datos reales del titular antes de dar de alta el medio en Google News / Search Console.

const TITULAR = "[NOMBRE O RAZÓN SOCIAL DEL TITULAR]";
const NIF = "[NIF/CIF]";
const DOMICILIO = "[DOMICILIO SOCIAL]";
const CORREO = "[CORREO DE CONTACTO]";

module.exports = {
  "quienes-somos": {
    titulo: "Quiénes somos",
    tipo: "AboutPage",
    desc: "NEA es un periódico digital de información general sobre la actualidad de España y del mundo. Conoce nuestro proyecto y cómo trabajamos.",
    html: `<p class="legal-entradilla">NEA es un periódico digital de información general. Publicamos cada día noticias y explicaciones sobre la actualidad de España y del mundo, ordenadas en las secciones clásicas de la prensa generalista: Internacional, España, Economía, Sociedad, Educación, Clima y Medio Ambiente, Ciencia, Tecnología, Salud y Bienestar, Cultura, Deportes, Gente, Estilo, Televisión y Opinión.</p>
<h2>Nuestro propósito</h2>
<p>Queremos que cualquier lector entienda en pocos minutos qué ha pasado, por qué importa y qué puede cambiar en su día a día. Priorizamos el contexto, los datos verificables y un lenguaje claro sobre el ruido y el titular fácil.</p>
<h2>Cómo trabajamos</h2>
<p>La redacción de NEA combina criterio editorial con herramientas de inteligencia artificial que ayudan a documentar, redactar y ordenar la información. Todo el proceso se rige por nuestra <a href="/politica-editorial">política editorial</a>, que explica cómo elegimos los temas, qué fuentes usamos y cómo corregimos los errores.</p>
<h2>Contacto</h2>
<p>Para sugerencias, correcciones o cualquier consulta puedes escribirnos a ${CORREO}.</p>`,
  },
  "politica-editorial": {
    titulo: "Política editorial",
    desc: "Principios editoriales de NEA: selección de temas, fuentes, uso de inteligencia artificial, independencia y política de correcciones.",
    html: `<p class="legal-entradilla">Estos son los principios que guían todo lo que publica NEA.</p>
<h2>Rigor y fuentes</h2>
<p>Cada información se apoya en fuentes identificables: organismos oficiales, documentos públicos, estadísticas, comunicados y medios de referencia. Distinguimos con claridad los hechos de las opiniones y enlazamos a la fuente original siempre que es posible.</p>
<h2 id="ia">Uso de inteligencia artificial</h2>
<p>NEA utiliza herramientas de inteligencia artificial para detectar temas de actualidad, resumir documentación y redactar borradores. Estas herramientas trabajan con instrucciones editoriales precisas: no inventar datos, citas ni declaraciones, no atribuir hechos sin fuente y señalar la incertidumbre cuando la haya. Lo indicamos al final de cada artículo para que el lector lo sepa.</p>
<h2>Independencia</h2>
<p>NEA no está vinculado a ningún partido político, empresa ni institución sobre la que informe. Los contenidos patrocinados, si los hubiera, se identificarán siempre de forma visible.</p>
<h2>Opinión</h2>
<p>Los textos de la sección Opinión son análisis y no representan hechos noticiosos. Se identifican siempre con la etiqueta de su sección.</p>
<h2 id="correcciones">Correcciones</h2>
<p>Si detectas un error, escríbenos a ${CORREO} indicando el enlace del artículo. Revisamos todas las solicitudes y, cuando procede, corregimos el texto y actualizamos la fecha de modificación.</p>`,
  },
  "aviso-legal": {
    titulo: "Aviso legal",
    noindex: true,
    desc: "Aviso legal de NEA (nea.com.es).",
    html: `<p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
<ul><li><strong>Titular:</strong> ${TITULAR}</li><li><strong>NIF:</strong> ${NIF}</li><li><strong>Domicilio:</strong> ${DOMICILIO}</li><li><strong>Correo electrónico:</strong> ${CORREO}</li><li><strong>Sitio web:</strong> https://nea.com.es</li></ul>
<h2>Propiedad intelectual</h2>
<p>Los textos, el diseño, el logotipo y el resto de elementos de NEA están protegidos por la normativa de propiedad intelectual. Se permite citar breves fragmentos con enlace a la fuente original. Las fotografías pertenecen a sus autores, indicados en cada pie de foto.</p>
<h2>Responsabilidad</h2>
<p>NEA trabaja para que la información publicada sea exacta y esté actualizada, pero no se responsabiliza de las decisiones tomadas a partir de ella. Los enlaces a sitios de terceros se ofrecen como referencia y NEA no controla su contenido.</p>`,
  },
  privacidad: {
    titulo: "Política de privacidad",
    noindex: true,
    desc: "Política de privacidad de NEA (nea.com.es).",
    html: `<p><strong>Responsable del tratamiento:</strong> ${TITULAR}, NIF ${NIF}, ${DOMICILIO}. Contacto: ${CORREO}.</p>
<h2>Qué datos tratamos</h2>
<p>NEA no tiene registro de usuarios ni formularios. Solo tratamos los datos que nos envíes voluntariamente por correo electrónico (por ejemplo, una solicitud de corrección), con la única finalidad de responderte. La base legal es tu consentimiento y los conservaremos el tiempo necesario para atender tu solicitud.</p>
<h2>Datos técnicos</h2>
<p>Nuestro proveedor de alojamiento (Vercel Inc.) registra datos técnicos de conexión, como la dirección IP, por motivos de seguridad y funcionamiento del servicio. Las tipografías se cargan desde Google Fonts.</p>
<h2>Tus derechos</h2>
<p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${CORREO}. Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`,
  },
  cookies: {
    titulo: "Política de cookies",
    noindex: true,
    desc: "Política de cookies de NEA (nea.com.es).",
    html: `<p>Actualmente NEA no utiliza cookies propias ni de terceros con fines analíticos o publicitarios, por lo que no se muestra un banner de consentimiento.</p>
<p>Si en el futuro se incorporan herramientas de analítica o publicidad, esta política se actualizará y se solicitará tu consentimiento antes de instalar cualquier cookie no necesaria.</p>`,
  },
};
