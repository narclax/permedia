/* PERMEDIA - Selector claro / oscuro (oscuro por defecto; la elección se guarda en el navegador) */
(function () {
  "use strict";
  var KEY = "pm-theme";
  function read() {
    try { var v = localStorage.getItem(KEY); if (v === "light" || v === "dark") return v; } catch (e) {}
    var m = /pm-theme=(light|dark)/.exec(window.name || ""); return m ? m[1] : null;
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    window.name = (window.name || "").replace(/pm-theme=\w+;?/g, "") + "pm-theme=" + v + ";";
  }
  var btns = document.querySelectorAll(".pm-theme");
  function isDark() { return document.body.classList.contains("dark"); }
  function paint() {
    var d = isDark();
    Array.prototype.forEach.call(btns, function (b) {
      b.setAttribute("aria-pressed", d ? "false" : "true");   // pulsado = modo claro activo
      b.classList.toggle("is-light", !d);
    });
  }
  // aplica el tema usando los botones originales de la plantilla (así también se actualizan los textos y fondos que dependen del modo)
  function apply(mode) {
    var b = document.querySelector('.js-mode-type button[data-mode="' + mode + '"]');
    if (b) b.click();
    else document.body.classList.toggle("dark", mode === "dark");
    paint();
  }
  function init() {
    var saved = read();
    if (saved === "light" && isDark()) apply("light");
    paint();
  }
  if (window.jQuery) window.jQuery(init); else document.addEventListener("DOMContentLoaded", init);
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      apply(next); save(next);
    });
  });
})();
