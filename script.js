const modal = new GraphModal("first");

const buttonRu = document.getElementById("ru")
const buttonEn = document.getElementById("en")

buttonRu.onclick = () => changeLanguage("ru")
buttonEn.onclick = () => changeLanguage("en")




const currentLang = localStorage.getItem("lang") || window.navigator.language.slice(0, 2) || "en";
console.log(currentLang);

async function changeLanguage(lang) {
    localStorage.setItem("lang", lang)
    const langElems = document.querySelectorAll("[data-lang]")
    const data = await ((await fetch("./lang.json")).json())
    console.log(data);

    langElems.forEach((el) => {
        const [key, value] = el.getAttribute("data-lang").split("-")
        el.textContent = data[key][value][lang]
        // console.log([key, value]);

        console.log(data[key][value][lang]);

    })

}
changeLanguage(currentLang)


const fullBurger = new Fullburger('.fullburger', {
    fixed: {
        defaultValue: true
    }
});

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        480: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },

    }

});