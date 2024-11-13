const generatePasswordBtn = document.querySelector('.input-button');
const outputText = document.querySelector('.output-text');
const sybmolsPassword = '!@#$%^&*()_+?><}|{~';
const string = 'qwertyuiopasdfghjklzxcvbnm';
let timesString = 8;
let intervalRepeat = 0;
let intervalStop;
let passwordSaver;

function generatePassword() {
    intervalStop = setInterval(() => {
        let mixing = Math.floor(Math.random() * 4);
        if (intervalRepeat < 12) {
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
    }, 10);
};

generatePasswordBtn.addEventListener('click', () => {
    outputText.textContent = '';
    generatePassword();
});