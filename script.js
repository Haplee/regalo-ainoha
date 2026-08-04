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

  /* ---------- Acertijo escalonado ---------- */
  var button = document.getElementById("hint-btn");
  var hint = document.getElementById("hint");

  var clue =
    "No te lo voy a poner tan fácil. Piensa en la única que te acompaña " +
    "a todas partes y se abraza a tu hombro sin que se lo pidas. " +
    "Lo que buscas no cabe en un bolsillo.";

  var answer = "Un bolso. 🤍 Y dentro, la promesa de dártelo en persona muy pronto.";

  var steps = [clue, answer];
  var labels = ["Me rindo, dímelo"];
  var current = 0;

  function show(text) {
    hint.textContent = text;
    hint.classList.remove("show");
    void hint.offsetWidth;
    hint.classList.add("show");
  }

  button.addEventListener("click", function () {
    if (current < steps.length) {
      show(steps[current]);
      button.textContent = current < labels.length ? labels[current] : "Gracias por jugar";
      current++;
    }
    if (navigator.vibrate) {
      try { navigator.vibrate(12); } catch (e) {}
    }
  });
})();
