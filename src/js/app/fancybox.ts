import {Fancybox} from "@fancyapps/ui";

class FancyboxCustom {
    el;

    constructor(el: string) {
        this.el = el;

        this.init()
    }

    init() {
        Fancybox.bind(this.el, {
            defaultType: 'inline',
        })
        const modalClose = document.querySelectorAll('[data-modal-close]')
        if (!modalClose) return
        modalClose.forEach(el => {
            el.addEventListener('click', () => {
                Fancybox.close()
            })
        })
    }
}

export default FancyboxCustom