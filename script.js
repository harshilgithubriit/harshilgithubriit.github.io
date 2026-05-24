/* ==========================================================================
   PORTFOLIO LOGICAL BRAIN - HARSHIL MISHRA PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AI Neural Particle Canvas Background
    initNeuralCanvas();

    // 2. Initialize Glassmorphic Bento Cards Interactive Glow
    initBentoCardGlow();

    // 3. Initialize Typewriter Tagline Title
    initTypewriter();

    // 4. Initialize Interactive Terminal Widget
    initTerminalWidget();

    // 5. Initialize Project Filters
    initProjectFilters();

    // 6. Initialize Scroll Reveal Animations (Apple Vision Pro effect)
    initScrollReveal();
});

/* ==========================================================================
   1. AI NEURAL CANVAS PARTICLE SYSTEM (HIGHLY OPTIMIZED)
   ========================================================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById("neuralCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    // Mouse tracker
    const mouse = {
        x: null,
        y: null,
        radius: 110 // Optimized interactive connection radius
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize canvas handler
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener("resize", resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.35; // Gentle float
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 1.5 + 1; // Elegant tiny dust
            this.baseAlpha = Math.random() * 0.2 + 0.1;
            this.alpha = this.baseAlpha;
        }

        update() {
            // Screen boundary bounce
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.x += this.vx;
            this.y += this.vy;

            // Interactive mouse attraction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    this.x += dx * 0.003;
                    this.y += dy * 0.003;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${this.alpha})`;
            ctx.fill();
        }
    }

    function initParticles() {
        // Optimized density: reduces math calculation load by 70% to eliminate lag
        const particleCount = Math.min(42, Math.floor((canvas.width * canvas.height) / 35000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 85) { // Connection threshold
                    let alpha = (1 - dist / 85) * 0.06;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }

            // Draw line to mouse
            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let alpha = (1 - dist / mouse.radius) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawLines();
        animationFrameId = requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

/* ==========================================================================
   2. BENTO CARDS 3D TILT & GLOW INTERACTION (APPLE AESTHETIC)
   ========================================================================== */
function initBentoCardGlow() {
    const cards = document.querySelectorAll(".bento-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pass glow coordinates
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);

            // 3D Perspective Card Tilt Calculation (Apple Promo Page Effect)
            const width = rect.width;
            const height = rect.height;
            const centerX = width / 2;
            const centerY = height / 2;
            
            // Maximum tilt angle in degrees (keep it subtle and premium)
            const maxTilt = 7;
            const tiltX = ((y - centerY) / centerY) * -maxTilt;
            const tiltY = ((x - centerX) / centerX) * maxTilt;

            card.style.setProperty("--rx", `${tiltX}deg`);
            card.style.setProperty("--ry", `${tiltY}deg`);
        });

        // Smooth reset when mouse leaves card
        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--rx", `0deg`);
            card.style.setProperty("--ry", `0deg`);
        });
    });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const textElement = document.querySelector(".typewriter-text");
    if (!textElement) return;

    const words = JSON.parse(textElement.getAttribute("data-words") || "[]");
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 40; // Deletes faster
        } else {
            charIndex++;
            typingSpeed = 90; // Standard typing speed
        }

        // Render current slice of word
        textElement.textContent = currentWord.substring(0, charIndex);

        // Word finished typing
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } 
        // Word finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Brief pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   4. INTERACTIVE TERMINAL WIDGET
   ========================================================================== */
