import RouterHandler from "./router.js";

window.onhashchange = () => setActiveLink()

function setActiveLink() {
    const links = document.querySelectorAll('.header__link')
    links.forEach(link => {
        const linkPath = link.getAttribute('href')
        const currentPath = window.location.hash
        console.log(currentPath)
        if (linkPath === currentPath) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    })
}

class App {
    constructor() {
        new RouterHandler()
    }
}

new App()