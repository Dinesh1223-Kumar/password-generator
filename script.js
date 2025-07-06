// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const Strengthlable = document.getElementById("strength-lable");


const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";


lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

// Generate password on button click
generateButton.addEventListener("click", makepassword);

// Initial password when page loads
window.addEventListener("DOMContentLoaded", makepassword);

// Copy to clipboard button
copyButton.addEventListener("click", () => {
    if (!passwordInput.value) return;

    navigator.clipboard
        .writeText(passwordInput.value)
        .then(() => showcopysuccess())
        .catch((error) => console.log("Could not copy", error));
});

// Password generation logic
function makepassword() {
    const length = Number(lengthSlider.value);
    const includeuppercase = uppercaseCheckbox.checked;
    const includelowercase = lowercaseCheckbox.checked;
    const includenumbers = numbersCheckbox.checked;
    const includesymbols = symbolsCheckbox.checked;

    if (!includeuppercase && !includelowercase && !includenumbers && !includesymbols) {
        alert("Please select at least one character type");
        return;
    }

    const newpassword = createrandompassword(length, includeuppercase, includelowercase, includenumbers, includesymbols);
    passwordInput.value = newpassword;
    updateStrengthmeter(newpassword);
}

// Create a random password
function createrandompassword(length, includeuppercase, includelowercase, includenumbers, includesymbols) {
    let allchar = "";

    if (includeuppercase) allchar += uppercaseLetters;
    if (includelowercase) allchar += lowercaseLetters;
    if (includenumbers) allchar += numberCharacters;
    if (includesymbols) allchar += symbolCharacters;

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomindex = Math.floor(Math.random() * allchar.length);
        password += allchar[randomindex];
    }

    return password;
}

// Update strength meter
function updateStrengthmeter(password) {
    const passwordlength = password.length;
    const haslowercase = /[a-z]/.test(password);
    const hasuppercase = /[A-Z]/.test(password);
    const hasnumbers = /[0-9]/.test(password);
    const hassymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(password);

    let strengthscore = 0;

    // Base score from length (max 40)
    strengthscore += Math.min(passwordlength * 2, 40);

    if (hasuppercase) strengthscore += 15;
    if (haslowercase) strengthscore += 15;
    if (hasnumbers) strengthscore += 15;
    if (hassymbols) strengthscore += 15;

    if (passwordlength > 8) {
        strengthscore = Math.min(strengthscore, 100);
    }

    const safescore = Math.max(5, Math.min(100, strengthscore));
    strengthBar.style.width = safescore + "%";

    let strengthlabletext = "";
    let barcolor = "";

    if (safescore < 40) {
        barcolor = "#fc8181"; // red
        strengthlabletext = "Weak";
    } else if (safescore < 70) {
        barcolor = "#fbd38d"; // yellow
        strengthlabletext = "Medium";
    } else {
        barcolor = "rgb(37, 219, 107)"; // green
        strengthlabletext = "Strong";
    }

    strengthBar.style.backgroundColor = barcolor;
    Strengthlable.textContent = strengthlabletext;
}

// Show copy success feedback
function showcopysuccess() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "rgb(109, 237, 162)";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 1000);
}
