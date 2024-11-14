const outputContainer = document.querySelector('.output');
const generatePasswordBtn = document.querySelector('.input-button');
const outputText = document.querySelector('.output-text');
const sybmolsPassword = '!@#$%^&*()_+?}|{~.,';
const string = 'qwertyuiopasdfghjklzxcvbnm';
const copyButton = document.querySelector('.copy-button');
const popUpMessage = document.querySelector('.pop-up-message');
const popUpMessageItself = document.querySelector('.pop-up-message-itself');
const copiedPasswordsContainer = document.querySelector('.all-the-copied-passwords-container');
const copiedPasswordsThemselves = document.querySelector('.all-the-copied-passwords-container-bottom');
const copiedPasswordsContainerBtn = document.querySelector('.all-the-copied-passwords-container-top-button');
let timesString = 16;
let intervalRepeat = 0;
let intervalStop;
let passwordSaver;
const copiedPasswords = [];

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
    if (outputText.textContent.length > 0) {
        navigator.clipboard.writeText(outputText.textContent);
        copyButton.classList.add('copy-button-copied');
        copyButton.disabled = true;
        popUpMessage.style.top = '10px';
        setTimeout(() => {
            copyButton.classList.remove('copy-button-copied');
            copyButton.disabled = false;
            popUpMessage.style.top = '-50px';
        }, 3000);

        // 
        const copiedPasswordItself = document.createElement('div');
        copiedPasswordItself.classList.add('copied-password-itself');
        const copiedPasswordItselfText = document.createElement('h3');
        copiedPasswordItselfText.classList.add('copied-password-itself-text');
        const copiedPasswordItselfDivider = document.createElement('hr');
        copiedPasswordItselfDivider.classList.add('copied-password-itself-divider');
        const copiedPasswordItselfButton = document.createElement('copied-password-itself-button');
        copiedPasswordItselfButton.classList.add('copied-password-itself-button');
        copiedPasswordItselfButton.innerHTML = `
            <svg class="copied-password-itself-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>
            <svg class="copied-password-itself-button-svg-copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
        `;
        copiedPasswordItself.appendChild(copiedPasswordItselfText);
        copiedPasswordItself.appendChild(copiedPasswordItselfDivider);
        copiedPasswordItself.appendChild(copiedPasswordItselfButton);

        copiedPasswordsThemselves.appendChild(copiedPasswordItself);
        copiedPasswordItselfText.textContent = outputText.textContent;

        // COPY BUTTON
        copiedPasswordItselfButton.addEventListener('click', () => {
            navigator.clipboard.writeText(copiedPasswordItselfText.textContent);
            copiedPasswordItselfButton.classList.add('copied-password-itself-button-copied');
            setTimeout(() => {
                copiedPasswordItselfButton.classList.remove('copied-password-itself-button-copied');
            }, 3000);
        });

        // LOCAL STORAGE
        copiedPasswords.push(outputText.textContent);
        localStorage.setItem('copiedPasswordsStorage', JSON.stringify(copiedPasswords));
    } else {
        outputContainer.classList.add('output-error');
        setTimeout(() => {
            outputContainer.classList.remove('output-error');
        }, 201);
    };
});


// COPIED PASSWORDS

copiedPasswordsContainerBtn.addEventListener('click', () => {
    copiedPasswordsContainer.classList.toggle('copied-passwords-container-js');
});



// DISPLAY DATA FROM LOCAL STORAGE

function displayCopiedPasswordsThatAreSavedInTheLocalStorage() {
    const storedCopiedPasswords = JSON.parse(localStorage.getItem('copiedPasswordsStorage'));

    if (storedCopiedPasswords.length > 0) {
        for (let i = 0; i < storedCopiedPasswords; i++) {
            const copiedPasswordItself = document.createElement('div');
            copiedPasswordItself.classList.add('copied-password-itself');
            const copiedPasswordItselfText = document.createElement('h3');
            copiedPasswordItselfText.classList.add('copied-password-itself-text');
            const copiedPasswordItselfDivider = document.createElement('hr');
            copiedPasswordItselfDivider.classList.add('copied-password-itself-divider');
            const copiedPasswordItselfButton = document.createElement('copied-password-itself-button');
            copiedPasswordItselfButton.classList.add('copied-password-itself-button');
            copiedPasswordItselfButton.innerHTML = `
                <svg class="copied-password-itself-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>
                <svg class="copied-password-itself-button-svg-copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
            `;
            copiedPasswordItself.appendChild(copiedPasswordItselfText);
            copiedPasswordItself.appendChild(copiedPasswordItselfDivider);
            copiedPasswordItself.appendChild(copiedPasswordItselfButton);

            copiedPasswordItselfText.textContent = storedCopiedPasswords[i];
            copiedPasswordsThemselves.appendChild(copiedPasswordItself);

            // COPY BUTTON
            /* copiedPasswordItselfButton.addEventListener('click', () => {
                navigator.clipboard.writeText(copiedPasswordItselfText.textContent);
                copiedPasswordItselfButton.classList.add('copied-password-itself-button-copied');
                setTimeout(() => {
                    copiedPasswordItselfButton.classList.remove('copied-password-itself-button-copied');
                }, 3000);
            });
            // LOCAL STORAGE
            copiedPasswords.push(storedCopiedPasswords[i]);
            localStorage.setItem('copiedPasswords', JSON.stringify(copiedPasswords)); */
        };
    };
}


displayCopiedPasswordsThatAreSavedInTheLocalStorage();