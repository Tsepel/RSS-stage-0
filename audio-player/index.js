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
    let currentTrackID = 0;
    let order = [2, 0, 1];
    const audio = new Audio();
    let isPlay = false;

    function playAudio() {
        // audio.src = './audio/journey-don_t_stop_believing.mp3';
        audio.src = musicData[order[1]]['audio'];
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

    function nextTrack() {
        order.push(order.shift());
        currentTrackID = order[1];
        playAudio();
        COVERS.classList.add('to-left');
        TRACKNAMES.classList.add('to-left');
        document.querySelector('.background-image').style.backgroundImage = `url(${musicData[order[1]]['img']})`;
        COVERS.addEventListener('animationend', () => {
            COVERS.classList.remove('to-left');
            TRACKNAMES.classList.remove('to-left');
            //присваиваем элементам новые обложки
            for (let i = 0; i < COVERS.children.length; i++) {
                COVERS.children[i].src = musicData[order[i]]['img'];
                TRACKNAMES.children[i].firstElementChild.innerHTML = musicData[order[i]]['artist'];
                TRACKNAMES.children[i].lastElementChild.innerHTML = musicData[order[i]]['song'];
            }
        })
    }

    function prevTrack() {
        order.unshift(order.pop());
        console.log(order);
        currentTrackID = order[1];
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
                TRACKNAMES.children[i].firstElementChild.innerHTML = musicData[order[i]]['artist'];
                TRACKNAMES.children[i].lastElementChild.innerHTML = musicData[order[i]]['song'];
            }
        })
    }

    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

})()