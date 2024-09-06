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

    //заполняем слайдер рандомными тремя, берём их из petsList
    function showCards() {
        console.log('currentCards' + currentCards);
        let i = 0; //для прохода по карточкам в html
        for (let id of currentCards) {
            document.querySelectorAll('.card')[i].firstElementChild.src = petsList[id]['img'];
            document.querySelectorAll('.card')[i].firstElementChild.nextElementSibling.innerHTML = petsList[id]['petName'];
            i++;
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
        console.log('id set ' + nums);
        //убираем из массива id-шников номера, записанные в currentCards
        if (lastBtn !== 'start') {
            for (let id of currentCards) {
                nums.splice(nums.indexOf(id), 1);
                console.log(id);
                console.log('id set looks now ' + nums);
            }
        }
        //в nums остались те id, из которых будем выбирать, мешаем их
        shuffle(nums);
        //берём первые три
        return nums.splice(0, 3);
    }

    function nextCards() {
        if (lastBtn === 'start' || 'next') {
            memory = [...currentCards];
            console.log('memory lastBtn === "start" || "next" ' + memory);
        } else {
            currentCards = [...memory];
        }
        lastBtn = 'next';
        console.log('LAST BUTTON: ' + lastBtn)
        currentCards = [...getNewRandomCards()];
        showCards();
        console.log('memory ' + memory + '\n');
    }

    function prevCards() {
        if (lastBtn === 'start' || 'prev') {
            memory = [...currentCards];
            console.log('memory lastBtn === "start" || "prev" ' + memory);
        } else {
            currentCards = [...memory];
        }
        lastBtn = 'prev';
        console.log('LAST BUTTON: ' + lastBtn)
        currentCards = [...getNewRandomCards()];
        showCards();
        console.log('memory ' + memory + '\n');
    }

    showCards(); //то, что изначально
    nextBtn.addEventListener('click', nextCards);
    prevBtn.addEventListener('click', prevCards);

})()

console.log(`\n`)