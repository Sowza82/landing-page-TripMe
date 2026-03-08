/**
 * TRIPME - SCRIPT DE INTERAÇÃO E ESTADOS
 */

const html = document.documentElement;
const btnTema = document.getElementById("alternar-tema");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const btnAbrir = document.getElementById("btn-abrir");
const btnFechar = document.getElementById("btn-fechar");
const btnTopo = document.getElementById("btn-topo");

/**
 * 1. TEMA (LIGHT/DARK)
 */
const updateThemeUI = (theme) => {
    html.setAttribute("data-tema", theme);
    btnTema.textContent = theme === "claro" ? "🌙" : "☀️";
};

btnTema.addEventListener("click", () => {
    const current = html.getAttribute("data-tema");
    const next = current === "claro" ? "escuro" : "claro";
    updateThemeUI(next);
    localStorage.setItem("tripme_theme", next);
});

/**
 * 2. SIDEBAR COM PERSISTÊNCIA EM LOCALSTORAGE
 * Implementação baseada na preferência guardada do utilizador.
 */
const setSidebarState = (state, save = true) => {
    if (state === "aberta") {
        sidebar.classList.add("aberta");
        overlay.classList.add("visivel");
        if (save) localStorage.setItem("tripme_sidebar", "aberta");
    } else {
        sidebar.classList.remove("aberta");
        overlay.classList.remove("visivel");
        if (save) localStorage.setItem("tripme_sidebar", "fechada");
    }
};

btnAbrir.addEventListener("click", () => setSidebarState("aberta"));
btnFechar.addEventListener("click", () => setSidebarState("fechada"));
overlay.addEventListener("click", () => setSidebarState("fechada"));

// Fechar sidebar ao navegar
document.querySelectorAll(".sidebar-links a").forEach(link => {
    link.addEventListener("click", () => setSidebarState("fechada"));
});

/**
 * 3. FAQ ACORDEÃO
 */
document.querySelectorAll(".faq-item").forEach(item => {
    const pergunta = item.querySelector(".faq-pergunta");
    pergunta.addEventListener("click", () => {
        const isActive = item.classList.contains("ativo");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("ativo"));
        if (!isActive) item.classList.add("ativo");
    });
});

/**
 * 4. ANIMAÇÕES DE REVEAL & VOLTAR AO TOPO
 */
const handleRevealAndTopBtn = () => {
    // Reveal
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });

    // Top Button
    if (window.scrollY > 400) {
        btnTopo.classList.add("visivel");
    } else {
        btnTopo.classList.remove("visivel");
    }
};

window.addEventListener("scroll", handleRevealAndTopBtn);

btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/**
 * 5. INICIALIZAÇÃO (CARREGAR PREFERÊNCIAS)
 */
window.addEventListener("DOMContentLoaded", () => {
    // Carregar Tema
    const savedTheme = localStorage.getItem("tripme_theme") || "claro";
    updateThemeUI(savedTheme);

    // Carregar Estado da Sidebar (Informação partilhada: "lembrar se estava aberta ou fechada")
    const savedSidebar = localStorage.getItem("tripme_sidebar");
    if (savedSidebar === "aberta") {
        setSidebarState("aberta", false); // Não guarda de novo no load para não criar loop
    }

    handleRevealAndTopBtn();
});

/**
 * 6. CONTADOR ANIMADO NAS ESTATÍSTICAS
 */

const counters = document.querySelectorAll(".stat-item h3");

const startCounters = () => {

counters.forEach(counter => {

const target = parseInt(counter.innerText);
let count = 0;

const updateCount = () => {

const increment = target / 100;

if(count < target){

count += increment;
counter.innerText = Math.floor(count);

requestAnimationFrame(updateCount);

}else{

counter.innerText = target;

}

};

updateCount();

});

};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

startCounters();
observer.disconnect();

}

});

});

if(statsSection){
observer.observe(statsSection);
}

/**
 * 7. LIGHTBOX DA GALERIA
 */

const galleryImages = document.querySelectorAll(".galeria-grid img");

const lightbox = document.createElement("div");
lightbox.id = "lightbox";

document.body.appendChild(lightbox);

galleryImages.forEach(img => {

img.addEventListener("click", () => {

lightbox.classList.add("ativo");

const imgLight = document.createElement("img");
imgLight.src = img.src;

lightbox.innerHTML = "";
lightbox.appendChild(imgLight);

});

});

lightbox.addEventListener("click", () => {
lightbox.classList.remove("ativo");
});
