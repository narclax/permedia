/* PERMEDIA - Cambio de idioma ES / EN (se carga antes que el resto de scripts) */
(function () {
  "use strict";
  var KEY = "pm-lang", lang = "es";
  function read() {
    try { var v = localStorage.getItem(KEY); if (v === "en" || v === "es") return v; } catch (e) {}
    var m = /pm-lang=(en|es)/.exec(window.name || ""); return m ? m[1] : null;
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    window.name = (window.name || "").replace(/pm-lang=\w+;?/g, "") + "pm-lang=" + v + ";";
  }
  var q = /[?&]lang=(en|es)/.exec(location.search);
  if (q) { lang = q[1]; save(lang); } else { lang = read() || "es"; }
  document.documentElement.lang = lang;
  window.PM_LANG = lang;

  var D = {
    /* header / menú */
    "Inicio": "Home", "Nosotros": "About", "Servicios": "Services", "Galería": "Gallery", "Contacto": "Contact",
    "Contáctanos": "Contact us", "Escribenos!": "Write to us!", "Resultados, estrategia & crecimiento.": "Results, strategy & growth.",
    "Calle la Colina, No. 2": "2 La Colina Street", "Bella Vista, República Dominicana": "Bella Vista, Dominican Republic",
    /* hero (SVG) */
    "Resultados,": "Results,", "estrategia": "strategy", "crecimiento": "growth",
    "PERMEDIA digital agency. Resultados, estrategia y crecimiento.": "PERMEDIA digital agency. Results, strategy and growth.",
    /* quiénes somos */
    "QUIÉNES": "WHO", "SOMOS": "WE ARE", "Con más de": "With more than", "8 años": "8 years",
    "en el mercado hemos consolidado nuestra trayectoria como una agencia creativa versátil, confiable y orientada a resultados. Durante este tiempo hemos trabajado junto a empresas de diversos sectores, desarrollando estrategias efectivas, producciones audiovisuales de alto nivel y campañas digitales que marcan la diferencia.":
      "in the market, we have built our track record as a versatile, reliable and results-driven creative agency. During this time we have worked alongside companies from a wide range of sectors, developing effective strategies, high-level audiovisual productions and digital campaigns that make a difference.",
    "Somos un grupo creativo especializado en producción audiovisual, contenido digital y estrategias de marketing integradas. Acompañamos a marcas, empresas e instituciones en la construcción de narrativas poderosas que conectan con su audiencia, a través de soluciones visuales, campañas efectivas y contenido que deja huella.":
      "We are a creative group specialized in audiovisual production, digital content and integrated marketing strategies. We support brands, companies and institutions in building powerful narratives that connect with their audience, through visual solutions, effective campaigns and content that leaves a mark.",
    "NOSOTROS": "ABOUT US",
    "Nuestro equipo multidisciplinario combina creatividad, estrategia y tecnología para ofrecer soluciones a medida, desde la idea hasta la ejecución. Nos apasiona contar historias que generan impacto y construyen valor de marca.":
      "Our multidisciplinary team combines creativity, strategy and technology to deliver tailored solutions, from the idea to the execution. We are passionate about telling stories that create impact and build brand value.",
    /* resultados */
    "RESULTADOS,": "RESULTS,", "ESTRATEGIA": "STRATEGY", "& CRECIMIENTO": "& GROWTH",
    "Somos especialistas en Marketing Digital con + 6 años de experiencia en diseño, ejecución y optimización de campañas digitales.":
      "We are Digital Marketing specialists with 6+ years of experience in the design, execution and optimization of digital campaigns.",
    "Tu navegador no soporta la reproducción de video.": "Your browser does not support video playback.",
    "Activar sonido": "Turn on sound",
    /* servicios */
    "NUESTROS": "OUR", "SERVICIOS": "SERVICES", "sobre nosotros": "about us",
    "01. Marketing Digital & Servicios Publicitarios": "01. Digital Marketing & Advertising Services",
    "02. Coberturas Fotográficas & Video": "02. Photo & Video Coverage",
    "03. Transmisión en Vivo (Live Streaming)": "03. Live Streaming",
    "04. Desarrollo de Websites": "04. Website Development",
    "05. Coordinación de Eventos": "05. Event Coordination",
    "06. Fotografía & Video de Bodas": "06. Wedding Photo & Video",
    "07. Alquiler de Equipos de Sonido": "07. Sound Equipment Rental",
    "Cobertura en una obra de construcción": "Coverage at a construction site",
    "Cobertura de un evento corporativo": "Corporate event coverage",
    "Cobertura de un evento institucional": "Institutional event coverage",
    /* visión */
    "Sobre nosotros": "About us", "NUESTRA": "OUR", "VISIÓN": "VISION", "Equipo de PERMEDIA": "The PERMEDIA team",
    "Estamos comprometidos a ofrecer servicios de producción de video de alta calidad.": "We are committed to delivering high-quality video production services.",
    "Con un equipo dedicado de expertos, hacemos realidad tu visión creativa, desde la planificación hasta la entrega final, garantizando un proceso de producción fluido y exitoso.":
      "With a dedicated team of experts, we bring your creative vision to life, from planning to final delivery, ensuring a smooth and successful production process.",
    /* equipo */
    "EQUIPO": "TEAM",
    "Cada miembro de nuestro equipo aporta una visión especializada y un compromiso auténtico con la calidad, cuidando cada detalle desde la idea hasta la entrega final. Nos define la proactividad, la innovación y el deseo constante de superar expectativas en cada producción.":
      "Every member of our team brings specialized insight and a genuine commitment to quality, taking care of every detail from the idea to the final delivery. We are defined by proactivity, innovation and a constant desire to exceed expectations in every production.",
    "10+ Miembros": "10+ Members", "Gerente": "Manager", "Encargado de Producción": "Production Manager",
    "Estratega, Diseño Gráfico y Community Manager": "Strategist, Graphic Design & Community Manager",
    "Producción": "Production", "Diseño Gráfico": "Graphic Design", "Audio y transmisión": "Audio & Streaming",
    "Servicios Contables": "Accounting Services", "Asistencia Administrativa": "Administrative Assistance",
    "SOMOS UN": "WE ARE A", "ENFOCADOS EN LA": "FOCUSED ON", "EXCELENCIA": "EXCELLENCE",
    /* galería */
    "GALERÍA": "GALLERY", "Resultados": "Results", "Estrategia": "Strategy", "Crecimiento": "Growth",
    "Selección de materiales y muestras de diseño": "Selection of materials and design samples",
    "Profesional de la salud en una clínica Medwork": "Healthcare professional at a Medwork clinic",
    "Cirujano durante un procedimiento": "Surgeon during a procedure",
    "Equipo trabajando en un barco en puerto": "Crew working on a ship in port",
    "Médico revisando muestras al microscopio": "Doctor examining samples under a microscope",
    "Grúa descargando en un puerto": "Crane unloading at a port",
    "Equipo de rayos X en un centro médico": "X-ray equipment at a medical center",
    "Reunión de trabajo con un mapa de fondo": "Work meeting with a world map in the background",
    "Mujer revisando muestras de tela y diseño": "Woman reviewing fabric and design samples",
    /* marcas / contacto */
    "NUESTRAS": "OUR", "MARCAS": "BRANDS", "Algunas de las marcas en las que hemos estado presentes.": "Some of the brands we have been part of.",
    "DUDAS?": "QUESTIONS?", "SOLICITA": "REQUEST", "INFORMACION": "INFORMATION", "Llamar": "Call", "Escribir por WhatsApp": "Message us on WhatsApp",
    /* footer */
    "Somos un": "We are a", "grupo creativo": "creative group",
    "especializado en producción audiovisual, contenido digital y estrategias de marketing integradas.": "specialized in audiovisual production, digital content and integrated marketing strategies.",
    "Calle la Colina #2, Bella Vista": "2 La Colina Street, Bella Vista", "Derechos Reservados.": "All Rights Reserved.",
    "Escríbenos por WhatsApp": "Message us on WhatsApp",
    /* atributos aria */
    "YouTube de PERMEDIA": "PERMEDIA on YouTube", "Instagram de PERMEDIA": "PERMEDIA on Instagram", "Pausar o reproducir animación": "Pause or play animation",
    /* barra superior */
    "Idioma": "Language", "Cambiar tema": "Toggle theme"
  };

  function tr(s) {
    var core = s.replace(/\s+/g, " ").trim();
    if (!core || !Object.prototype.hasOwnProperty.call(D, core)) return null;
    var lead = /^\s*/.exec(s)[0], trail = /\s*$/.exec(s)[0];
    return lead + D[core] + trail;
  }
  function translate() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName.toLowerCase();
        return (p === "script" || p === "style" || p === "noscript") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    }), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) { var r = tr(t.nodeValue); if (r !== null) t.nodeValue = r; });
    ["alt", "aria-label", "title", "placeholder"].forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll("[" + a + "]"), function (e) {
        var r = tr(e.getAttribute(a)); if (r !== null) e.setAttribute(a, r);
      });
    });
  }
  if (lang === "en") {
    translate();
    // elementos que se agregan al final del <body> (p. ej. el WhatsApp flotante)
    document.addEventListener("DOMContentLoaded", translate);
  }

  /* botones del selector de idioma */
  Array.prototype.forEach.call(document.querySelectorAll(".pm-lang [data-lang]"), function (b) {
    var on = b.getAttribute("data-lang") === lang;
    b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-lang"); if (v === lang) return;
      save(v); location.reload();
    });
  });
})();
