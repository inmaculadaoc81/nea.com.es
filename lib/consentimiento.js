// Ventana de consentimiento de cookies de NEA (se muestra al entrar hasta que el lector elige).
// - Primera capa: «Aceptar y continuar» y «Rechazar» al mismo nivel (guía de cookies de la AEPD) + «Configurar».
// - Segunda capa: categorías (necesarias siempre activas, analíticas, publicidad).
// - La elección se guarda en localStorage («nea-consent») 12 meses; el pie tiene «Configurar cookies» para cambiarla.
// - Cualquier script de analítica o publicidad futuro debe esperar al evento «nea:consent» y comprobar
//   window.neaConsent.analitica / .publicidad antes de cargarse.

const { ic } = require("./iconos");

const HTML = `<div class="consent" id="consent" hidden>
  <div class="consent-fondo"></div>
  <div class="consent-caja" role="dialog" aria-modal="true" aria-labelledby="consent-tit" aria-describedby="consent-txt">
    <img class="consent-logo" src="/assets/logo.svg" width="96" height="34" alt="NEA">
    <h2 class="consent-tit" id="consent-tit">${ic("escudo")}Tu privacidad en NEA</h2>
    <div class="consent-capa1">
      <p id="consent-txt">Usamos cookies propias y de terceros para que la web funcione, medir la audiencia de forma anónima y, en su caso, mostrar publicidad. Puedes aceptarlas todas, rechazar las que no son necesarias o elegir cuáles permites. Puedes cambiar tu elección cuando quieras desde «Configurar cookies», al pie de la página.</p>
      <div class="consent-botones">
        <button type="button" class="consent-btn consent-si" data-consent="todo">Aceptar y continuar</button>
        <button type="button" class="consent-btn consent-no" data-consent="nada">Rechazar</button>
      </div>
      <button type="button" class="consent-config" data-consent-config>${ic("pluma")}Configurar cookies</button>
    </div>
    <div class="consent-capa2" hidden>
      <ul class="consent-tipos">
        <li><label><span><strong>Necesarias</strong><small>Imprescindibles para que la web funcione y para recordar tu elección. Siempre activas.</small></span><input type="checkbox" checked disabled></label></li>
        <li><label><span><strong>Analíticas</strong><small>Nos ayudan a saber qué noticias se leen más, de forma anónima y agregada.</small></span><input type="checkbox" data-tipo="analitica"></label></li>
        <li><label><span><strong>Publicidad</strong><small>Permiten mostrar anuncios y medir su rendimiento.</small></span><input type="checkbox" data-tipo="publicidad"></label></li>
      </ul>
      <div class="consent-botones">
        <button type="button" class="consent-btn consent-si" data-consent="guardar">Guardar selección</button>
        <button type="button" class="consent-btn consent-no" data-consent="todo">Aceptar todas</button>
      </div>
    </div>
    <p class="consent-legal"><a href="/aviso-legal">Aviso legal</a><span aria-hidden="true">|</span><a href="/cookies">Política de cookies</a><span aria-hidden="true">|</span><a href="/privacidad">Privacidad</a></p>
  </div>
</div>
<script>
(function(){
var CLAVE="nea-consent",DIAS=365,el=document.getElementById("consent");if(!el)return;
var c1=el.querySelector(".consent-capa1"),c2=el.querySelector(".consent-capa2");
function leer(){try{var v=JSON.parse(localStorage.getItem(CLAVE)||"null");if(v&&Date.now()-v.fecha<DIAS*864e5)return v;}catch(e){}return null;}
function aplicar(v){window.neaConsent=v;try{document.dispatchEvent(new CustomEvent("nea:consent",{detail:v}));}catch(e){}}
function guardar(a,p){var v={necesarias:true,analitica:!!a,publicidad:!!p,fecha:Date.now()};try{localStorage.setItem(CLAVE,JSON.stringify(v));}catch(e){}aplicar(v);cerrar();}
function abrir(conf){var v=leer()||{};var cb=el.querySelectorAll("[data-tipo]");for(var i=0;i<cb.length;i++)cb[i].checked=!!v[cb[i].getAttribute("data-tipo")];
c1.hidden=!!conf;c2.hidden=!conf;el.hidden=false;document.documentElement.classList.add("consent-abierto");var b=el.querySelector(conf?".consent-capa2 .consent-si":".consent-capa1 .consent-si");if(b)b.focus();}
function cerrar(){el.hidden=true;document.documentElement.classList.remove("consent-abierto");}
el.addEventListener("click",function(e){var b=e.target.closest("[data-consent]");if(b){var t=b.getAttribute("data-consent");
if(t==="todo")guardar(true,true);else if(t==="nada")guardar(false,false);
else guardar(el.querySelector('[data-tipo="analitica"]').checked,el.querySelector('[data-tipo="publicidad"]').checked);return;}
if(e.target.closest("[data-consent-config]")){c1.hidden=true;c2.hidden=false;}});
document.addEventListener("click",function(e){if(e.target.closest("[data-consent-abrir]")){e.preventDefault();abrir(true);}});
var v=leer();if(v)aplicar(v);else if(!/^\\/(cookies|privacidad|aviso-legal)$/.test(location.pathname))abrir(false);
})();
</script>`;

module.exports = { HTML_CONSENTIMIENTO: HTML };
