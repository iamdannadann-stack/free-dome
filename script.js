const favoriteButton = document.querySelector(".favorite-button");

function toggleFavorite() {

       favoriteButton.classList.toggle("active");

       if( favoriteButton.classList.contains("active")) {
           favoriteButton.textContent = "♥";
     } else {
           favoriteButton.textContent = "♡"
     }
}
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

if (menuButton && menu && overlay) {

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("active");
        overlay.classList.toggle("active");

        if (menu.classList.contains("active")) {
            menuButton.textContent = "×";
        } else {
            menuButton.textContent = "☰";
        }

    });


    overlay.addEventListener("click", () => {

        menu.classList.remove("active");
        overlay.classList.remove("active");

        menuButton.textContent = "☰";

    });

}

const heroImage = document.querySelector("#hero-image");
const heroImageNext = document.querySelector("#hero-image-next");
const heroDots = document.querySelectorAll(".hero-dot");

const heroImages = [
    "images/hero-1.jpg",
    "images/hero-2.jpg",
    "images/hero-3.jpg"
];

let heroIndex = 0;


function showHeroSlide(index) {

    heroImageNext.src = heroImages[index];

    heroImageNext.style.opacity = "1";


    heroDots.forEach((dot) => {
        dot.classList.remove("active");
    });

    heroDots[index].classList.add("active");


    setTimeout(() => {

        heroImage.src = heroImages[index];

        heroImageNext.style.opacity = "0";

        heroIndex = index;

    }, 800);

}
setInterval(() => {

    let nextIndex = heroIndex + 1;

    if (nextIndex >= heroImages.length) {
        nextIndex = 0;
    }

    showHeroSlide(nextIndex);
    

}, 4000);


heroDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showHeroSlide(index);

    });

});
const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {

    const imageContainer = card.querySelector(".product-image");
    const image = card.querySelector(".product-image-main");
    const images = JSON.parse(card.dataset.images);

    let currentIndex = 0;
    let productTimer = null;
    let transitionTimer = null;
    let isHovered = false;


    // Вторая картинка для плавного перехода
    const nextImage = document.createElement("img");

    nextImage.classList.add("product-image-next");
    nextImage.src = images[0];

    imageContainer.appendChild(nextImage);


    function showNextImage() {

        if (!isHovered) return;

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        nextImage.src = images[currentIndex];
        nextImage.style.opacity = "1";


        transitionTimer = setTimeout(() => {

            if (!isHovered) return;

            image.src = images[currentIndex];
            nextImage.style.opacity = "0";

        }, 600);

    }


    card.addEventListener("mouseenter", () => {

        isHovered = true;

        // Сразу показываем вторую фотографию
        currentIndex = 1;

        nextImage.src = images[currentIndex];
        nextImage.style.opacity = "1";


        transitionTimer = setTimeout(() => {

            if (!isHovered) return;

            image.src = images[currentIndex];
            nextImage.style.opacity = "0";


            // Теперь начинаем обычное перелистывание
            productTimer = setInterval(showNextImage, 1000);

        }, 600);

    });


    card.addEventListener("mouseleave", () => {

        isHovered = false;

        clearInterval(productTimer);
        clearTimeout(transitionTimer);

        productTimer = null;
        transitionTimer = null;

        currentIndex = 0;

        nextImage.style.opacity = "0";
        image.src = images[0];

    });

});
const productPageImage = document.querySelector("#product-page-main-image");
const productPrev = document.querySelector("#product-prev");
const productNext = document.querySelector("#product-next");

if (productPageImage && productPrev && productNext) {

    const productPageImages = [
        "images/product-1.jpg",
        "images/product-1-2.jpg",
        "images/product-1-3.jpg",
        "images/product-1-4.jpg",
        "images/product-1-5.jpg"
    ];

    let productPageIndex = 0;


    productNext.addEventListener("click", function () {

        productPageIndex = productPageIndex + 1;

        if (productPageIndex >= productPageImages.length) {
            productPageIndex = 0;
        }

        productPageImage.src = productPageImages[productPageIndex];

    });


    productPrev.addEventListener("click", function () {

        productPageIndex = productPageIndex - 1;

        if (productPageIndex < 0) {
            productPageIndex = productPageImages.length - 1;
        }

        productPageImage.src = productPageImages[productPageIndex];

    });

}
const buyButton = document.getElementById("buy-button");
const orderModal = document.getElementById("order-modal");
const orderModalClose = document.getElementById("order-modal-close");

buyButton.addEventListener("click", function () {
    orderModal.classList.add("active");
});

orderModalClose.addEventListener("click", function () {
    orderModal.classList.remove("active");
});

orderModal.addEventListener("click", function (event) {
    if (event.target === orderModal) {
        orderModal.classList.remove("active");
    }
});
const directOrderButton = document.getElementById("direct-order-button");
const directOrderStep = document.getElementById("direct-order-step");

directOrderButton.addEventListener("click", function () {
    directOrderStep.classList.add("active");
});
const cdekButton = document.getElementById("cdek-button");
const cdekModal = document.getElementById("cdek-modal");
const cdekModalClose = document.getElementById("cdek-modal-close");

cdekButton.addEventListener("click", function () {

    orderModal.classList.remove("active");

    setTimeout(function () {
        cdekModal.classList.add("active");
    }, 150);

});

cdekModalClose.addEventListener("click", function () {
    cdekModal.classList.remove("active");
});
cdekModal.addEventListener("click", function (event) {
    if (event.target === cdekModal) {
        cdekModal.classList.remove("active");
    }
});
const cdekSubmit = document.getElementById("cdek-submit");

cdekSubmit.addEventListener("click", async function () {

    const name = document.getElementById("cdek-name").value.trim();
    const telegram = document.getElementById("cdek-telegram").value.trim();
    const city = document.getElementById("cdek-city").value.trim();
    const point = document.getElementById("cdek-point").value.trim();
    const quantity = document.getElementById("cdek-quantity").value;

    if (!name || !telegram || !city || !point) {
        alert("пожалуйста, заполни все поля");
        return;
    }

    cdekSubmit.disabled = true;
    cdekSubmit.textContent = "SENDING...";

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbypqXUjuWugZrUJ1yRaPP60h1RN7eMkJC1ypg2a5uQIn3sgc2sNAV5KFhenzbBYBkEX/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    product: "the truth untold",
                    name: name,
                    telegram: telegram,
                    city: city,
                    point: point,
                    quantity: quantity
                })
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка отправки");
        }

        cdekSubmit.textContent = "ORDER SENT ✓";

        setTimeout(function () {
            cdekModal.classList.remove("active");
        }, 1200);

    } catch (error) {

        console.error(error);

        cdekSubmit.disabled = false;
        cdekSubmit.textContent = "SEND ORDER";

        alert("не удалось отправить заказ. попробуй ещё раз");

    }

});