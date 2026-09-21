/* =========================================================
   Dominique Ball — portfolio behavior
   ========================================================= */

(function () {
    "use strict";

    var menuButton = document.getElementById("menuButton");
    var navigation = document.getElementById("navigation");
    var navbar = document.querySelector(".navbar");
    var navLinks = navigation ? navigation.querySelectorAll("a") : [];

    /* ---------- Footer year ---------- */

    var yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- Mobile menu ---------- */

    function setMenu(open) {
        if (!menuButton || !navigation) return;
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        navigation.classList.toggle("open", open);
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            var isOpen = menuButton.getAttribute("aria-expanded") === "true";
            setMenu(!isOpen);
        });

        // Close after choosing a section
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                setMenu(false);
            });
        });

        // Close with Escape
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setMenu(false);
            }
        });

        // Close when tapping outside the menu
        document.addEventListener("click", function (event) {
            if (!navbar.contains(event.target)) {
                setMenu(false);
            }
        });

        // Reset when resizing up to desktop
        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) {
                setMenu(false);
            }
        });
    }

    /* ---------- Navbar border once the page scrolls ---------- */

    function onScroll() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 10);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Highlight the nav link for the section in view ---------- */

    if ("IntersectionObserver" in window && navLinks.length) {
        var linkById = {};
        navLinks.forEach(function (link) {
            var id = (link.getAttribute("href") || "").replace("#", "");
            if (id) linkById[id] = link;
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach(function (link) {
                        link.removeAttribute("aria-current");
                    });
                    var active = linkById[entry.target.id];
                    if (active) active.setAttribute("aria-current", "true");
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        Object.keys(linkById).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }
})();
