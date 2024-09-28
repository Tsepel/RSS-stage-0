(() => {
    let url = 'https://api.unsplash.com/search/photos?query=winter&per_page=18&orientation=landscape&client_id=UQu_pjTJlo_eDCQOjJ5Wao9POFiFc66pqG7jYYmXHl8';
    const input = document.querySelector('#search');
    const searchBtn = document.querySelector('#search-btn');
    let searchFlag = false;

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
        const value = input.value || 'photos';
        url = 'https://api.unsplash.com/search/photos?query='
                + value
                + '&per_page=18&orientation=landscape&client_id=UQu_pjTJlo_eDCQOjJ5Wao9POFiFc66pqG7jYYmXHl8';
        console.log(url);
        getImages();
    }

    input.addEventListener('change', searchNewImages);
    searchBtn.addEventListener('click', searchNewImages);
})()