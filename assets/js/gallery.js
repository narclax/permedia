/* PERMEDIA - Galería, video y marcas (requiere gsap + ScrollTrigger cargados antes) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var tags = ["Resultados", "Estrategia", "Crecimiento"];

  /* ---------- Marquees: duplicar contenido para loop continuo ---------- */
  document.querySelectorAll("[data-pm-loop]").forEach(function (track) {
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (n) {
      var c = n.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
  });

  /* ---------- Video con autoplay (silenciado) + botón de sonido ---------- */
  document.querySelectorAll("[data-pm-video]").forEach(function (box) {
    var v = box.querySelector("video");
    var btn = box.querySelector(".pm-video__sound");
    if (!v) return;
    v.muted = true;
    var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) tryPlay(); else v.pause(); });
      }, { threshold: 0.35 }).observe(box);
    } else { tryPlay(); }
    if (btn) btn.addEventListener("click", function () {
      v.muted = false;
      v.currentTime = 0;
      v.controls = true;
      box.classList.add("has-sound");
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.muted = true; v.controls = false; box.classList.remove("has-sound"); });
    });
  });

  /* ---------- Galería ---------- */
  var grid = document.querySelector(".pm-gallery__grid");
  if (!grid) return;
  var tiles = Array.prototype.slice.call(grid.querySelectorAll(".pm-tile"));

  tiles.forEach(function (t, i) {
    var n = ("0" + (i + 1)).slice(-2);
    var tag = tags[i % 3];
    t.setAttribute("tabindex", "0");
    t.setAttribute("role", "button");
    t.setAttribute("aria-label", "Ampliar foto " + n + " – " + tag);
    t.dataset.tag = tag;
    t.dataset.n = n;
    if (!t.querySelector(".pm-tile__cap")) {
      var cap = document.createElement("div");
      cap.className = "pm-tile__cap";
      cap.innerHTML = '<span class="pm-tile__num">' + n + ' / ' + ("0" + tiles.length).slice(-2) +
        '</span><span class="pm-tile__tag">' + tag + " <em>✦</em></span>";
      t.appendChild(cap);
    }
  });

  /* revelado + parallax al hacer scroll */
  if (hasGsap && !reduce) {
    tiles.forEach(function (t, i) {
      var media = t.querySelector(".pm-tile__media");
      var img = t.querySelector("img");
      gsap.set(t, { clipPath: "inset(100% 0% 0% 0%)", y: 70 });
      gsap.set(img, { scale: 1.4 });
      var tl = gsap.timeline({
        scrollTrigger: { trigger: t, start: "top 90%", toggleActions: "play none none none" },
        delay: (i % 3) * 0.08
      });
      tl.to(t, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.2, ease: "power4.out" }, 0)
        .to(img, { scale: 1, duration: 1.6, ease: "power3.out", clearProps: "transform" }, 0);
      gsap.fromTo(media, { yPercent: -4 }, {
        yPercent: 4, ease: "none",
        scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    });
  }

  /* spotlight + cursor "Ver" */
  var cursor = document.createElement("div");
  cursor.className = "pm-cursor";
  cursor.textContent = "Ver";
  document.body.appendChild(cursor);
  if (hasGsap) gsap.set(cursor, { scale: 0.3, opacity: 0 });
  var cx = hasGsap ? gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" }) : null;
  var cy = hasGsap ? gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" }) : null;
  tiles.forEach(function (t) {
    t.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
      if (cx) { cx(e.clientX); cy(e.clientY); } else { cursor.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"; }
    });
    t.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "touch") return;
      if (hasGsap) gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)", overwrite: "auto" }); else cursor.classList.add("is-on");
    });
    t.addEventListener("pointerleave", function () {
      if (hasGsap) gsap.to(cursor, { scale: 0.3, opacity: 0, duration: 0.25, overwrite: "auto" }); else cursor.classList.remove("is-on");
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.createElement("div");
  lb.className = "pm-lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Galería de imágenes");
  lb.setAttribute("data-lenis-prevent", "");
  lb.innerHTML =
    '<button class="pm-lightbox__close" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
    '<button class="pm-lightbox__prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>' +
    '<button class="pm-lightbox__next" aria-label="Siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>' +
    '<div class="pm-lightbox__stage"><img class="pm-lightbox__img" alt=""></div>' +
    '<div class="pm-lightbox__bar"><div class="pm-lightbox__tag"></div><div class="pm-lightbox__count"></div></div>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector(".pm-lightbox__img");
  var lbTag = lb.querySelector(".pm-lightbox__tag");
  var lbCount = lb.querySelector(".pm-lightbox__count");
  var current = 0, lastFocus = null;

  function fill(i) {
    var t = tiles[i];
    var src = t.querySelector("img");
    lbImg.src = src.currentSrc || src.src;
    lbImg.alt = src.alt || "";
    lbTag.textContent = t.dataset.tag;
    lbCount.textContent = t.dataset.n + " / " + ("0" + tiles.length).slice(-2);
  }
  function show(i, dir) {
    current = (i + tiles.length) % tiles.length;
    if (hasGsap && !reduce && dir) {
      gsap.to(lbImg, { opacity: 0, x: -60 * dir, duration: 0.2, ease: "power2.in", onComplete: function () {
        fill(current);
        gsap.fromTo(lbImg, { opacity: 0, x: 60 * dir }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" });
      } });
    } else { fill(current); }
  }
  function open(i) {
    lastFocus = document.activeElement;
    fill(i); current = i;
    lb.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    if (hasGsap && !reduce) {
      gsap.to(lb, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(lbImg, { scale: 0.86, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "power4.out" });
    } else { lb.style.opacity = 1; }
    lb.querySelector(".pm-lightbox__close").focus();
  }
  function close() {
    function done() {
      lb.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    if (hasGsap && !reduce) gsap.to(lb, { opacity: 0, duration: 0.25, onComplete: done }); else { lb.style.opacity = 0; done(); }
  }
  tiles.forEach(function (t, i) {
    t.addEventListener("click", function () { open(i); });
    t.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
  });
  lb.querySelector(".pm-lightbox__close").addEventListener("click", close);
  lb.querySelector(".pm-lightbox__prev").addEventListener("click", function () { show(current - 1, -1); });
  lb.querySelector(".pm-lightbox__next").addEventListener("click", function () { show(current + 1, 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("pm-lightbox__stage")) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1, -1);
    else if (e.key === "ArrowRight") show(current + 1, 1);
  });
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  if (hasGsap) window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
