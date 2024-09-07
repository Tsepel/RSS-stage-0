(() => {
    let burgerButton = document.querySelector('.burger-menu');
    let navigation = document.querySelector('.navigation');
    let menuBlackout = document.querySelector('.menu-blackout');
    let menu = document.querySelector('.nav-menu');
    let menuItems = document.querySelectorAll('.nav-menu-item');

    function showMenu() {
        navigation.classList.add('active');
        menu.classList.add('active');
        menuBlackout.classList.add('active');
        burgerButton.classList.add('close-menu-active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navigation.classList.remove('active');
        menu.classList.remove('active');
        menuBlackout.classList.remove('active');
        burgerButton.classList.remove('close-menu-active');
        document.body.style.overflow = 'auto';
    }

    function toggleMenu() {
        if (burgerButton.classList.contains('close-menu-active')) {
            closeMenu();
        } else {
            showMenu();
        }
    }

    burgerButton.addEventListener('click', toggleMenu);
    menuBlackout.addEventListener('click', closeMenu);
    menuItems.forEach(item => item.addEventListener('click', closeMenu));


    const petsList = [
        { id: 0, petName: 'Katrine', img: './assets/img/pets-katrine.png'},
        { id: 1, petName: 'Jennifer', img: './assets/img/pets-jennifer.png'},
        { id: 2, petName: 'Woody', img: './assets/img/pets-woody.png'},
        { id: 3, petName: 'Sophia', img: './assets/img/pets-sophia.png'},
        { id: 4, petName: 'Timmy', img: './assets/img/pets-timmy.png'},
        { id: 5, petName: 'Charly', img: './assets/img/pets-charly.png'},
        { id: 6, petName: 'Scarlett', img: './assets/img/pets-scarlet.png'},
        { id: 7, petName: 'Freddie', img: './assets/img/pets-freddie.png'},
    ]

    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');


    //переменная с id трех предыдущих карточек, изначально равна ничему
    let memory = [];
    //переменная, которая говорит, с какой стороны эти карточки
    let lastBtn = 'start';
    
    let currentCards = getNewRandomCards();
    let nextRandomCards = [];

    function createSliderItem(cardID) {
            console.log("Картинка по айдишнику: " + cardID);
            let item = document.createElement('div');
            document.querySelector('.cards').appendChild(item);
            console.log("Картинка животного: " + petsList[cardID]['img']);
            item.className = 'card';
            if (lastBtn === 'next') {
                item.classList.add('to-right');
            } else if (lastBtn === 'prev') {
                item.classList.add('to-left');
            }
            item.innerHTML = `
                    <img src="" alt="">
                    <h4></h4>
                    <button class="button-secondary">Learn more</button>
            `;
            item.firstElementChild.src = petsList[cardID]['img'];
            item.firstElementChild.alt = petsList[cardID]['petName'] + ' photo';
            item.firstElementChild.nextElementSibling.innerHTML = petsList[cardID]['petName'];
        }

    //функция показа (анимации) карточек
    function showCards() {
        //реализовать три варианта
        switch (lastBtn) {
            case 'start': {
                console.log('showCards, currentCards: ' + currentCards);
                let i = 0; //для прохода по карточкам в html
                for (let id of currentCards) {
                    document.querySelectorAll('.card')[i].firstElementChild.src = petsList[id]['img'];
                    document.querySelectorAll('.card')[i].firstElementChild.nextElementSibling.innerHTML = petsList[id]['petName'];
                    i++;
                }
                break;
            }
            case 'next': {
                console.log('Выполняется функция showCards после кнопки next...');
                console.log(nextRandomCards);
                
                //предыдущий блок уходит влево, старые удаляются
                for (i = 0; i < 3; i++) {
                    document.querySelectorAll('.card')[i].classList.add('to-left');
                    setTimeout(() => { document.querySelector('.to-left').remove() }, 300);
                    createSliderItem(nextRandomCards[i]);
                    // if (document.querySelector('.to-right')) {
                        setTimeout(() => {
                            document.querySelector('.to-right').classList.remove('to-right');
                        }, 300);
                    // }
                }
                break;
            }
            case 'prev': {
                console.log('Выполняется функция showCards после кнопки prev...');
                console.log(nextRandomCards);
                
                //предыдущий блок уходит вправо, старые удаляются
                for (i = 0; i < 3; i++) {
                    document.querySelectorAll('.card')[i].classList.add('to-right');
                    setTimeout(() => { document.querySelector('.to-right').remove() }, 300);
                    createSliderItem(nextRandomCards[i]);
                    console.log()
                    // if (document.querySelector('.to-left')) {
                        setTimeout(() => {
                            document.querySelector('.to-left').classList.remove('to-left');
                        }, 300);
                    // }
                }
                break;
            }
        }
        
    }

    function shuffle(arr) {
        let currentIndex = arr.length;
        while (currentIndex > 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
    }

    //берём рандомно 3 неповторяющиеся из списка
    function getNewRandomCards() {
        //массив id-шников
        let nums = [0,1,2,3,4,5,6,7];
        //убираем из массива id-шников номера, записанные в currentCards
        if (lastBtn !== 'start') {
            for (let id of currentCards) {
                nums.splice(nums.indexOf(id), 1);
            }
        }
        //в nums остались те id, из которых будем выбирать, мешаем их
        shuffle(nums);
        console.log('getNewRandom, random set: ' + nums);
        //берём первые три
        return nums.splice(0, 3);
    }

    function nextCards() {
        if (lastBtn === 'start' || lastBtn === 'next') {
            memory = [...currentCards];
            lastBtn = 'next';
            nextRandomCards = [...getNewRandomCards()];
            console.log('ща запустим showCards');
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
        } else {
            let temp = [...currentCards];
            nextRandomCards = [...memory];
            lastBtn = 'next';
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
            memory = [...temp];
            console.log('currentCards look like this: ' + currentCards);
        }
        console.log('nextCards, LAST BUTTON: ' + lastBtn)
        console.log('memory ' + memory + '\n');
    }

    function prevCards() {
        if (lastBtn === 'start' || lastBtn === 'prev') {
            memory = [...currentCards];
            lastBtn = 'prev';
            nextRandomCards = [...getNewRandomCards()];
            console.log('ща запустим showCards');
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
        } else {
            let temp = [...currentCards];
            nextRandomCards = [...memory];
            lastBtn = 'prev';
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
            memory = [...temp];
            console.log('currentCards look like this: ' + currentCards);
        }
        console.log('prevCards, LAST BUTTON: ' + lastBtn)
        console.log('memory ' + memory + '\n');
    }

    showCards(); //то, что изначально
    nextBtn.addEventListener('click', nextCards);
    prevBtn.addEventListener('click', prevCards);

})()

console.log(`\n`)