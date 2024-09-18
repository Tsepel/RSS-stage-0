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
            'img': './img/Muse.jpg',
        },
        {
            'id': 2,
            'artist': 'Marvin Gaye',
            'song': "Ain't no mountain high enough",
            'audio': './audio/marvin_gaye_-_ain_t_no_mountain_high_enough.mp3',
            'img': './img/Marvin_Gaye.jpg',
        }
    ]
    const playBtn = document.querySelector('.toggle-button');
    const playSvg = document.querySelector('.play-svg');
    const pauseSvg = document.querySelector('.pause-svg');
    const audio = new Audio();
    let isPlay = false;

    function playAudio() {
        audio.src = './audio/journey-don_t_stop_believing.mp3';
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

})()