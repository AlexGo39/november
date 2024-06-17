type clipImagesType = MouseEvent | TouchEvent;

class Compare {
    compare;
    pictures;
    dragger;
    matchMedia;

    constructor(el: Element) {
        this.compare = el;
        this.pictures = this.compare.querySelectorAll('[data-compare-picture]') as NodeListOf<HTMLElement>
        this.dragger = this.compare.querySelector('[data-compare-dragger]') as HTMLElement
        this.matchMedia = matchMedia('(max-width: 1200px)')
        this.init()
    }

    init = () => {
        this.initDragger()
        this.clipImages()
    }

    clipImages = (evt?: clipImagesType) => {
        const containerRect = this.compare.getBoundingClientRect();
        if (evt) {
            let newWidth = 0;
            if ("clientX" in evt) {
                newWidth = evt?.clientX - containerRect.left
            }
            if ("touches" in evt) {
                newWidth = evt.touches[0].clientX - containerRect.left
            }

            if (newWidth > 0) {
                this.pictures[0].style.width = newWidth + 'px';
            }
        } else {
            this.pictures[0].style.width = '50%';
        }
    }

    initDragger = () => {
        let isToggle = false;

        if (!this.matchMedia.matches) {
            this.compare.addEventListener('mousedown', () => {
                isToggle = true;
            })

            this.compare.addEventListener('mouseup', () => {
                isToggle = false;
            })

            this.compare.addEventListener('mousemove', (evt: MouseEvent) => {
                const containerRect = this.compare.getBoundingClientRect();
                const newWidth = evt.clientX - containerRect.left;
                if (isToggle) {
                    this.dragger.style.left = `${newWidth}px`;
                    this.clipImages(evt)
                }
            })
        } else {
            this.compare.addEventListener('touchstart', () => {
                isToggle = true;
            })

            this.compare.addEventListener('touchend', () => {
                isToggle = false;
            })

            this.compare.addEventListener('touchmove', (evt: TouchEvent) => {
                const containerRect = this.compare.getBoundingClientRect();
                const newWidth = evt.touches[0].clientX - containerRect.left;
                if (isToggle) {
                    this.dragger.style.left = `${newWidth}px`;
                    this.clipImages(evt)
                }
            })
        }
    }
}

export default Compare;