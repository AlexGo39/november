import Swiper from "swiper";
import {EffectCoverflow, Navigation, Thumbs} from "swiper/modules";

class Slider {
    slider;
    prevBtn;
    nextBtn;
    type;
    slidesView;

    constructor(el: Element) {
        this.slider = el;
        this.type = this.slider.getAttribute('data-slider');
        this.prevBtn = this.slider.querySelector('.swiper-button-prev');
        this.nextBtn = this.slider.querySelector('.swiper-button-next');
        this.slidesView = this.slider.getAttribute('data-slides-view')
        this.init()
    }

    init = () => {
        switch (this.type) {
            case 'default':
                this.initDefaultSlider()
                break;
            case 'single':
                this.initSingleSlider()
                break;
            case 'coverflow':
                this.initCoverflowSlider()
                break;
            case 'thumbs':
                this.initThumbsSlider()
                break;
        }
    }

    initDefaultSlider = (): void => {
        const swiper = this.slider.querySelector('.swiper');

        new Swiper(swiper, {
            modules: [Navigation],
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                prevEl: this.prevBtn ? this.prevBtn : null,
                nextEl: this.nextBtn ? this.nextBtn : null,
                disabledClass: 'swiper-button-disabled',
            },
            breakpoints: {
                1200: {
                    slidesPerView: this.slidesView ? this.slidesView : 3,
                    spaceBetween: 20,
                }
            }
        })
    }

    initSingleSlider = (): void => {
        const swiper = this.slider.querySelector('.swiper');
        new Swiper(swiper, {
            modules: [Navigation],
            slidesPerView: this.slidesView ? this.slidesView : 1,
            spaceBetween: 30,
            allowTouchMove: false,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.prevBtn ? this.prevBtn : null,
                nextEl: this.nextBtn ? this.nextBtn : null,
                disabledClass: 'swiper-button-disabled',
            },
        })
    }

    initCoverflowSlider = () => {
        const swiper = this.slider.querySelector('.swiper');
        new Swiper(swiper, {
            modules: [Navigation, EffectCoverflow],
            slidesPerView: this.slidesView ? this.slidesView : 1,
            spaceBetween: 30,
            watchSlidesProgress: true,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                prevEl: this.prevBtn ? this.prevBtn : null,
                nextEl: this.nextBtn ? this.nextBtn : null,
                disabledClass: 'swiper-button-disabled',
            },
            breakpoints: {
                1200: {
                    coverflowEffect: {
                        rotate: 0,
                        stretch: -170,
                        depth: 300,
                        modifier: 1,
                        slideShadows: false,
                    },
                    initialSlide: 1,
                    centeredSlides: true,
                }
            }
        })
    }

    initThumbsSlider = () => {
        const mainSlider = this.slider.querySelector('.swiper');
        const thumbSlider = this.slider.querySelector('.swiper--thumb');

        const thumb = new Swiper(thumbSlider, {
            slidesPerView: 3,
            spaceBetween: 20,
        })

        new Swiper(mainSlider, {
            modules: [Thumbs],
            slidesPerView: 1,
            spaceBetween: 20,
            thumbs: {
                swiper: thumb
            }
        })
    }
}

export default Slider