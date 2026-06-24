document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".service-slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prev = document.querySelector(".slide-arrow.left");
  const next = document.querySelector(".slide-arrow.right");

  if (slides.length && dotsContainer && prev && next) {
    let current = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });

      current = index;
    }

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to service ${i + 1}`);
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    prev.addEventListener("click", () => {
      showSlide((current - 1 + slides.length) % slides.length);
    });

    next.addEventListener("click", () => {
      showSlide((current + 1) % slides.length);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prev.click();
      if (e.key === "ArrowRight") next.click();
    });

    showSlide(0);
  }

  const dropdown = document.querySelector(".dropdown");
  const toggle = document.querySelector(".dropdown-toggle");
  const menu = document.querySelector(".dropdown-menu");

  if (dropdown && toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
