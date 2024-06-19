class MobileMenu {
    el;
    burger;

    constructor(el: HTMLElement) {
        this.el = el;
        this.burger = document.querySelector('[data-burger]');

        this.init()
    }

    init() {
        this.burger.addEventListener('click', this.open)
    }

    open = () => {
        this.el.classList.toggle('active')
        document.body.style.overflow = document.body.style.overflow !== 'hidden' ? 'hidden' : null
    }
}
export default MobileMenu