function initTerminalWidget() {
    const terminalInput = document.getElementById("terminal-input");
    const terminalBody = document.getElementById("terminal-body");
    
    if (!terminalInput || !terminalBody) return;

    // Database containing resume stats
    const harshilResume = {
        about: "HARSHIL MISHRA\nB.Tech Computer Science student at RIIT. Dedicated Gen AI Engineer & Backend Architect specializing in constructing intelligent Generative AI agents, Large Language Model pipelines, and responsive web backends.",
        skills: "TECHNICAL STACK:\n============================\n- AI / GENAI: Large Language Model integrations, Prompt Engineering, NLP pipelines\n- LANGUAGES:  Python, Java, JavaScript, TypeScript, PHP, HTML/CSS\n- DATABASES:  MySQL, MongoDB\n- SPECIALTY:  Exploratory Data Analysis (EDA), Regression Models, Node.js JWT APIs",
        projects: "FEATURED WORK:\n============================\n[1] AI Career Copilot (LLM Resume Grader)\n[2] Medical Chatbot API (Python NLP Agent)\n[3] Student Management Backend (Node/MongoDB/JWT)\n[4] House Sale Regression Modeling (Python EDA)\n[5] HR Analytics Dashboard (Visual Metrics)\n[6] AmplifyEase Chatbot Widget (Dialog Tree API)\n[7] Whisperbox Suite (TypeScript Secure Messager)",
        contact: "COMMUNICATION CHANNELS:\n============================\n- EMAIL:    harshmishra45072@gmail.com\n- LINKEDIN: https://www.linkedin.com/in/harshilmishra060/\n- GITHUB:   https://github.com/harshilgithubriit",
        github: "Opening https://github.com/harshilgithubriit in a new tab...",
        linkedin: "Opening https://linkedin.com/in/harshilmishra060/ in a new tab..."
    };

    // Command History indexer
    let commandHistory = [];
    let historyIndex = -1;

    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = terminalInput.value.trim();
            if (val !== "") {
                commandHistory.push(val);
                historyIndex = commandHistory.length;
                processCommand(val);
            }
            terminalInput.value = "";
        } 
        // Cycle command history up
        else if (e.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } 
        // Cycle command history down
        else if (e.key === "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = "";
            }
            e.preventDefault();
        }
    });

    // Make the entire terminal box clickable to focus input
    const cardTerminal = document.querySelector(".card-terminal");
    if (cardTerminal) {
        cardTerminal.addEventListener("click", () => {
            terminalInput.focus();
        });
    }

    function processCommand(cmd) {
        const formattedCmd = cmd.toLowerCase();
        
        // Print typed command to history line
        appendLine(`harshil@riit-pc:~$ ${cmd}`, "text-purple");

        // Command parser routing
        switch (formattedCmd) {
            case "help":
                appendLine("Available commands:\n  [about]    - Professional biography & background\n  [skills]   - Detailed technical skills list\n  [projects] - Overview of my primary coding projects\n  [contact]  - E-mail & profile links\n  [github]   - Open my GitHub profile\n  [clear]    - Empty terminal console outputs\n  [whoami]   - Check active user identity\n  [date]     - Display current server date & time", "text-muted");
                break;
            case "about":
                appendLine(harshilResume.about, "text-cyan");
                break;
            case "skills":
                appendLine(harshilResume.skills, "text-yellow");
                break;
            case "projects":
                appendLine(harshilResume.projects, "text-green");
                break;
            case "contact":
                appendLine(harshilResume.contact, "text-light");
                break;
            case "github":
                appendLine(harshilResume.github, "text-cyan");
                window.open("https://github.com/harshilgithubriit", "_blank");
                break;
            case "linkedin":
                appendLine(harshilResume.linkedin, "text-cyan");
                window.open("https://www.linkedin.com/in/harshilmishra060/", "_blank");
                break;
            case "clear":
                const outputArea = terminalBody.querySelector(".terminal-output");
                if (outputArea) outputArea.innerHTML = "";
                break;
            case "whoami":
                appendLine("guest@harshilmishra.pc", "text-light");
                break;
            case "date":
                appendLine(new Date().toString(), "text-muted");
                break;
            default:
                appendLine(`sh: command not found: ${cmd}. Type 'help' for options.`, "text-red");
        }

        // Scroll terminal to base line
        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 30);
    }

    function appendLine(text, className = "") {
        const outputArea = terminalBody.querySelector(".terminal-output");
        if (!outputArea) return;

        const p = document.createElement("p");
        p.className = `terminal-line ${className}`;
        
        // Retain format newlines cleanly
        p.innerHTML = text.replace(/\n/g, "<br>");
        outputArea.appendChild(p);
    }
}

/* ==========================================================================
   5. PROJECT FILTER SELECTION
   ========================================================================== */
function initProjectFilters() {
    const filters = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            // Remove active style from siblings, apply to clicked target
            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            const selectedFilter = filter.getAttribute("data-filter");

            projectItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (selectedFilter === "all" || category === selectedFilter) {
                    // Reveal with nice fade scaling
                    item.style.display = "flex";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    // Mask and collapse
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   6. SCROLL REVEAL OBSERVER (APPLE VISION PRO SCROLL SYSTEM)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12 // Reveal when 12% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing after reveal to boost scroll performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}
