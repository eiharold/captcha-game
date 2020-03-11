const btnStart = document.querySelector('.start');
const btnRestart = document.querySelectorAll('.restart');
const btnGo = document.querySelector('.go');
const btnNext = document.querySelector('.gonext');
const answer = document.querySelector('.answer');
let total = document.querySelector('.total');
let finalscore = document.querySelector('.finalscore');
const homescreen = document.querySelector('.homescreen');
const game = document.querySelector('.game');
const next = document.querySelector('.next');

const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const secret = document.querySelector('.secret');
const captcha = document.querySelector('.captcha');
let captchaSize = 2;
let secretSize = "";

function hide(e) {
    secretSize = "";
    for (i = 0; i < e; i++) {
        secretSize += "*";
    }
};

hide(captchaSize);

let multiplier = 1000;

function multiply() {
    captcha.innerHTML = Math.ceil((Math.random() * multiplier));
    captchaSize++;
    hide(captchaSize);
}

multiply();

function start() {
    homescreen.classList.remove('active');
    game.classList.add('active');
    showCaptcha();
}

function restart() {
    game.classList.add('active');
    lose.classList.remove('active');
    win.classList.remove('active');
    showCaptcha();
}

function loseGame() {
    finalscore.innerHTML = total.innerHTML;
    game.classList.remove('active');
    lose.classList.add('active');
    multiplier = 1000;
    captchaSize = 2;
    total.innerHTML = 0;
    multiply();
}

function winGame() {
    finalscore.innerHTML = total.innerHTML;
    game.classList.remove('active');
    win.classList.add('active');
    multiplier = 10000;
    captchaSize = 3;
    total.innerHTML = 0;
    multiply();
}

function play(e) {
    e.preventDefault();
    if (total.innerHTML > 9) {
        winGame();
        return;
    }
    if (answer.value == "") {
        return;
    } else if (captcha.innerHTML === answer.value) {
        (total.innerHTML)++;
        multiplier = multiplier * 10;
        multiply();
        showNext();
    } else {
        loseGame();
    }
    answer.value = "";
}

function showNext() {
    game.classList.remove("active");
    next.classList.add("active");
}

function showCaptcha() {
    next.classList.remove("active");
    game.classList.add("active");
    secret.classList.remove("active");
    captcha.classList.add("active");
    answer.disabled = true;
    btnGo.disabled = true;
    setTimeout(() => {
        answer.disabled = false;
        btnGo.disabled = false;
        captcha.classList.remove("active");
        secret.innerHTML = secretSize;
        secret.classList.add("active");
    }, 3000);
}

btnStart.addEventListener('click', start);
btnRestart.forEach((btn) => btn.addEventListener('click', restart));
btnGo.addEventListener('click', play);
btnNext.addEventListener('click', showCaptcha);
