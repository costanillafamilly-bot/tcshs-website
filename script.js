/* =========================================
   TCSHS — script.js
   1 Intro  2 Menu  3 Hero slideshow  4 Modals
   5 Gallery  6 Admission portal  7 Scroll reveal
   8 Houses  9 Confetti  11 Atoms  12 Element card
========================================= */

document.documentElement.classList.add("js");

/* =========================================
   1. INTRO
========================================= */
window.addEventListener("load", function () {
    const intro = document.getElementById("logo-intro");
    if (!intro) return;
    setTimeout(function () {
        intro.classList.add("hide");
    }, 6200);
});

/* =========================================
   2. MOBILE MENU
========================================= */
function toggleMenu() {
    document.getElementById("main-nav").classList.toggle("open");
}

document.querySelectorAll("#main-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
        document.getElementById("main-nav").classList.remove("open");
    });
});

/* =========================================
   3. HERO BACKGROUND SLIDESHOW
========================================= */
(function () {
    const slides = document.querySelectorAll(".hero-slide");
    const number = document.querySelector(".hero-number");
    if (slides.length < 2) return;

    let index = 0;
    setInterval(function () {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
        if (number) number.textContent = String(index + 1).padStart(2, "0");
    }, 5500);
})();

/* =========================================
   4. MODALS (info, life, achievement)
========================================= */
function lockScroll(lock) {
    document.body.classList.toggle("no-scroll", lock);
}

function openModal(id) {
    document.getElementById(id).classList.add("open");
    lockScroll(true);
}

function closeModalById(id) {
    document.getElementById(id).classList.remove("open");
    if (!document.querySelector(".modal.open, .photo-modal.open")) {
        lockScroll(false);
    }
}

/* ---- General info modal ---- */
function openInfoModal(title, text) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalText").textContent = text;
    openModal("infoModal");
}
function closeInfoModal() { closeModalById("infoModal"); }
function closeModal() { closeInfoModal(); }

/* ---- Student life modal ---- */
function openLifeModal(title, text) {
    document.getElementById("lifeModalTitle").textContent = title;
    document.getElementById("lifeModalText").textContent = text;
    openModal("lifeModal");
}
function closeLifeModal() { closeModalById("lifeModal"); }

/* ---- Achievement modal ---- */
function openAchievement(card) {
    const img = document.getElementById("achievementImage");
    img.src = card.dataset.image;
    img.alt = card.dataset.title;
    document.getElementById("achievementCategory").textContent = card.dataset.category;
    document.getElementById("achievementTitle").textContent = card.dataset.title;
    document.getElementById("achievementDescription").textContent = card.dataset.description;
    openModal("achievementModal");
}
function closeAchievement() { closeModalById("achievementModal"); }

/* =========================================
   5. GALLERY
========================================= */
function openGallery(item) {
    const src = item.querySelector("img");
    const big = document.getElementById("galleryModalImage");
    big.src = src.src;
    big.alt = src.alt;
    openModal("galleryModal");
}
function closeGallery() { closeModalById("galleryModal"); }

/* =========================================
   6. ADMISSION PORTAL
========================================= */

/* PUT THE OFFICIAL APPLICATION FORM LINK HERE (example: "https://forms.gle/xxxx") */
const APPLICATION_URL = "";

function toggleAdmission() {
    const panel = document.getElementById("admissionPanel");
    const opening = !panel.classList.contains("open");
    panel.classList.toggle("open");
    if (opening) {
        setTimeout(function () {
            panel.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    }
}

function showPortalMessage(topic) {
    /* EDIT THESE TEXTS to match the official TCSHS process */
    const messages = {
        "Application Information":
            "Admission details and important reminders will be announced on the official TCSHS channels. Please check the school's announcements for the schedule and process.",
        "Requirements":
            "Applicants usually need to prepare academic records and personal documents. ",
        "Application Link":
            "The official online application form has not been connected yet. Please check back soon or contact the school."
    };

    if (topic === "Application Link" && APPLICATION_URL) {
        window.open(APPLICATION_URL, "_blank", "noopener");
        return;
    }
    openInfoModal(topic, messages[topic] || "More information coming soon.");
}

/* =========================================
   7. SCROLL REVEAL
========================================= */
(function () {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("in"); });
        return;
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
})();

/* ESC closes whatever is open */
document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeInfoModal();
    closeLifeModal();
    closeAchievement();
    closeGallery();
});

/* =========================================
   8. HOUSES DATA (used by the element card)
========================================= */
const HOUSES = {
    manthanein: { name: "Manthanein", color: "#2f7bff" },
    handasa:    { name: "Handasa",    color: "#e8453c" },
    techne:     { name: "Techne",     color: "#2fb36b" },
    scire:      { name: "Scire",      color: "#d4a72c" }
};

