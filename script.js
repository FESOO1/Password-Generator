const generatePasswordBtn = document.querySelector('.input-button');
const output = document.querySelector('.output');
const sybmolsPassword = '!@#$%^&*';
const string = 'qwertyuiopasdfghjklzxcvbnm';
let timesString = 8;
let intervalRepeat = 0;
let intervalStop;

function generatePassword() {
    intervalStop = setInterval(() => {
        if (intervalRepeat < 8) {
            intervalRepeat++;

            
        } else {
            clearInterval(intervalStop);
        };
    }, 1000);
};

generatePasswordBtn.addEventListener('click', generatePassword);