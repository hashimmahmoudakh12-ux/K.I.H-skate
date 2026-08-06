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

  /* ---------------- booking form (FormSubmit via fetch) ----------------
     Submits with fetch instead of a plain POST so we can show a real
     success/error state in place, instead of redirecting to FormSubmit's
     own page. If this is the very first submission ever sent to the
     target inbox, FormSubmit holds it and emails a one-time confirmation
     link to that inbox instead of delivering it — that's expected
     first-run behavior, not a bug, so the error message below calls it
     out directly rather than leaving the visitor guessing. */

  var bookingForm = document.querySelector(".notebook-form");

  if (bookingForm) {
    var fields = bookingForm.querySelector(".form-fields");
    var success = bookingForm.querySelector(".form-success");
    var status = bookingForm.querySelector(".form-status");
    var submitBtn = bookingForm.querySelector(".submit-btn");
    var ajaxAction = bookingForm.action.replace(
      "formsubmit.co/",
      "formsubmit.co/ajax/"
    );

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {};
      new FormData(bookingForm).forEach(function (value, key) {
        data[key] = value;
      });

      submitBtn.disabled = true;
      submitBtn.textContent = "SENDING...";
      status.hidden = true;

      fetch(ajaxAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed: " + res.status);
          fields.hidden = true;
          success.hidden = false;
        })
        .catch(function () {
          status.hidden = false;
          status.textContent =
            "Something went wrong sending that. If this is the very " +
            "first booking request since setup, check " +
            "kihskateboarding@gmail.com (and spam) for a one-time " +
            "confirmation email from FormSubmit, click Confirm, then " +
            "try again.";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            'SEND IT<svg class="arrow-svg" viewBox="0 0 30 20" aria-hidden="true"><path d="M1 10 H27 M18 2 L27 10 L18 18" /></svg>';
        });
    });
  }
})();
