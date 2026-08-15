/* =========================================================
   DEVELOPER JUNAID — PREMIUM PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
       ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("loaded");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 700);
            }
        }, 700);
    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const navObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    const href = link.getAttribute("href");

                    if (href === `#${entry.target.id}`) {
                        link.classList.add("active");
                    }
                });

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =====================================================
       PREMIUM SCROLL REVEAL
       ===================================================== */

    const motionItems = document.querySelectorAll(
        ".section-heading, " +
        ".about-heading, " +
        ".about-copy, " +
        ".skills-grid .skill-card, " +
        ".tools-header, " +
        ".tools-grid .tool-card, " +
        ".stats-grid .stat-item, " +
        ".contact-top, " +
        ".contact-heading, " +
        ".contact-bottom, " +
        ".intro-content"
    );

    motionItems.forEach((element, index) => {

        element.classList.add("motion-reveal");

        element.style.setProperty(
            "--motion-delay",
            `${Math.min(index * 70, 420)}ms`
        );

    });


    const motionObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("motion-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.10,
            rootMargin: "0px 0px -70px 0px"
        }
    );


    motionItems.forEach(element => {
        motionObserver.observe(element);
    });


    /* =====================================================
       OLD REVEAL SUPPORT
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       MOBILE CARD TAP EFFECT
       ===================================================== */

    const interactiveCards = document.querySelectorAll(
        ".skill-card, " +
        ".tool-card, " +
        ".stat-item, " +
        ".project-item"
    );


    interactiveCards.forEach(card => {

        card.addEventListener("pointerdown", () => {
            card.classList.add("card-pressed");
        });


        card.addEventListener("pointerup", () => {

            setTimeout(() => {
                card.classList.remove("card-pressed");
            }, 180);

        });


        card.addEventListener("pointercancel", () => {
            card.classList.remove("card-pressed");
        });


        card.addEventListener("pointerleave", () => {
            card.classList.remove("card-pressed");
        });

    });


    /* =====================================================
       DESKTOP CARD TILT
       ===================================================== */

    if (window.matchMedia("(hover: hover)").matches) {

        const tiltCards = document.querySelectorAll(
            ".skill-card, .tool-card"
        );


        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)
                     scale(1.015)`;

            });


            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });

        });

    }


    /* =====================================================
       ⭐ ANIMATED STAT COUNTERS
       ===================================================== */

    const statNumbers = document.querySelectorAll(".stat-number");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                // IMPORTANT:
                // HTML uses data-count="50", data-count="10", etc.
                const target = Number(
                    element.getAttribute("data-count")
                );

                // যদি target না পাওয়া যায় তাহলে stop
                if (!Number.isFinite(target) || target <= 0) {
                    return;
                }

                const duration = 1600;
                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    // Smooth ease-out
                    const easedProgress =
                        1 - Math.pow(
                            1 - progress,
                            3
                        );


                    const currentValue =
                        Math.floor(
                            target * easedProgress
                        );


                    element.textContent =
                        currentValue;


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        // Final exact value
                        element.textContent =
                            target;

                    }
                }


                // Start from zero
                element.textContent = "0";

                requestAnimationFrame(
                    updateCounter
                );


                // Only animate once
                counterObserver.unobserve(element);

            });

        },
        {
            threshold: 0.35
        }
    );


    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
       ===================================================== */

    if (window.matchMedia("(hover: hover)").matches) {

        const buttons = document.querySelectorAll(
            ".btn-primary, " +
            ".btn-secondary, " +
            ".nav-contact"
        );


        buttons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    ) scale(1.025)`;

            });


            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });

        });

    }


    /* =====================================================
       SOCIAL ICON MICRO INTERACTION
       ===================================================== */

    document.querySelectorAll(".social-links a").forEach(icon => {

        icon.addEventListener("pointerdown", () => {
            icon.classList.add("social-pressed");
        });


        icon.addEventListener("pointerup", () => {

            setTimeout(() => {
                icon.classList.remove("social-pressed");
            }, 150);

        });

    });


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia("(hover: hover)").matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 2;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2;


                heroVisual.style.transform =
                    `translate3d(
                        ${x * 5}px,
                        ${y * 5}px,
                        0
                    )`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       ESC — CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       BRANDING
       ===================================================== */

    console.log(
        "%c Developer Junaid ",
        "background:#ff2438;color:white;padding:8px 14px;border-radius:6px;font-weight:bold;"
    );

    console.log(
        "%c Developer × Video Editor ",
        "color:#ff2438;font-weight:bold;"
    );

});