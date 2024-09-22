(() => {
    const musicData = [
        {
            'id': 0,
            'artist': 'Journey',
            'song': "Don't Stop Believing",
            'audio': './audio/journey-don_t_stop_believing.mp3',
            'img': './img/Journey.jpg',
        },
        {
            'id': 1,
            'artist': 'Muse',
            'song': "Uprising",
            'audio': './audio/Muse-Uprising.mp3',
            'img': './img/Muse.png',
        },
        {
            'id': 2,
            'artist': 'Marvin Gaye',
            'song': "Ain't no mountain high enough",
            'audio': './audio/marvin_gaye_-_ain_t_no_mountain_high_enough.mp3',
            'img': './img/Marvin_Gaye.png',
        }
    ]
    const playBtn = document.querySelector('.toggle-button');
    const playSvg = document.querySelector('.play-svg');
    const pauseSvg = document.querySelector('.pause-svg');
    let order = [2, 0, 1];
    const audio = new Audio();
    audio.src = musicData[order[1]]['audio'];
    let isPlay = false;

    function playAudio() {
        // audio.src = './audio/journey-don_t_stop_believing.mp3';
        // audio.src = musicData[order[1]]['audio'];
        audio.play();
        isPlay = true;
        pauseSvg.classList.remove('hidden');
        pauseSvg.nextElementSibling.classList.remove('hidden');
        playSvg.classList.add('hidden');
    }

    function pauseAudio() {
        audio.pause();
        isPlay = false;
        playSvg.classList.remove('hidden');
        pauseSvg.classList.add('hidden');
        pauseSvg.nextElementSibling.classList.add('hidden');
    }

    function toggleBtn() {
        if (isPlay) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    playBtn.addEventListener('click', toggleBtn);

    const nextBtn = document.querySelector('.next-button');
    const prevBtn = document.querySelector('.prev-button');
    const COVERS = document.querySelector('.cover-wrapper');
    const TRACKNAMES = document.querySelector('.music-name-wrapper');
    const durationTime = document.querySelector('.duration');

    audio.addEventListener('loadeddata', () => {
        durationTime.textContent = getTimeFromNum(audio.duration);
    })

    function nextTrack() {
        order.push(order.shift());
        currentTrackID = order[1];
        audio.src = musicData[order[1]]['audio'];
        playAudio();
        // durationTime.textContent = getTimeFromNum(audio.duration);
        COVERS.classList.add('to-left');
        TRACKNAMES.classList.add('to-left');
        document.querySelector('.background-image').style.backgroundImage = `url(${musicData[order[1]]['img']})`;
        COVERS.addEventListener('animationend', () => {
            COVERS.classList.remove('to-left');
            TRACKNAMES.classList.remove('to-left');
            //присваиваем элементам новые обложки
            for (let i = 0; i < COVERS.children.length; i++) {
                COVERS.children[i].src = musicData[order[i]]['img'];
                TRACKNAMES.children[i].firstElementChild.textContent = musicData[order[i]]['artist'];
                TRACKNAMES.children[i].lastElementChild.textContent = musicData[order[i]]['song'];
            }
        })
    }

    function prevTrack() {
        order.unshift(order.pop());
        currentTrackID = order[1];
        audio.src = musicData[order[1]]['audio'];
        playAudio();
        COVERS.classList.add('to-right');
        TRACKNAMES.classList.add('to-right');
        document.querySelector('.background-image').style.backgroundImage = `url(${musicData[order[1]]['img']})`;
        COVERS.addEventListener('animationend', () => {
            COVERS.classList.remove('to-right');
            TRACKNAMES.classList.remove('to-right');
            //присваиваем элементам новые обложки
            for (let i = 0; i < COVERS.children.length; i++) {
                COVERS.children[i].src = musicData[order[i]]['img'];
                TRACKNAMES.children[i].firstElementChild.textContent = musicData[order[i]]['artist'];
                TRACKNAMES.children[i].lastElementChild.textContent = musicData[order[i]]['song'];
            }
        })
    }

    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    audio.addEventListener('ended', nextTrack);

    //ПРОГРЕСС-БАР

    function getTimeFromNum(num) {
        let sec = parseInt(num);
        let min = parseInt(sec / 60);
        sec -= min * 60;
        return `${min}:${String(sec % 60).padStart(2, 0)}`;
    }

    const progress = document.querySelector('.progress');
    const currentTime = document.querySelector('.current-time');
    
    setInterval(() => {
        progress.style.width = audio.currentTime / audio.duration * 100 + '%';
        currentTime.textContent = getTimeFromNum(audio.currentTime);
    }, 100);

    //ДВИГАЕМСЯ ПО ТАЙМЛАЙНУ

    const progressBar = document.querySelector('.progress-bar');
    let isMouseDown = false;
    let progressWidth = window.getComputedStyle(progressBar).width;

    progressBar.addEventListener('mousedown', event => {
        isMouseDown = true;
        let timePoint = event.offsetX / parseInt(progressWidth) * audio.duration;
        audio.currentTime = timePoint;
    });

    progressBar.addEventListener('mousemove', event => {
        if (isMouseDown) {
            event.preventDefault();
            let timePoint = event.offsetX / parseInt(progressWidth) * audio.duration;
            audio.currentTime = timePoint;
        }
    });

    progressBar.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    progressBar.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });


    //НОВОЕ, С ИНПУТОМ

    // const progress = document.querySelector('.progress-bar::-webkit-slider-runnable-track:before');
    // const progressBar = document.querySelector('.progress-bar');
    // const currentTime = document.querySelector('.current-time');
    // setInterval(() => {
    //     updateValue(progressBar.value);

    //     // progress.style.width = audio.currentTime / audio.duration * 100 + '%';
    //     // progressBar.value = audio.currentTime / audio.duration * 100;
    //     currentTime.textContent = getTimeFromNum(audio.currentTime);
    // }, 100);

    // function updateValue(value) {
    //     document.documentElement.style.setProperty('--range-value', value);
    // }

    // updateValue(progressBar.value);

    // const progressBar = document.querySelector('.progress-bar');
        
})()

console.log(`Вёрстка +10:\n
    вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5\n
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n\nКнопка Play/Pause +10:\n
    есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\n
    внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n\n
    При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n
    При смене аудиотрека меняется изображение - обложка аудиотрека +10\n
    Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n
    Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n
    Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10`)