(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Aparición escalonada al hacer scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 70, 420) + "ms";
      observer.observe(el);
    });
  }

  /* ---------- Acertijo: una sola pista ---------- */
  var button = document.getElementById("hint-btn");
  var hint = document.getElementById("hint");

  var clue =
    "La única que te acompaña a todas partes y siempre va a tu lado.";

  var shown = false;

  function show(text) {
    hint.textContent = text;
    hint.classList.remove("show");
    void hint.offsetWidth;
    hint.classList.add("show");
  }

  button.addEventListener("click", function () {
    if (shown) return;
    shown = true;
    show(clue);
    button.textContent = "Gracias por jugar";
    button.disabled = true;
    if (navigator.vibrate) {
      try { navigator.vibrate(12); } catch (e) {}
    }
  });
})();
