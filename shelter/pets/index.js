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


    //ПАГИНАЦИЯ

    function shuffle(arr) {
        let currentIndex = arr.length;
        while (currentIndex > 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
    }

    const petsList = [
        { id: 0, petName: 'Katrine', img: '../assets/img/pets-katrine.png'},
        { id: 1, petName: 'Jennifer', img: '../assets/img/pets-jennifer.png'},
        { id: 2, petName: 'Woody', img: '../assets/img/pets-woody.png'},
        { id: 3, petName: 'Sophia', img: '../assets/img/pets-sophia.png'},
        { id: 4, petName: 'Timmy', img: '../assets/img/pets-timmy.png'},
        { id: 5, petName: 'Charly', img: '../assets/img/pets-charly.png'},
        { id: 6, petName: 'Scarlett', img: '../assets/img/pets-scarlet.png'},
        { id: 7, petName: 'Freddie', img: '../assets/img/pets-freddie.png'},
    ]

    function notUniqueBlocks(arr) {
        let nums = [0,1,2,3,4,5,6,7];
        //проверяем каждые 6
        for (let i = 1; i < Math.ceil(arr.length / 6); i++) {
            console.log('Сейчас будем проверять массив по итерациям шестёрок до ' + Math.ceil(arr.length / 6));
            let block = arr.slice(i * 6, i * 6 + 6);
            let uniqueBlock = new Set(block);
            if (block.length === 6 && block.length !== uniqueBlock.size) {
                return Math.ceil(i * 3 / 4); //то же, что i*6/8 - возвращаем индекс соответствующей восьмерки (не используем, это ПРОСТО)
            }
        }
        return false;
    }
    
    function createPaginationArray() {
        let nums = [0,1,2,3,4,5,6,7];
        let paginIDs = [];
        for (let i = 0; i < 6; i++) {
            shuffle(nums);
            console.log('Добавляем к массиву айдишников ' + nums);
            paginIDs = [...paginIDs, ...nums];
            console.log('Теперь наш массив: ' + paginIDs);
            while (notUniqueBlocks(paginIDs)) {
                console.log('Не подошла последняя восьмёрка, мешаем ещё раз');
                paginIDs.length = paginIDs.length - 8;
                shuffle(nums);
                paginIDs = [...paginIDs, ...nums];
                console.log('теперь наш массив: ' + paginIDs);
            }
            console.log('Помешали, теперь наш массив: ' + paginIDs);
        }
        console.log('Now this is unique: ' + paginIDs);
        let res = [];
        for (let id of paginIDs) {
            res.push(petsList[id]);
        }
        return res;
    }
    
    //48 объектов в массиве
    const paginationArr = createPaginationArray();
    console.log('Third pet in array: ' + paginationArr[2]['petName']);

    

    let nextBtn = document.querySelector('.next');
    let superNextBtn = document.querySelector('.super-next');
    let pageNumberDisplay = document.querySelector('.page-number');
    let prevBtn = document.querySelector('.prev');
    let superPrevBtn = document.querySelector('.super-prev');

    let offset = 0; //номер среза массива
    let cardsPerPage = document.querySelectorAll('.card').length;

    function showPage() {
        console.log('Cards per Page = ' + cardsPerPage);
        //цикл, присваивающий каждой карточке в html значения
        cardsPerPage = document.querySelectorAll('.card').length;
        for (let i = 0; i < cardsPerPage; i++) {
            document.querySelectorAll('.card')[i].firstElementChild.src = paginationArr[i + offset * cardsPerPage]['img'];
            document.querySelectorAll('.card')[i].firstElementChild.alt = paginationArr[i + offset * cardsPerPage]['petName'] + ' photo';
            document.querySelectorAll('.card')[i].firstElementChild.nextElementSibling.innerHTML = paginationArr[i + offset * cardsPerPage]['petName'];
            console.log('i + offset * cardsPerPage = ' + (i + offset * cardsPerPage));
        }
    }

    function showNextPage() {
        pageNumberDisplay.textContent++;
        offset++;
        showPage();
        if (offset > 0) {
            prevBtn.disabled = false;
            superPrevBtn.disabled = false;
        }
        if (offset >= paginationArr.length / cardsPerPage - 1) {
            nextBtn.disabled = true;
            superNextBtn.disabled = true;
        }
        console.log('Here should be page number ' + (Number(pageNumberDisplay.textContent)));
        console.log('Length of array = ' + paginationArr.length);
    }

    function showPrevPage() {
        pageNumberDisplay.textContent--;
        offset--;
        showPage();
        if (offset < paginationArr.length / cardsPerPage) {
            nextBtn.disabled = false;
            superNextBtn.disabled = false;
        }
        if (offset <= 0) {
            prevBtn.disabled = true;
            superPrevBtn.disabled = true;
        }
        console.log('Here should be page number ' + (Number(pageNumberDisplay.textContent)));
    }

    function showLastPage() {
        pageNumberDisplay.textContent = paginationArr.length / cardsPerPage;
        offset = pageNumberDisplay.textContent - 1;
        showPage();
        prevBtn.disabled = false;
        superPrevBtn.disabled = false;
        nextBtn.disabled = true;
        superNextBtn.disabled = true;
    }

    function showFirstPage() {
        pageNumberDisplay.textContent = 1;
        offset = 0;
        showPage();
        prevBtn.disabled = true;
        superPrevBtn.disabled = true;
        nextBtn.disabled = false;
        superNextBtn.disabled = false;
    }

    //преобразуем номер страницы в соответствии с новым размером окна
    function checkScreenSize() {
        if (window.innerWidth >= 1280) { //8 карточек на странице
            if (cardsPerPage === 6) {
                offset = Math.floor(offset * 6 / 8);
                pageNumberDisplay.textContent = offset + 1;
                for (let i = 0; i < 2; i++) {
                    let item = document.createElement('div');
                    item.className = 'card';
                    document.querySelector('.cards').appendChild(item);
                    item.innerHTML = `
                    <img src="" alt="">
                    <h4></h4>
                    <button class="button-secondary">Learn more</button>
                    `;
                }
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            } else if (cardsPerPage === 3) {
                offset = Math.floor(offset * 3 / 8);
                pageNumberDisplay.textContent = offset + 1;
                for (let i = 0; i < 5; i++) {
                    let item = document.createElement('div');
                    item.className = 'card';
                    document.querySelector('.cards').appendChild(item);
                    item.innerHTML = `
                    <img src="" alt="">
                    <h4></h4>
                    <button class="button-secondary">Learn more</button>
                    `;
                }
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            }
        } else if (window.innerWidth < 1280 && window.innerWidth > 640) { //6 карточек на странице
            if (cardsPerPage === 8) {
                offset = Math.floor(offset * 8 / 6);
                pageNumberDisplay.textContent = offset + 1;
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            } else if (cardsPerPage === 3) {
                offset = Math.floor(offset / 2);
                pageNumberDisplay.textContent = offset + 1;
                for (let i = 0; i < 3; i++) {
                    let item = document.createElement('div');
                    item.className = 'card';
                    document.querySelector('.cards').appendChild(item);
                    item.innerHTML = `
                    <img src="" alt="">
                    <h4></h4>
                    <button class="button-secondary">Learn more</button>
                    `;
                }
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            }
        } else if (window.innerWidth <= 640) { //3 карточки на странице
            if (cardsPerPage === 6) {
                offset = Math.floor(offset * 2);
                pageNumberDisplay.textContent = offset + 1;
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            } else if (cardsPerPage === 8) {
                offset = Math.floor(offset * 8 / 3);
                pageNumberDisplay.textContent = offset + 1;
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                document.querySelector('.card').remove();
                showPage(); //тут нужно добавить изменеие атрибутов кнопок (disabled)
            }
        }
        cardsPerPage = document.querySelectorAll('.card').length;
        if (offset > 0) {
            prevBtn.disabled = false;
            superPrevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
            superPrevBtn.disabled = true;
        }
        if (offset >= paginationArr.length / cardsPerPage - 1) {
            nextBtn.disabled = true;
            superNextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
            superNextBtn.disabled = false;
        }
    }

    showPage(); //старт
    window.addEventListener('resize', checkScreenSize);

    nextBtn.addEventListener('click', showNextPage);
    prevBtn.addEventListener('click', showPrevPage);
    superNextBtn.addEventListener('click', showLastPage);
    superPrevBtn.addEventListener('click', showFirstPage);

})()

console.log(`Я молодец`);