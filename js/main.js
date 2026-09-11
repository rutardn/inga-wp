/* =================================================================
   Inga Kreivėnaitė – front-end interactions
   Minimal, dependency-free. Will be enqueued via wp_enqueue_script
   in the future WordPress theme (functions.php).
   ================================================================= */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight active nav link based on section in viewport
  var navLinks = document.querySelectorAll(".primary-nav a");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").replace("#", "");
    var sec = document.getElementById(id);
    if (sec) sections.push({ link: link, el: sec });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sections.forEach(function (s) {
              s.link.classList.toggle(
                "is-active",
                s.el === entry.target
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s.el);
    });
  }
})();
