const generatePasswordBtn = document.querySelector('.input-button');
const outputText = document.querySelector('.output-text');
const sybmolsPassword = '!@#$%^&*()_+?><}|{~';
const string = 'qwertyuiopasdfghjklzxcvbnm';
const copyButton = document.querySelector('.copy-button');
let timesString = 16;
let intervalRepeat = 0;
let intervalStop;
let passwordSaver;

function generatePassword() {
    intervalStop = setInterval(() => {
        let mixing = Math.floor(Math.random() * 4);
        if (intervalRepeat < timesString) {
            intervalRepeat++;

            if (mixing === 0) {
                passwordSaver = string[Math.floor(Math.random() * 26)].toLowerCase();
            } else if (mixing === 1) {
                passwordSaver = Math.floor(Math.random() * 9);
            } else if (mixing === 2) {
                passwordSaver = string[Math.floor(Math.random() * 26)].toUpperCase();
            } else {
                passwordSaver = sybmolsPassword[Math.floor(Math.random() * sybmolsPassword.length)];
            }

            outputText.textContent += passwordSaver;
        } else {
            intervalRepeat = 0;
            clearInterval(intervalStop);
        };
    }, 5);
};

generatePasswordBtn.addEventListener('click', () => {
    outputText.textContent = '';
    generatePassword();
});

// COPY BUTTON

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.textContent);
    copyButton.classList.add('copy-button-copied');
    copyButton.disabled = true;
    setTimeout(() => {
        copyButton.classList.remove('copy-button-copied');
        copyButton.disabled = false;
    }, 3000);
});