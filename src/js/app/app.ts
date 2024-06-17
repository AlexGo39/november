import Slider from "./slider";
import Compare from "./compare";
import FancyboxCustom from "./fancybox";
import Timeline from "./timeline";
import CustomMap from "./map";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        console.log('App Inited');
        this.initSlider()
        this.initCompare()
        this.initFancybox()
        this.initTimeline()
        this.initMap()
    }

    initSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]');
        if (!sliders) return

        sliders.forEach((slider) => {
            new Slider(slider)
        })
    }

    initCompare = () => {
        const compare = document.querySelectorAll('[data-compare]') as NodeListOf<HTMLElement>;

        if (!compare) return;
        compare.forEach((el) => {
            new Compare(el)
        })
    }

    initFancybox = () => {
        new FancyboxCustom('[data-fancybox]')
    }

    initTimeline = () => {
        new Timeline()
    }

    initMap = () => {
        const map = document.getElementById('map') as HTMLCanvasElement;
        if (!map) return
        new CustomMap(map)
    }
}

export {App};

