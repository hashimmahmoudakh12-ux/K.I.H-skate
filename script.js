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

  /* ---------------- thumbnail fallback ----------------
     until real YouTube IDs are set, img.youtube.com 404s on the
     placeholder IDs — hide the broken image so the teal panel +
     play button read as an intentional "coming soon" thumb. */

  document.querySelectorAll(".video-thumb img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
    });
  });

  /* ---------------- video lightbox ---------------- */

  var lightbox = document.getElementById("lightbox");
  var iframe = document.getElementById("lightbox-iframe");
  var closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var lastFocused = null;

  function openLightbox(videoId) {
    if (!lightbox || !iframe) return;
    iframe.src =
      "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox || !iframe) return;
    lightbox.hidden = true;
    iframe.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".video-thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.dataset.video);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
