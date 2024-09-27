(() => {
    const url = 'https://api.unsplash.com/search/photos?query=winter&per_page=18&orientation=landscape&client_id=UQu_pjTJlo_eDCQOjJ5Wao9POFiFc66pqG7jYYmXHl8';

    async function getImages() {
        const res = await fetch(url);
        const images = await res.json();
        console.log(images);
        showImages(images);
    }

    function showImages(data) {
        let gallery = document.querySelector('.gallery');
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
})()