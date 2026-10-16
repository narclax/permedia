/* PERMEDIA - Hero minimalista en SVG: 2 slides (logo / lema) con líneas finas (requiere gsap) */
(function () {
  "use strict";
  var hero = document.querySelector(".pm-hero");
  if (!hero) return;
  if (!window.gsap) { hero.classList.add("is-ready"); return; }
  var NS = "http://www.w3.org/2000/svg", TAU = Math.PI * 2;
  var svg = hero.querySelector(".pm-hero__svg");
  var q = function (s) { return svg.querySelector(s); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 1920, CY = 540, paused = false, visible = true, userPaused = false;
  var T = [], tw = function (t) { T.push(t); if (paused) t.paused(true); return t; };
  var $ = function (n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var SLIDE = 7, S2 = 6.3;           // duración de cada slide y punto de entrada del 2º

  /* ---------- fondo y líneas finas ---------- */
  var back = q("#pmBack"), ringsG = q("#pmRings");
  var glow = $("circle", { cx: 0, cy: CY, r: 640, fill: "url(#pmGlowG)", opacity: 0.55 }, back);
  var glow2 = $("circle", { cx: 520, cy: 280, r: 380, fill: "url(#pmGlowG)", opacity: 0.22 }, back);
  var partG = $("g", {}, back);
  var ringsIn = $("g", {}, ringsG), i;
  var circ = [400, 540].map(function (r) { return $("circle", { r: r, fill: "none", stroke: "#fff", "stroke-opacity": 0.1, "stroke-width": 1.5, pathLength: 1 }, ringsIn); });
  var hexPts = []; for (i = 0; i < 6; i++) hexPts.push((330 * Math.cos(i * TAU / 6 + Math.PI / 6)).toFixed(1) + "," + (330 * Math.sin(i * TAU / 6 + Math.PI / 6)).toFixed(1));
  var hex = $("polygon", { points: hexPts.join(" "), fill: "none", stroke: "#fff", "stroke-opacity": 0.2, "stroke-width": 1.5, "stroke-linejoin": "round", pathLength: 1 }, ringsIn);
  var orbit = $("ellipse", { rx: 700, ry: 230, fill: "none", stroke: "#f60019", "stroke-opacity": 0.28, "stroke-width": 1.2, pathLength: 1 }, ringsIn);
  var odot = $("circle", { r: 4.5, fill: "#f60019" }, ringsIn), ohalo = $("circle", { r: 14, fill: "#f60019", opacity: 0.2 }, ringsIn);

  /* ---------- elementos ---------- */
  var logoG = q("#pmLogoG"), logo = q("#pmLogo"), blurF = q("#pmBlurF"), shineG = q("#pmShineG"), dotGlow = q("#pmDotGlow");
  var lines = Array.prototype.slice.call(svg.querySelectorAll("#pmLema .ln")), lemaLine = q("#pmLemaLine"), lemaTag = q("#pmLemaTag");
  var B = { v: 26 }, setBlur = function () { blurF.setAttribute("stdDeviation", B.v.toFixed(2)); };
  logo.style.transformBox = "fill-box";

  /* ---------- diseño responsivo ---------- */
  var fits = Array.prototype.slice.call(svg.querySelectorAll(".fit")), particles = [], rs = 1;
  function measure() { fits.forEach(function (g) { g._w = g.id === "pmLogoFit" ? 760 : (g.getBBox().width || 1); }); }
  function layout() {
    var r = hero.getBoundingClientRect();
    W = Math.max(520, Math.min(2400, 1080 * r.width / Math.max(r.height, 1)));
    svg.setAttribute("viewBox", "0 0 " + W + " 1080");
    q("#pmStage").setAttribute("transform", "translate(" + W / 2 + ",0)");
    rs = Math.max(0.5, Math.min(1, W / 1250));
    ringsG.setAttribute("transform", "translate(0," + CY + ") scale(" + rs + ")");
    glow.setAttribute("cy", CY);
    fits.forEach(function (g) {
      var s = Math.min(1, (W * 0.84) / g._w);
      g.setAttribute("transform", "translate(0," + CY + ") scale(" + s + ") translate(0," + (-CY) + ")");
    });
    particles.forEach(function (t) { t.kill(); }); particles = [];
    while (partG.firstChild) partG.removeChild(partG.firstChild);
    for (i = 0; i < (W < 900 ? 6 : 10); i++) {
      var c = $("circle", { cx: rnd(-W / 2, W / 2), cy: rnd(220, 900), r: rnd(2, 4.5), fill: i % 4 === 0 ? "#f60019" : "#fff", opacity: reduce ? 0.2 : 0 }, partG);
      if (!reduce) { var t = gsap.to(c, { keyframes: [{ opacity: 0.28, duration: 3 }, { opacity: 0, duration: 3 }], y: -rnd(80, 180), duration: 6, ease: "none", repeat: -1, delay: rnd(0, 6) }); particles.push(t); if (paused) t.paused(true); }
    }
  }

  /* ---------- línea de tiempo: 2 slides ---------- */
  var master = gsap.timeline({ repeat: -1, paused: true });
  function build() {
    gsap.set(logoG, { opacity: 0 }); gsap.set(lines, { opacity: 0, y: 46 }); gsap.set(lemaTag, { opacity: 0 });
    gsap.set(lemaLine, { strokeDasharray: 1, strokeDashoffset: 1 }); gsap.set(shineG, { opacity: 0 });
    // Slide 1: logo con "enfoque de cámara"
    master.fromTo(logoG, { opacity: 0 }, { opacity: 1, duration: 1.9, ease: "power3.out" }, 0)
      .fromTo(logo, { scale: 1.07, transformOrigin: "50% 50%" }, { scale: 1, duration: 1.9, ease: "power3.out" }, 0)
      .fromTo(B, { v: 26 }, { v: 0, duration: 1.9, ease: "power2.out", onUpdate: setBlur }, 0)
      .fromTo(shineG, { x: 0, opacity: 1 }, { x: 1500, duration: 1.5, ease: "power2.inOut" }, 2.1)
      .set(shineG, { opacity: 0 }, 3.7)
      .to(logoG, { opacity: 0, duration: 0.9, ease: "power2.in" }, 6.0)
      .to(logo, { scale: 1.04, duration: 0.9, ease: "power2.in" }, 6.0)
      .to(B, { v: 18, duration: 0.9, ease: "power2.in", onUpdate: setBlur }, 6.0)
      .fromTo(ringsIn, { scale: 1, rotation: 0, transformOrigin: "50% 50%" }, { scale: 1.28, rotation: 18, duration: 1.6, ease: "power2.inOut" }, 5.9);
    // Slide 2: lema
    master.to(lemaLine, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, S2 + 0.3)
      .fromTo(lines, { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.17 }, S2 + 0.45)
      .to(lemaTag, { opacity: 1, duration: 1 }, S2 + 1.7)
      .to(lines, { opacity: 0, y: -30, duration: 0.7, ease: "power2.in", stagger: 0.08 }, 13.1)
      .to([lemaLine, lemaTag], { opacity: 0, duration: 0.6 }, 13.1)
      .fromTo(ringsIn, { scale: 1.28, rotation: 18, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: 1.4, ease: "power2.inOut" }, 12.9)
      .set(lemaLine, { opacity: 1, strokeDashoffset: 1 }, 14).set(lemaTag, { opacity: 0 }, 14)
      .addLabel("s1", 0).addLabel("s2", S2);
    master.to({}, { duration: 0.01 }, SLIDE * 2);
  }

  /* ---------- animaciones continuas muy suaves ---------- */
  function loops() {
    var d = { p: 0 };
    tw(gsap.to(hex, { rotation: 360, duration: 160, ease: "none", repeat: -1, transformOrigin: "50% 50%" }));
    tw(gsap.to(glow, { opacity: 0.85, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    tw(gsap.to(glow2, { x: -260, y: 220, opacity: 0.38, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    tw(gsap.fromTo(fb(dotGlow), { opacity: 0.1, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 0.5, scale: 1.5, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    tw(gsap.to(d, { p: 1, duration: 32, ease: "none", repeat: -1, onUpdate: function () {
      var a = d.p * TAU; odot.setAttribute("cx", 700 * Math.cos(a)); odot.setAttribute("cy", 230 * Math.sin(a));
      ohalo.setAttribute("cx", 700 * Math.cos(a)); ohalo.setAttribute("cy", 230 * Math.sin(a)); } }));
  }
  function fb(e) { e.style.transformBox = "fill-box"; return e; }

  /* ---------- intro (una vez) ---------- */
  function intro() {
    var parts = circ.concat([hex, orbit]);
    gsap.set(parts, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([glow, glow2], { opacity: 0 });
    tw(gsap.timeline()
      .to(parts, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.25 }, 0.1)
      .to(glow, { opacity: 0.55, duration: 2 }, 0)
      .to(glow2, { opacity: 0.22, duration: 2 }, 0.4)
      .set(parts, { strokeDasharray: "none" }, 3.2)
      .add(loops, 0.2));
  }

  /* ---------- controles ---------- */
  var barsBox = hero.querySelector(".pm-hud__bars"), bars = [], labels = ["Logo", "Lema"];
  ["s1", "s2"].forEach(function (lb, k) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "pm-hud__bar"; b.setAttribute("aria-label", "Ir al slide " + (k + 1) + ": " + labels[k]);
    b.addEventListener("click", function () { master.seek(lb); if (reduce) master.time(master.time() + (k ? 3.4 : 2.4)); });
    barsBox.appendChild(b); bars.push(b);
  });
  function hud() {
    var t = master.time();
    bars[0].style.setProperty("--p", Math.min(1, Math.max(0, t / SLIDE)).toFixed(3));
    bars[1].style.setProperty("--p", Math.min(1, Math.max(0, (t - SLIDE) / SLIDE)).toFixed(3));
  }
  function setPaused(p) {
    paused = p; master.paused(p);
    T.forEach(function (t) { t.paused(p); }); particles.forEach(function (t) { t.paused(p); });
    hero.classList.toggle("is-paused", userPaused);
  }
  function sync() { setPaused(userPaused || !visible || reduce); }
  hero.querySelector(".pm-hud__btn").addEventListener("click", function () { userPaused = !userPaused; if (!userPaused && reduce) reduce = false; sync(); });

  /* ---------- parallax suave ---------- */
  if (!reduce && window.matchMedia && window.matchMedia("(hover: hover)").matches) {
    var qt = [["#pmBackPar", 14], ["#pmRingPar", 22], ["#pmLogoPar", 8], ["#pmLemaPar", 8]].map(function (l) {
      var e = q(l[0]); return { x: gsap.quickTo(e, "x", { duration: 1, ease: "power3" }), y: gsap.quickTo(e, "y", { duration: 1, ease: "power3" }), d: l[1] };
    });
    hero.addEventListener("pointermove", function (e) {
      var nx = (e.clientX / window.innerWidth - 0.5) * 2, ny = (e.clientY / window.innerHeight - 0.5) * 2;
      qt.forEach(function (l) { l.x(nx * l.d); l.y(ny * l.d * 0.6); });
    });
  }

  /* ---------- init ---------- */
  function init() {
    measure(); layout(); build();
    master.eventCallback("onUpdate", hud);
    if (reduce) {
      setBlurZero(); master.time(2.4); master.pause(); hero.classList.add("is-paused"); userPaused = true; paused = true;
    } else { intro(); master.delay(0.5).play(); }
    hero.classList.add("is-ready");
    window.addEventListener("resize", layout);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; sync(); }, { threshold: 0.1 }).observe(hero);
    hero._dbg = { m: master };
    hud();
  }
  function setBlurZero() { B.v = 0; setBlur(); }
  var go = function () { try { init(); } catch (err) { hero.classList.add("is-ready"); if (window.console) console.error(err); } };
  if (document.fonts && document.fonts.ready) {
    var done = false, run = function () { if (!done) { done = true; go(); } };
    document.fonts.ready.then(run); setTimeout(run, 1500);
  } else { go(); }
})();