/* =========================================
   9. CONFETTI EXPLOSION
========================================= */
function explode(colors) {
    const c = document.getElementById("confetti");
    const x = c.getContext("2d");
    c.width = innerWidth;
    c.height = innerHeight;

    const P = [];
    for (let b = 0; b < 3; b++) {
        const ox = innerWidth * (0.25 + b * 0.25);
        const oy = innerHeight * 0.6;
        for (let i = 0; i < 110; i++) {
            const ang = Math.random() * Math.PI * 2;
            const sp = 4 + Math.random() * 11;
            P.push({
                x: ox, y: oy,
                vx: Math.cos(ang) * sp,
                vy: Math.sin(ang) * sp - 6,
                s: 4 + Math.random() * 6,
                r: Math.random() * 6,
                c: colors[i % colors.length],
                l: 1
            });
        }
    }

    (function frame() {
        x.clearRect(0, 0, c.width, c.height);
        P.forEach(function (p) {
            p.vy += 0.22; p.x += p.vx; p.y += p.vy;
            p.vx *= 0.99; p.r += 0.2; p.l -= 0.008;
            x.save();
            x.globalAlpha = Math.max(p.l, 0);
            x.translate(p.x, p.y);
            x.rotate(p.r);
            x.fillStyle = p.c;
            x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
            x.restore();
        });
        if (P.some(function (p) { return p.l > 0; })) requestAnimationFrame(frame);
        else x.clearRect(0, 0, c.width, c.height);
    })();
}

/* =========================================
   11. HERO ATOM NETWORK (reacts to mouse, click to burst)
========================================= */
(function () {
    const hero = document.querySelector(".hero");
    const cv = document.getElementById("atomCanvas");
    if (!hero || !cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = cv.getContext("2d");
    let W, H, nodes = [], sparks = [], running = true;
    const mouse = { x: -999, y: -999 };

    function resize() {
        W = cv.width = hero.clientWidth;
        H = cv.height = hero.clientHeight;
        const count = Math.min(90, Math.floor((W * H) / 17000));
        nodes = [];
        for (let i = 0; i < count; i++) {
            nodes.push({ x: Math.random() * W, y: Math.random() * H,
                         vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
                         r: 1.2 + Math.random() * 2 });
        }
    }

    hero.addEventListener("mousemove", function (e) {
        const r = hero.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("mouseleave", function () { mouse.x = mouse.y = -999; });

    hero.addEventListener("click", function (e) {
        if (e.target.closest("a, button")) return;
        const r = hero.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        for (let i = 0; i < 26; i++) {
            const a = Math.random() * Math.PI * 2, s = 1.5 + Math.random() * 5;
            sparks.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
                          l: 1, c: i % 3 ? "242,216,142" : "255,255,255" });
        }
        nodes.forEach(function (n) {
            const dx = n.x - x, dy = n.y - y, d = Math.hypot(dx, dy) || 1;
            if (d < 220) { n.vx += (dx / d) * 3; n.vy += (dy / d) * 3; }
        });
    });

    new IntersectionObserver(function (en) { running = en[0].isIntersecting; }).observe(hero);
    window.addEventListener("resize", resize);
    resize();

    (function frame() {
        requestAnimationFrame(frame);
        if (!running) return;
        ctx.clearRect(0, 0, W, H);

        nodes.forEach(function (n, i) {
            n.vx *= .995; n.vy *= .995;
            if (Math.abs(n.vx) < .15) n.vx += (Math.random() - .5) * .02;
            if (Math.abs(n.vy) < .15) n.vy += (Math.random() - .5) * .02;
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
            if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;

            for (let j = i + 1; j < nodes.length; j++) {
                const m = nodes[j], d = Math.hypot(n.x - m.x, n.y - m.y);
                if (d < 125) {
                    ctx.strokeStyle = "rgba(216,180,92," + (0.28 * (1 - d / 125)) + ")";
                    ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
                }
            }
            const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
            if (md < 190) {
                ctx.strokeStyle = "rgba(255,255,255," + (0.55 * (1 - md / 190)) + ")";
                ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                n.x += (mouse.x - n.x) * .004; n.y += (mouse.y - n.y) * .004;
            }
            ctx.fillStyle = "rgba(242,216,142,.8)";
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        });

        sparks = sparks.filter(function (s) { return s.l > 0; });
        sparks.forEach(function (s) {
            s.x += s.vx; s.y += s.vy; s.vx *= .96; s.vy *= .96; s.l -= .02;
            ctx.fillStyle = "rgba(" + s.c + "," + s.l + ")";
            ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2); ctx.fill();
        });
    })();
})();

/* =========================================
   12. DISCOVER YOUR ELEMENT (periodic-table card generator)
========================================= */
let lastHouse = null;
const CATEGORIES = ["Noble Thinker", "Reactive Innovator", "Brilliant Catalyst", "Transition Leader", "Stable Researcher", "Radiant Creator"];

function hashName(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h;
}

function makeElement() {
    const input = document.getElementById("elName");
    const raw = (input.value || "").trim();
    const col = drawElementCard(raw || "Scientist");
    explode([col, "#ffffff", "#f2d88e"]);
}

