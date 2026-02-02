// ===== Helpers =====
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

function scrollToId(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({behavior:"smooth", block:"start"});
}

// ===== Nav =====
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.style.display === "block";
  mobileMenu.style.display = open ? "none" : "block";
});

$$("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-go");
    scrollToId(id);
    mobileMenu.style.display = "none";
  });
});

// ===== Scroll progress =====
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const p = (scrollTop / height) * 100;
  $(".progress").style.width = p + "%";
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.18});

$$(".reveal").forEach(el => observer.observe(el));

// ===== Tilt effect =====
$$(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  });
});

// ===== Projects data (Edit links as you like) =====
const projects = [
  {
    title: "E-commerce Platform",
    category: "Web",
    desc: "Scalable e-commerce web app with responsive UI and API integration.",
    stack: ["JavaScript", "HTML", "CSS", "API"],
    github: "#",
    live: "#",
  },
  {
    title: "Content Management System (CMS)",
    category: "Web",
    desc: "Admin dashboard & CMS workflows with strong performance.",
    stack: ["PHP", "Database", "UI"],
    github: "#",
    live: "#",
  },
  {
    title: "Interactive Website Suite",
    category: "Web",
    desc: "Collection of responsive interactive websites with optimized speed.",
    stack: ["JavaScript", "Responsive UI"],
    github: "#",
    live: "#",
  },
  {
    title: "Automation Toolkit",
    category: "Python",
    desc: "Automation scripts saving ~30 hours/week by reducing repetitive tasks.",
    stack: ["Python", "Automation"],
    github: "#",
    live: "#",
  },
  {
    title: "Data Processing Workflow",
    category: "Python",
    desc: "Improved data accuracy by 50% and reduced processing time by 60%.",
    stack: ["Python", "Data"],
    github: "#",
    live: "#",
  },
  {
    title: "Encryption Application",
    category: "Security",
    desc: "Secure encryption app focused on data protection with zero breaches.",
    stack: ["Encryption", "Security", "Protocols"],
    github: "#",
    live: "#",
  },
];

// ===== Render Projects =====
const grid = $("#projectsGrid");

function projectCard(p){
  return `
    <article class="tilt card pcard reveal" data-cat="${p.category}">
      <span class="label">${p.category}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">
        ${p.stack.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="actions">
        <a class="btn btn--primary" href="${p.github}" target="_blank" rel="noreferrer">
          <i class="fa-brands fa-github"></i> GitHub
        </a>
        <a class="btn btn--ghost" href="${p.live}" target="_blank" rel="noreferrer">
          Live Demo
        </a>
      </div>
    </article>
  `;
}

function renderProjects(activeTab="All"){
  grid.innerHTML = "";
  const list = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);
  grid.innerHTML = list.map(projectCard).join("");

  // observe new reveal elements
  $$("#projectsGrid .reveal").forEach(el => observer.observe(el));
  $$("#projectsGrid .tilt").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -10;
      const ry = ((x / rect.width) - 0.5) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
    });
  });
}
renderProjects();

// ===== Tabs filter =====
$$(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.tab);
  });
});

// ===== Counters =====
let countersStarted = false;
function animateCounters(){
  if(countersStarted) return;
  countersStarted = true;

  $$(".num").forEach(el => {
    const target = Number(el.dataset.target);
    const duration = 1200;
    const start = performance.now();

    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const value = Math.floor(target * ease);
      el.textContent = value.toLocaleString();
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const metricObserver = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting) animateCounters();
  });
},{threshold:0.28});

$$(".metrics").forEach(el => metricObserver.observe(el));

// ===== Contact form demo =====
$("#year").textContent = new Date().getFullYear();

$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#formMsg").textContent = "Message sent ✅ (Demo). Connect to EmailJS or backend later.";
  e.target.reset();
});

// ===== Smooth go for nav links =====
$$(".nav__link").forEach(btn => {
  btn.addEventListener("click", () => scrollToId(btn.dataset.go));
});
