(() => {
    const PLAY_AREA = document.querySelector('main');
    const START_BTN = document.querySelector('.start-game');
    const SCORES_BTN = document.querySelector('.scores');
    const MAIN_MENU = document.querySelector('.main-menu');
    const BLACKOUT = document.querySelector('.blackout');
    const TITLE = document.querySelector('.game-title');
    const STATS = document.querySelector('.stats');
    let counter = document.querySelector('.counter');

    function startGame() {
        MAIN_MENU.classList.add('to-top'); //сделать отдельную функцию для появления HUD
        SCORES_BTN.classList.add('to-top');
        START_BTN.classList.add('fade');
        SCORES_BTN.classList.add('fade');
        TITLE.classList.add('fade');
        MAIN_MENU.addEventListener('animationend', () => {
            MAIN_MENU.classList.remove('to-top');
            MAIN_MENU.classList.add('score-top');
            BLACKOUT.classList.remove('blurred-bg');
            STATS.classList.add('lower');
        })
        for (let countdown = 3; countdown >= 0; countdown++) {
            let num = document.createElement('h3');
            num.classList.add('countdown');
            num.textContent = countdown;
            PLAY_AREA.append(num);
            setTimeout(() => num.remove, 1000);
        }
        for (let i = 0; i < 10; i++) {
            let balloon = document.createElement('img');
            balloon.classList.add("balloon");
            balloon.classList.add("to-right");
            balloon.addEventListener('click', popBalloon);
            balloon.src = './img/balloon_blue.png';
            balloon.alt = 'balloon';
            PLAY_AREA.append(balloon);
        }
    }

    function popBalloon() {
        console.log('POP!');
        counter.textContent++;
    }

    START_BTN.addEventListener('click', startGame);
})()

console.log('Самооценка:');