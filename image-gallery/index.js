(() => {
    let url = 'https://api.unsplash.com/search/photos?query=winter&per_page=18&orientation=landscape&client_id=UQu_pjTJlo_eDCQOjJ5Wao9POFiFc66pqG7jYYmXHl8';
    const input = document.querySelector('#search');
    const searchBtn = document.querySelector('#search-btn');

    async function getImages() {
        const res = await fetch(url);
        const images = await res.json();
        console.log(images);
        showImages(images);
    }

    function showImages(data) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        for (let obj of data.results) {
            const img = document.createElement('img');
            img.classList.add("image");
            img.src = obj.urls.regular;
            img.alt = obj.alt_description;
            gallery.append(img);
        }
    }

    getImages();

    function searchNewImages() {
        const value = input.value || 'winter';
        url = 'https://api.unsplash.com/search/photos?query='
                + value
                + '&per_page=18&orientation=landscape&client_id=UQu_pjTJlo_eDCQOjJ5Wao9POFiFc66pqG7jYYmXHl8';
        searchBtn.classList.remove('search');
        searchBtn.classList.add('clear');
        searchBtn.removeEventListener('click', searchNewImages);
        searchBtn.addEventListener('click', clearSearch);
        getImages();
        input.focus();
    }

    function clearSearch() {
        input.value = '';
        toggleBtn();
        input.focus();
    }

    function toggleBtn() {
        searchBtn.classList.remove('clear');
        searchBtn.classList.add('search');
        searchBtn.removeEventListener('click', clearSearch);
        searchBtn.addEventListener('click', searchNewImages);
    }

    input.focus();
    input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            searchNewImages();
        }
    });
    input.addEventListener('input', toggleBtn);
    searchBtn.addEventListener('click', searchNewImages);
})()