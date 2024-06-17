class Timeline {
    headerElements: NodeListOf<HTMLElement>;
    bodyElements: NodeListOf<HTMLElement>;
    currentElement: number;
    buttons: NodeListOf<HTMLElement>;
    select: HTMLSelectElement;

    constructor() {
        this.headerElements = document.querySelectorAll('[data-timeline-head]')
        this.select = document.querySelector('[data-timeline-select]')
        this.bodyElements = document.querySelectorAll('[data-timeline-element]')
        this.currentElement = 0;
        this.buttons = document.querySelectorAll('[data-timeline-btn]')
        this.init()
    }

    init() {
        if (!this.headerElements || !this.bodyElements || !this.select) return
        this.initTabs()
        this.initButtons()
    }

    initTabs = () => {
        this.headerElements.forEach((head, idx) => {
            head.addEventListener('click', () => {
                this.currentElement = idx
                this.update()
            })
        })

        this.select.addEventListener('change', () => {
            this.currentElement = this.select.selectedIndex;
            console.log(this.currentElement)
            this.update()
        })
    }

    initButtons = () => {
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                if (button.getAttribute('data-timeline-btn') === 'next') {
                    if (this.currentElement < this.headerElements.length - 1) {
                        this.currentElement += 1;
                    }
                } else {
                    if (this.currentElement > 0) {
                        this.currentElement -= 1;
                    }
                }
                this.update()
            })
        })
    }

    update = () => {
        this.removeActive(this.headerElements)
        this.removeActive(this.bodyElements)
        this.headerElements.item(this.currentElement).classList.add('active')
        this.bodyElements.item(this.currentElement).classList.add('active')

        if (this.currentElement >= this.headerElements.length - 1) {
            this.buttons[1].classList.add('timeline__button--disabled')
        } else if (this.currentElement <= 0) {
            this.buttons[0].classList.add('timeline__button--disabled')
        } else {
            this.buttons.forEach(temp => temp.classList.remove('timeline__button--disabled'))
        }
    }

    removeActive = (elements: NodeListOf<HTMLElement>) => {
        elements.forEach(temp => temp.classList.remove('active'))
    }
}

export default Timeline