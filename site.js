/* Fills phone numbers/dates from config.js and scatters the Stay in LA sparkles. */
(function () {
  var c = window.OPEN_LINES || {};


  // [kind, left %, top %, size px] — hand-placed so they frame the content like the logo artwork
  var LAYOUTS = {
    // scattered across the whole page, mostly toward the edges so they stay off the text
    page: [
      ["images/sparkle-pair.png", 6, 7, 50],
      ["images/sparkle-dot.png", 90, 9, 52],
      ["images/sparkle-star.png", 95, 46, 28],
      ["images/sparkle-cluster.png", 10, 86, 108]
    ]
  };

  function sparkle(el) {
    var set = LAYOUTS[el.getAttribute("data-sparkles")] || LAYOUTS.page;
    set.forEach(function (s, i) {
      var img = document.createElement("img");
      img.className = "sparkle";
      img.src = s[0];
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.style.left = s[1] + "%";
      img.style.top = s[2] + "%";
      img.style.width = s[3] + "px";
      el.appendChild(img);
    });
  }

  function init() {
    document.querySelectorAll("[data-fill]").forEach(function (el) {
      var v = c[el.getAttribute("data-fill")];
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      var v = c[el.getAttribute("data-tel")];
      if (v) el.setAttribute("href", "tel:+1" + v.replace(/\D/g, ""));
    });
    document.querySelectorAll("[data-sparkles]").forEach(sparkle);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
