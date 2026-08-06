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

  /* ---------------- booking form (mailto, no third-party service) ----
     No form-processing service in the loop — submitting builds a mailto:
     link from the filled-in fields and hands it to the browser, which
     opens the visitor's own email app addressed straight to
     kihskateboarding@gmail.com with everything pre-filled. That means
     zero setup and no confirmation-email gate, but it only works if the
     visitor has a mail app configured on whatever device they're on, and
     they still have to hit send themselves — we can't detect or
     guarantee that part, so the confirmation copy says "should be open"
     rather than claiming the message is already sent. */

  var BOOKING_EMAIL = "kihskateboarding@gmail.com";
  var bookingForm = document.getElementById("book-form");

  if (bookingForm) {
    var fields = bookingForm.querySelector(".form-fields");
    var success = bookingForm.querySelector(".form-success");

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(bookingForm);
      var name = data.get("name") || "";
      var email = data.get("email") || "";
      var want = data.get("want") || "";
      var date = data.get("date") || "";
      var message = data.get("message") || "";

      var subject = "Booking request from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Looking for: " + want,
      ];
      if (date) bodyLines.push("Date preference: " + date);
      bodyLines.push("", "Message:", message);

      var mailto =
        "mailto:" +
        BOOKING_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      fields.hidden = true;
      success.hidden = false;
    });
  }
})();
