/* ==========================================
   PORTFOLIO LOGIC & INTERACTION ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize EmailJS ---
  if (typeof emailjs !== "undefined") {
    emailjs.init("uBxfBAejxviA4yDMT");
  }

  // --- Elements ---
  const cursor = document.getElementById("point");
  const themeToggle = document.getElementById("theme-toggle");
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // ==========================================
  // 1. CUSTOM LERP CURSOR (TRAIL)
  // ==========================================
  let mouse = { x: 0, y: 0 };
  let cursorLoc = { x: 0, y: 0 };
  const speed = 0.15; // interpolation factor (0 = no movement, 1 = instant)

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animateCursor() {
    if (cursor) {
      // Linear Interpolation (LERP)
      cursorLoc.x += (mouse.x - cursorLoc.x) * speed;
      cursorLoc.y += (mouse.y - cursorLoc.y) * speed;
      cursor.style.left = `${cursorLoc.x}px`;
      cursor.style.top = `${cursorLoc.y}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add Hover Class to Cursor for interactive elements
  const hoverElements = document.querySelectorAll("a, button, .filter-btn, .project-card, .strength-card, .timeline-card");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  // ==========================================
  // 2. TYPEWRITER EFFECT
  // ==========================================
  const typewriterText = document.getElementById("typewriter-text");
  const roles = [
    "Full-Stack Developer.",
    "Laravel Developer.",
    "Computer Engineering Student.",
    "Problem Solver."
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50; // Delete faster
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 120; // Type normally
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingDelay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 500; // Pause before typing next word
    }

    setTimeout(type, typingDelay);
  }

  if (typewriterText) {
    type();
  }

  // ==========================================
  // 3. THEME MANAGER
  // ==========================================
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");
    themeToggle.textContent = isLightMode ? "🌞" : "🌙";
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  });

  // ==========================================
  // 4. MOBILE NAVIGATION MENU
  // ==========================================
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    menuBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu on click of nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // ==========================================
  // 5. INTERSECTION OBSERVER (SCROLL REVEAL & SKILLS FILL)
  // ==========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // Trigger skill bars inside this panel if it's the skills section
        if (entry.target.id === "skills" || entry.target.classList.contains("skills-category")) {
          animateSkillBars(entry.target);
        }
        
        revealObserver.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  // Observe all items with .reveal class
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => revealObserver.observe(el));

  function animateSkillBars(container) {
    const skillBars = container.querySelectorAll(".skill-bar-fill");
    skillBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  // ==========================================
  // 6. SCROLL SPY (ACTIVE NAV LINKS)
  // ==========================================
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: "-10% 0px -70% 0px" });

  sections.forEach((sec) => {
    if (sec.getAttribute("id")) {
      scrollSpyObserver.observe(sec);
    }
  });

  // ==========================================
  // 7. PROJECTS FILTERING LOGIC
  // ==========================================
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active btn styling
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.classList.remove("hidden");
          // Re-trigger layout display states
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 8. CONTACT FORM SUBMISSION (EMAILJS)
  // ==========================================
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Setup loading status
      formStatus.innerHTML = '<span style="color: var(--accent-primary);"><i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...</span>';
      
      const sendBtn = document.getElementById("send-btn");
      if (sendBtn) sendBtn.disabled = true;

      // Parameters for EmailJS template
      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      if (typeof emailjs !== "undefined") {
        emailjs.send("service_gru41or", "template_v7uzjmi", params)
          .then(() => {
            formStatus.innerHTML = '<span class="form-status-success"><i class="fa-solid fa-circle-check"></i> Message sent successfully!</span>';
            contactForm.reset();
            if (sendBtn) sendBtn.disabled = false;
            
            // Clear status after 5 seconds
            setTimeout(() => {
              formStatus.innerHTML = "";
            }, 5000);
          })
          .catch((error) => {
            console.error("EmailJS Error:", error);
            formStatus.innerHTML = '<span class="form-status-error"><i class="fa-solid fa-circle-xmark"></i> Failed to send. Please try again or email directly.</span>';
            if (sendBtn) sendBtn.disabled = false;
          });
      } else {
        // Fallback if script loading failed
        formStatus.innerHTML = '<span class="form-status-error"><i class="fa-solid fa-circle-xmark"></i> Messaging service offline. Contact: khushalmhajan303@gmail.com</span>';
        if (sendBtn) sendBtn.disabled = false;
      }
    });
  }

  // ==========================================
  // 9. CORE FOUNDATIONS LANGUAGE EVOLUTION
  // ==========================================
  const languagesData = [
    {
      title: "C Language",
      icon: '<i class="fa-solid fa-code"></i>',
      desc: "C was the first programming language I learned after completing my 10th class. It introduced me to the core concepts of programming and helped me build a strong foundation in computer science. C includes a wide range of essential programming features such as variables, data types, operators, control structures (like if-else and loops), functions, arrays, pointers, and file handling. These topics gave me a clear understanding of how programs are structured and how memory works in a low-level language. By learning C, I developed strong problem-solving skills and logical thinking."
    },
    {
      title: "C++ OOP",
      icon: '<i class="fa-solid fa-cubes"></i>',
      desc: "C++ was the second programming language I learned after completing my first year of study. It helped me move beyond basic programming and introduced me to the concepts of Object-Oriented Programming (OOP). I learned about important topics like classes, objects, inheritance, polymorphism, encapsulation, and abstraction, which allowed me to better understand how real-world problems can be solved using code. By practicing with C++, I strengthened my logical thinking and coding structure. Working on mini-projects helped me apply OOP in a practical way. This language played a key role in clearing my OOP concepts, and it laid a strong foundation that made it easier for me to learn other languages like Java and Python later."
    },
    {
      title: "Java Core",
      icon: '<i class="fa-brands fa-java"></i>',
      desc: "Java was the third programming language I learned after C and C++. It helped me reinforce my understanding of Object-Oriented Programming (OOP) concepts in a more structured and real-world way. Java introduced me to features like classes, interfaces, inheritance, polymorphism, exception handling, and multithreading, which are essential for building scalable applications. Learning Java deepened my knowledge of OOP and also introduced me to the JVM (Java Virtual Machine) and how Java programs run independently of platforms. Through practice and small projects, I became more confident in applying OOP principles, and Java played a crucial role in strengthening my overall programming foundation."
    },
    {
      title: "HTML5 Layouts",
      icon: '<i class="fa-brands fa-html5"></i>',
      desc: "HTML (HyperText Markup Language) was one of the first web technologies I learned after gaining some experience with languages like C, C++, and Java. It introduced me to the structure and organization of web pages. I learned how to use basic HTML elements like headings, paragraphs, links, lists, tables, and images to create well-structured web content. Learning HTML gave me a solid foundation in web development. It helped me understand how content is displayed in a browser and prepared me to dive into CSS for styling and JavaScript for interactivity. Understanding the role of HTML in the overall web development process was an important step in building complete and responsive websites."
    },
    {
      title: "CSS3 Styling",
      icon: '<i class="fa-brands fa-css3-alt"></i>',
      desc: "After learning HTML, I moved on to CSS (Cascading Style Sheets), which allowed me to bring style and visual appeal to my web pages. CSS taught me how to control the layout, colors, fonts, spacing, and responsiveness of websites. I explored selectors, properties, and values to make content visually attractive and better aligned with modern design standards. CSS also helped me understand how to create flexible and adaptive designs using concepts like flexbox, grid, media queries, and transitions. With CSS, I gained the ability to make clean, responsive user interfaces and understood how structure (HTML) and presentation (CSS) work together to create functional, engaging web experiences."
    },
    {
      title: "JavaScript ES6",
      icon: '<i class="fa-brands fa-square-js"></i>',
      desc: "After getting comfortable with HTML and CSS, I began learning JavaScript to add interactivity and dynamic behavior to my web pages. JavaScript opened up a new dimension of web development by allowing me to respond to user actions, update content without reloading the page, and manipulate HTML elements in real time. I started with basic concepts like variables, loops, functions, and conditional statements, which strengthened my logical thinking. As I progressed, I explored the Document Object Model (DOM), event handling, and how JavaScript integrates with HTML and CSS to create fully interactive web applications. I also experimented with animations, form validations, and dynamic styling. JavaScript gave me the ability to build smarter, more engaging user interfaces and laid the foundation for learning more advanced concepts and frameworks in web development."
    }
  ];

  let currentLangIdx = 0;
  const langTitle = document.getElementById("lang-title");
  const langDesc = document.getElementById("lang-desc");
  const langIcon = document.getElementById("lang-icon");
  const btnPrev = document.getElementById("lang-prev");
  const btnNext = document.getElementById("lang-next");
  const dotsContainer = document.getElementById("lang-dots");

  function initLanguages() {
    if (!langTitle || !langDesc || !dotsContainer) return;
    
    // Create dots
    dotsContainer.innerHTML = "";
    languagesData.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.classList.add("lang-dot");
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => showLanguage(idx));
      dotsContainer.appendChild(dot);
    });
    
    showLanguage(0);
  }

  function showLanguage(index) {
    if (!langTitle || !langDesc || !langIcon || !btnPrev || !btnNext || !dotsContainer) return;
    
    currentLangIdx = index;
    const data = languagesData[index];
    
    // Animate transition (fade out and scale)
    langDesc.style.opacity = 0;
    langDesc.style.transform = "translateY(10px)";
    langIcon.style.opacity = 0;
    langIcon.style.transform = "scale(0.8)";
    
    setTimeout(() => {
      langTitle.textContent = data.title;
      langDesc.textContent = data.desc;
      langIcon.innerHTML = data.icon;
      
      langDesc.style.opacity = 1;
      langDesc.style.transform = "translateY(0)";
      langIcon.style.opacity = 1;
      langIcon.style.transform = "scale(1)";
      
      // Update dots
      const dots = dotsContainer.querySelectorAll(".lang-dot");
      dots.forEach((dot, dIdx) => {
        if (dIdx === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
      
      // Update disabled states
      btnPrev.disabled = index === 0;
      btnNext.disabled = index === languagesData.length - 1;
    }, 200);
  }

  if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", () => {
      if (currentLangIdx > 0) {
        showLanguage(currentLangIdx - 1);
      }
    });
    
    btnNext.addEventListener("click", () => {
      if (currentLangIdx < languagesData.length - 1) {
        showLanguage(currentLangIdx + 1);
      }
    });
  }

  initLanguages();
});
