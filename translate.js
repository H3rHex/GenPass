let translations = {};

// Cargar traducciones desde un archivo JSON
async function loadTranslations(lang) {
    const response = await fetch(`./${lang}.json`);
    translations = await response.json();
    applyTranslations();
}

// Aplicar traducciones a los elementos con el atributo data-translate
function applyTranslations() {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Cambiar idioma
function changeLanguage(lang) {
    loadTranslations(lang);
}

// Cargar idioma por defecto al iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadTranslations("es"); // Idioma por defecto: castellano
});