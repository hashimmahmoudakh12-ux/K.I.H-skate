(function () {
  "use strict";

  /* ---------------- smooth scroll w/ sticky-nav offset ---------------- */

  var nav = document.querySelector(".site-nav");

  function getNavHeight() {
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        getNavHeight() -
        16;

      window.scrollTo({ top: top, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });

  /* ---------------- scroll-spy active nav link ---------------- */

  var navLinks = document.querySelectorAll(".nav-link[data-nav]");
  var sections = ["home", "videos", "about", "book"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.dataset.nav === id;
      link.classList.toggle("active", isMatch);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            // #book doubles as CONTACT in the nav
            setActive(id === "book" ? "contact" : id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

})();
