// Particle System
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

// Progress Bar Animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 500);
        observer.unobserve(bar);
      }
    });
  });

  progressBars.forEach((bar) => observer.observe(bar));
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Navbar Scroll Effect
function initNavbarEffect() {
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Parallax Effect (disabled on small screens for performance)
function initParallaxEffect() {
  const enableParallax = window.matchMedia("(min-width: 640px)").matches;
  if (!enableParallax) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".floating, .floating-delayed, .floating-slow",
    );

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Form Validation
function initFormValidation() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple validation
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.style.borderColor = "#ef4444";
          isValid = false;
        } else {
          input.style.borderColor = "#10b981";
        }
      });

      if (isValid) {
        // Simulate form submission
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = "در حال ارسال...";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = "ارسال شد!";
          button.style.background = "linear-gradient(45deg, #10b981, #059669)";

          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = "";
            form.reset();
          }, 2000);
        }, 1000);
      }
    });
  }
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const icon = document.getElementById("mobileMenuIcon");

  if (!mobileMenuBtn || !mobileMenu || !icon) return;

  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.classList.add("hidden");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  };

  mobileMenuBtn.addEventListener("click", toggleMenu);

  // close on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll(".hover-lift, .glass").forEach((el) => {
    observer.observe(el);
  });
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  animateCounters();
  animateProgressBars();
  initSmoothScrolling();
  initNavbarEffect();
  initParallaxEffect();
  initFormValidation();
  initMobileMenu();
  initScrollAnimations();
});

// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }
});
