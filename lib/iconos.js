// Iconos de NEA: sprite SVG inline (una sola vez por página) + ic("nombre") para usarlos.
// Trazo de 1.8 px sobre rejilla 24×24, color = currentColor.

const T = (d) => d; // marcador de legibilidad
const ICONOS = {
  // Secciones
  internacional: T('<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5S9.4 5.2 12 2.5z"/>'),
  opinion: T('<path d="M20.5 14.5a2 2 0 0 1-2 2H8l-4.5 4V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/><path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" stroke-width="2.6"/>'),
  espana: T('<path d="M19.5 10c0 5.5-7.5 11.5-7.5 11.5S4.5 15.5 4.5 10a7.5 7.5 0 0 1 15 0z"/><circle cx="12" cy="10" r="2.8"/>'),
  economia: T('<path d="M3.5 3.5v17h17"/><path d="m7.5 15 4-4 3 3 5.5-5.5"/><path d="M15.5 8.5H20V13"/>'),
  sociedad: T('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20.5v-1.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v1.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20.5v-1.5a4.5 4.5 0 0 0-3.2-4.3"/>'),
  educacion: T('<path d="M22 9.5 12 4.5 2 9.5l10 5z"/><path d="M6 11.5v5c3.3 2.7 8.7 2.7 12 0v-5M22 9.5v6"/>'),
  "clima-y-medio-ambiente": T('<path d="M11 20.5A7 7 0 0 1 9.8 6.6C15.5 5.5 17 5 19 2.5c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2.5 21.5c0-3 1.9-5.4 5.1-6 2.4-.5 4.9-2 5.9-3"/>'),
  ciencia: T('<path d="M9 2.5h6M10 2.5v6.5L4.4 18.8a1.6 1.6 0 0 0 1.4 2.4h12.4a1.6 1.6 0 0 0 1.4-2.4L14 9V2.5"/><path d="M7 15h10"/>'),
  tecnologia: T('<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx=".5"/><path d="M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3"/>'),
  "salud-y-bienestar": T('<path d="M19.3 13.6c1.5-1.5 2.7-3.2 2.7-5.3A5.3 5.3 0 0 0 16.7 3c-1.8 0-3.1.6-4.7 2.2C10.4 3.6 9.1 3 7.3 3A5.3 5.3 0 0 0 2 8.3c0 2.1 1.2 3.8 2.7 5.3L12 21z"/><path d="M3.5 12h4l1.6-3 2.3 6 1.6-3h4"/>'),
  cultura: T('<path d="M2.5 4.5H8a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2.5zM21.5 4.5H16a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h6.5z"/>'),
  deportes: T('<path d="M8 21h8M12 16.5V21M7 3.5h10v5.5a5 5 0 0 1-10 0z"/><path d="M17 5h3v1.5a3.5 3.5 0 0 1-3.2 3.5M7 5H4v1.5A3.5 3.5 0 0 0 7.2 10"/>'),
  gente: T('<path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L3 9.4l6.2-.9z"/>'),
  estilo: T('<path d="m11 3 1.8 4.9L17.7 9.7l-4.9 1.8L11 16.4l-1.8-4.9-4.9-1.8 4.9-1.8z"/><path d="m18.5 14 .9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z"/>'),
  television: T('<rect x="2.5" y="7" width="19" height="13.5" rx="2"/><path d="m16.5 2.5-4.5 4.5-4.5-4.5"/>'),
  // Interfaz
  reloj: T('<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>'),
  calendario: T('<rect x="3.5" y="4.5" width="17" height="16.5" rx="2"/><path d="M16 2.5v4M8 2.5v4M3.5 10h17"/>'),
  enlace: T('<path d="M10 13.5a4.8 4.8 0 0 0 7.2.5l2.9-2.9A4.8 4.8 0 0 0 13.3 4.3l-1.6 1.6"/><path d="M14 10.5a4.8 4.8 0 0 0-7.2-.5L3.9 12.9a4.8 4.8 0 0 0 6.8 6.8l1.6-1.6"/>'),
  rss: T('<path d="M4.5 11a8.5 8.5 0 0 1 8.5 8.5M4.5 4a15.5 15.5 0 0 1 15.5 15.5"/><circle cx="5.5" cy="18.5" r="1.3" fill="currentColor"/>'),
  flecha: T('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  pluma: T('<path d="M12 20.5h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  ia: T('<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 7V3.5M9 13h.01M15 13h.01" stroke-width="2.4"/><path d="M9.5 16.5h5M2 12.5v3M22 12.5v3"/>'),
  escudo: T('<path d="M12 21.5s8-3.8 8-9.8V5L12 2.5 4 5v6.7c0 6 8 9.8 8 9.8z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>'),
  lupa: T('<circle cx="10.5" cy="10.5" r="7"/><path d="m21 21-5.5-5.5"/>'),
  balanza: T('<path d="M12 3v18M7.5 21h9M5 7h14M12 3.5 5 7M12 3.5 19 7"/><path d="m5 7-3 7a3.6 3.6 0 0 0 6 0zM19 7l-3 7a3.6 3.6 0 0 0 6 0z"/>'),
  correccion: T('<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>'),
  noticia: T('<path d="M4 21.5h15a2.5 2.5 0 0 0 2.5-2.5V3.5h-15V19A2.5 2.5 0 0 1 4 21.5a2.5 2.5 0 0 1-2.5-2.5V9h5"/><path d="M10 8h8M10 12h8M10 16h5"/>'),
  // Redes (relleno)
  whatsapp: T('<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/>'),
  x: T('<path fill="currentColor" stroke="none" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.9 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.5z"/>'),
  facebook: T('<path fill="currentColor" stroke="none" d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.6V4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.3H7.6v3.2h2.7v8z"/>'),
  linkedin: T('<path fill="currentColor" stroke="none" d="M6.9 21H3.3V9.2h3.6zM5.1 7.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM21 21h-3.6v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.7V9.2h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5z"/>'),
};

const SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${Object.entries(ICONOS)
  .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
  .join("")}</svg>`;

/** <svg> que usa un icono del sprite. Decorativo (aria-hidden) salvo que se pase etiqueta. */
const ic = (nombre, clase = "ic", etiqueta = "") =>
  `<svg class="${clase}" width="1em" height="1em"${etiqueta ? ` role="img" aria-label="${etiqueta}"` : ' aria-hidden="true" focusable="false"'}><use href="#i-${ICONOS[nombre] ? nombre : "noticia"}"/></svg>`;

module.exports = { SPRITE, ic, ICONOS };
