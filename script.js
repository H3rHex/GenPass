let lowerchar = true;
let upperchar = true;
let num = true;
let sym = true;
let charNum = 12;
let generatedPasswd = "";
const passwdElement = document.getElementById("GeneratedPassword");

document.addEventListener("DOMContentLoaded", () => {
    generatePasswd();
    //copyPasswd();
});

function generatePasswd() {
    if (!lowerchar && !upperchar && !num && !sym) {
        alert("Selecciona al menos un tipo de carácter.");
        generatedPasswd = "";
        passwdElement.textContent = generatedPasswd;
        return;
    }

    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const numbers = '0123456789'.split('');
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/`~'.split('');

    const availableChars = [];
    if (lowerchar) availableChars.push(...lowercaseLetters);
    if (upperchar) availableChars.push(...uppercaseLetters);
    if (num) availableChars.push(...numbers);
    if (sym) availableChars.push(...symbols);

    generatedPasswd = "";
    for (let i = 0; i < charNum; i++) {
        const index = Math.floor(Math.random() * availableChars.length);
        generatedPasswd += availableChars[index];
    }

    passwdElement.textContent = generatedPasswd;
}

function copyPasswd() {
    try {
        navigator.clipboard.writeText(generatedPasswd);
        messagePopUp();
    } catch (error) {
        alert("No se pudo copiar la contraseña. Intenta manualmente.");
    }
}

// Configuración de longitud
const slider = document.getElementById("slider");
const number = document.getElementById("number");

slider.addEventListener("input", () => {
    charNum = slider.value;
    number.value = slider.value;
    generatePasswd();
});

number.addEventListener("input", () => {
    let value = parseInt(number.value, 10);
    if (isNaN(value)) {
        value = 12; // Valor por defecto si no es un número
    }
    value = Math.min(Math.max(value, slider.min), slider.max);
    charNum = value;
    slider.value = value;
    number.value = value;
    generatePasswd();
});

// Configuración de opciones
const upperCaseCheck = document.getElementById("upperCase");
const lowerCaseCheck = document.getElementById("lowerCase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

upperCaseCheck.addEventListener("input", () => {
    upperchar = upperCaseCheck.checked;
    generatePasswd();
});

lowerCaseCheck.addEventListener("input", () => {
    lowerchar = lowerCaseCheck.checked;
    generatePasswd();
});

numbersCheck.addEventListener("input", () => {
    num = numbersCheck.checked;
    generatePasswd();
});

symbolsCheck.addEventListener("input", () => {
    sym = symbolsCheck.checked;
    generatePasswd();
});

let hide = true; // Definir la variable fuera de la función
const popUpElement = document.getElementById("copyPopUp");
const mainElement = document.getElementById("main");

function messagePopUp() {
    if (hide) {
        // Ocultar main con animación
        mainElement.classList.add("popUp-R");
        mainElement.addEventListener("animationend", () => {
            mainElement.style.display = "none"; // Se oculta al terminar la animación
            mainElement.classList.remove("popUp-R");
        }, { once: true });

        // Mostrar popUp con animación
        popUpElement.style.display = "flex";
        popUpElement.classList.add("popUp");
        popUpElement.addEventListener("animationend", () => {
            popUpElement.classList.remove("popUp");
        }, { once: true });

    } else {
        // Ocultar popUp y mostrar main con animación
        popUpElement.classList.add("popUp-R");
        popUpElement.addEventListener("animationend", () => {
            popUpElement.style.display = "none";
            popUpElement.classList.remove("popUp-R");
        }, { once: true });

        mainElement.style.display = "flex";
        mainElement.classList.add("popUp");
        mainElement.addEventListener("animationend", () => {
            mainElement.classList.remove("popUp");
        }, { once: true });
    }

    hide = !hide; // Alternar el estado
}