function drawElementCard(rawName) {
    const letters = rawName.replace(/[^a-zA-Z]/g, "") || "Scientist";
    const hash = hashName(rawName.toLowerCase());
    const symbol = letters[0].toUpperCase() +
        (letters.length > 1 ? letters[1 + (hash % (letters.length - 1))].toLowerCase() : "x");
    const number = (hash % 118) + 1;
    const mass = (number * 2.013 + (hash % 1000) / 1000).toFixed(3);
    const category = CATEGORIES[hash % CATEGORIES.length];
    const keys = Object.keys(HOUSES);
    const houseKey = lastHouse || keys[hash % keys.length];
    const house = HOUSES[houseKey];
    const stats = [["CURIOSITY", 62 + (hash >> 3) % 38], ["CREATIVITY", 62 + (hash >> 7) % 38], ["LOGIC", 62 + (hash >> 11) % 38]];

    const c = document.getElementById("elementCanvas");
    const x = c.getContext("2d");
    const W = c.width, H = c.height;
    const serif = '"Playfair Display", Georgia, serif', sans = '"DM Sans", Arial, sans-serif';

    function paint() {
        x.clearRect(0, 0, W, H);
        const bg = x.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, "#0b2347"); bg.addColorStop(1, "#050f20");
        x.fillStyle = bg; x.fillRect(0, 0, W, H);

        const glow = x.createRadialGradient(W / 2, 330, 20, W / 2, 330, 340);
        glow.addColorStop(0, house.color + "66"); glow.addColorStop(1, "transparent");
        x.fillStyle = glow; x.fillRect(0, 0, W, H);

        x.strokeStyle = house.color; x.lineWidth = 4; x.strokeRect(22, 22, W - 44, H - 44);
        x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 1.5; x.strokeRect(38, 38, W - 76, H - 76);

        x.textBaseline = "alphabetic";
        x.fillStyle = "#f2d88e"; x.font = "700 54px " + sans; x.textAlign = "left";
        x.fillText(number, 66, 118);
        x.font = "600 15px " + sans; x.fillStyle = "rgba(255,255,255,.6)";
        x.fillText("ATOMIC NUMBER", 68, 144);

        x.textAlign = "right"; x.fillStyle = house.color; x.font = "700 18px " + sans;
        x.fillText(house.name.toUpperCase(), W - 66, 100);
        x.fillStyle = "rgba(255,255,255,.6)"; x.font = "600 13px " + sans;
        x.fillText("HOUSE", W - 66, 124);

        x.textAlign = "center"; x.shadowColor = house.color; x.shadowBlur = 50;
        x.fillStyle = "#fff"; x.font = "700 250px " + serif;
        x.fillText(symbol, W / 2, 400);
        x.shadowBlur = 0;

        x.fillStyle = "#fff"; x.font = "700 34px " + sans;
        x.fillText(rawName.toUpperCase().slice(0, 24), W / 2, 468);
        x.fillStyle = "#f2d88e"; x.font = "600 18px " + sans;
        x.fillText(category.toUpperCase() + "  •  " + mass, W / 2, 504);

        stats.forEach(function (s, i) {
            const y = 566 + i * 44;
            x.textAlign = "left"; x.fillStyle = "rgba(255,255,255,.75)"; x.font = "700 13px " + sans;
            x.fillText(s[0], 80, y);
            x.fillStyle = "rgba(255,255,255,.12)"; x.fillRect(200, y - 12, 270, 10);
            x.fillStyle = house.color; x.fillRect(200, y - 12, 270 * s[1] / 100, 10);
            x.textAlign = "right"; x.fillStyle = "#fff"; x.fillText(s[1], W - 80, y);
        });

        x.textAlign = "center"; x.fillStyle = "rgba(255,255,255,.55)"; x.font = "600 12px " + sans;
        x.fillText("DISCOVERED AT TOLEDO CITY SCIENCE HIGH SCHOOL", W / 2, H - 78);
        x.fillStyle = "#f2d88e"; x.fillText("TCSHS ELEMENT  •  2026", W / 2, H - 56);
    }

    paint();
    if (document.fonts && document.fonts.load) {
        Promise.all([document.fonts.load("700 250px 'Playfair Display'"), document.fonts.load("700 20px 'DM Sans'")]).then(paint);
    }
    return house.color;
}

function downloadElement() {
    const name = (document.getElementById("elName").value || "scientist").trim().replace(/\s+/g, "-");
    document.getElementById("elementCanvas").toBlob(function (blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "TCSHS-element-" + name + ".png";
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
}

function pickHouse(key, btn) {
    lastHouse = key || null;
    document.querySelectorAll("#housePick button").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    makeElement();
}

(function () {
    const input = document.getElementById("elName");
    const stage = document.querySelector(".element-stage");
    const card = document.getElementById("elementCanvas");
    if (!input || !card) return;

    input.addEventListener("keydown", function (e) { if (e.key === "Enter") makeElement(); });
    drawElementCard("Scientist");

    /* 3D tilt */
    stage.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        card.style.transform = "rotateY(" + px * 16 + "deg) rotateX(" + (-py * 16) + "deg)";
    });
    stage.addEventListener("mouseleave", function () { card.style.transform = ""; });
})();