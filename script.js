const generatePasswordBtn = document.querySelector('.input-button');
const outputText = document.querySelector('.output-text');
const sybmolsPassword = '!@#$%^&*()_+?><}|{~.,';
const string = 'qwertyuiopasdfghjklzxcvbnm';
const copyButton = document.querySelector('.copy-button');
const popUpMessage = document.querySelector('.pop-up-message');
const popUpMessageItself = document.querySelector('.pop-up-message-itself');
const copiedPasswordsContainer = document.querySelector('.all-the-copied-passwords-container');
const copiedPasswordsContainerBtn = document.querySelector('.all-the-copied-passwords-container-top-button');
let timesString = 16;
let intervalRepeat = 0;
let intervalStop;
let passwordSaver;

// GENERATE PASSWORD

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
    popUpMessage.style.bottom = '10px';
    setTimeout(() => {
        copyButton.classList.remove('copy-button-copied');
        copyButton.disabled = false;
        popUpMessage.style.bottom = '-50px';
    }, 3000);
});


// COPIED PASSWORDS

copiedPasswordsContainerBtn.addEventListener('click', () => {
    copiedPasswordsContainer.classList.toggle('copied-passwords-container-js');
});