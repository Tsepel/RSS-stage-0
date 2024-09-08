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
        { id: 6, petName: 'Scarlett', img: './assets/img/pets-scarlett.png'},
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
        let item = document.createElement('div');
        document.querySelector('.cards').appendChild(item);
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
        item.addEventListener('click', showModalWindow);
    }

    //функция показа (анимации) карточек
    function showCards() {
        //реализовать три варианта
        switch (lastBtn) {
            case 'start': {
                let i = 0; //для прохода по карточкам в html
                for (let id of currentCards) {
                    document.querySelectorAll('.card')[i].firstElementChild.src = petsList[id]['img'];
                    document.querySelectorAll('.card')[i].firstElementChild.nextElementSibling.innerHTML = petsList[id]['petName'];
                    i++;
                }
                break;
            }
            case 'next': {
                
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
                
                //предыдущий блок уходит вправо, старые удаляются
                for (i = 0; i < 3; i++) {
                    document.querySelectorAll('.card')[i].classList.add('to-right');
                    setTimeout(() => { document.querySelector('.to-right').remove() }, 300);
                    createSliderItem(nextRandomCards[i]);
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
        //берём первые три
        return nums.splice(0, 3);
    }

    function nextCards() {
        if (lastBtn === 'start' || lastBtn === 'next') {
            memory = [...currentCards];
            lastBtn = 'next';
            nextRandomCards = [...getNewRandomCards()];
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
        } else {
            let temp = [...currentCards];
            nextRandomCards = [...memory];
            lastBtn = 'next';
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
            memory = [...temp];
        }
    }

    function prevCards() {
        if (lastBtn === 'start' || lastBtn === 'prev') {
            memory = [...currentCards];
            lastBtn = 'prev';
            nextRandomCards = [...getNewRandomCards()];
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
        } else {
            let temp = [...currentCards];
            nextRandomCards = [...memory];
            lastBtn = 'prev';
            showCards();
            currentCards = [...nextRandomCards]; //запихнем это в функцию показа!!!
            memory = [...temp];
        }
    }
    
    showCards(); //то, что изначально
    nextBtn.addEventListener('click', nextCards);
    prevBtn.addEventListener('click', prevCards);
    
    //ПОП-АПЫ
    
    // let petsData = fetch()
    let petsData = [
        {
            "name": "Katrine",
            "img": "./assets/img/pets-katrine.png",
            "type": "Cat",
            "breed": "British Shorthair",
            "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
          "age": "6 months",
          "inoculations": ["panleukopenia"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
            "name": "Jennifer",
            "img": "./assets/img/pets-jennifer.png",
            "type": "Dog",
            "breed": "Labrador",
            "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
            "age": "2 months",
            "inoculations": ["none"],
            "diseases": ["none"],
            "parasites": ["none"]
        },
        {
          "name": "Woody",
          "img": "./assets/img/pets-woody.png",
          "type": "Dog",
          "breed": "Golden Retriever",
          "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
          "age": "3 years 6 months",
          "inoculations": ["adenovirus", "distemper"],
          "diseases": ["right back leg mobility reduced"],
          "parasites": ["none"]
        },
        {
          "name": "Sophia",
          "img": "./assets/img/pets-sophia.png",
          "type": "Dog",
          "breed": "Shih tzu",
          "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
          "age": "1 month",
          "inoculations": ["parvovirus"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Timmy",
          "img": "./assets/img/pets-timmy.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
          "age": "2 years 3 months",
          "inoculations": ["calicivirus", "viral rhinotracheitis"],
          "diseases": ["kidney stones"],
          "parasites": ["none"]
        },
        {
          "name": "Charly",
          "img": "./assets/img/pets-charly.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
          "age": "8 years",
          "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
          "diseases": ["deafness", "blindness"],
          "parasites": ["lice", "fleas"]
        },
        {
          "name": "Scarlett",
          "img": "./assets/img/pets-scarlett.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
          "age": "3 months",
          "inoculations": ["parainfluenza"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Freddie",
          "img": "./assets/img/pets-freddie.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
          "age": "2 months",
          "inoculations": ["rabies"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
      ]
      

    let popupBlackout = document.querySelector('.popup-blackout');

    //стартовые значения
    for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
        document.querySelectorAll('.card')[i].addEventListener('click', showModalWindow);
    }

    function showModalWindow() {
        document.querySelector('.modal-window').classList.remove('invisible');
        popupBlackout.classList.add('active');
        document.body.style.overflow = 'hidden';
        const petName = this.firstElementChild.nextElementSibling.textContent;
        petObj = petsData.find(item => item['name'] === petName);

        const modalContent = document.querySelector('.modal-window-content');

        modalContent.previousElementSibling.src = petObj['img'];
        modalContent.previousElementSibling.alt = petObj['img'] + ' photo';
        modalContent.firstElementChild.firstElementChild.textContent = petName;
        modalContent.firstElementChild.lastElementChild.textContent = petObj['type'] + ' - ' + petObj['breed'];
        modalContent.children[1].textContent = petObj['description'];
        modalContent.children[2].firstElementChild.innerHTML = '<b>Age:</b> ' + petObj['age'];
        modalContent.children[2].children[1].innerHTML = '<b>Inoculations:</b> ' + petObj['inoculations'];
        modalContent.children[2].children[2].innerHTML = '<b>Diseases:</b> ' + petObj['diseases'];
        modalContent.children[2].lastElementChild.innerHTML = '<b>Parasites:</b> ' + petObj['parasites'];

        let cross = document.querySelector('.cross');
        cross.addEventListener('click', closeModalWindow);
    }

    function closeModalWindow() {
        document.querySelector('.modal-window').classList.add('invisible');
        popupBlackout.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    popupBlackout.addEventListener('click', closeModalWindow);

})()

console.log(`1) Реализация burger menu на обеих страницах: +26\n
    2) Реализация слайдера-карусели на странице Main: +36\n
    3) Реализация пагинации на странице Pets: +36\n
    4) Реализация попап на обеих страницах: +12\n
    Итого 110/110`)