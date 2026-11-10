/* PERMEDIA - Servicios: el logo de la izquierda da UNA vuelta al pasar de una línea a otra */
(function () {
  "use strict";
  if (!window.gsap) return;
  var cards = document.querySelectorAll(".awards-card");
  var img = document.getElementById("awardsHover");
  if (!cards.length || !img) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var spinning = false;
  gsap.set(img, { transformPerspective: 900, rotationY: 0 });
  cards.forEach(function (c) {
    c.addEventListener("mouseenter", function () {
      if (spinning) return;               // si ya está girando, no se acumulan más vueltas
      spinning = true;
      gsap.fromTo(img, { rotationY: 0 }, {
        rotationY: 360, duration: 0.95, ease: "power2.inOut",
        onComplete: function () { gsap.set(img, { rotationY: 0 }); spinning = false; }
      });
    });
  });
})();
