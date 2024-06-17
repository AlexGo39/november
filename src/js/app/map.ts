import Konva from "konva";
import {Layer} from "konva/lib/Layer";
import {Stage} from "konva/lib/Stage";
import {mapData} from "../mapData/mapData";

// @ts-ignore
import mapImage from "../../main/shared/images/map.svg"
import {Fancybox} from "@fancyapps/ui";

interface ImageParams {
    x: number,
    y: number,
    image: string,
    width: number,
    height: number,
    src?: string,
}

class CustomMap {
    canvas;
    stage: Stage;
    canvasWidth;
    canvasHeight;
    layer: Layer;
    scale;
    mapParams: ImageParams;
    pinParams: ImageParams;

    constructor(el: HTMLCanvasElement) {
        this.canvas = el;
        this.canvasWidth = 1920;
        this.canvasHeight = 1417;
        this.scale = 1.3;
        this.mapParams = {
            x: -10,
            y: -10,
            width: this.canvasWidth * this.scale,
            height: this.canvasHeight * this.scale,
            image: mapImage
        }

        this.init()
    }

    init() {
        this.createCanvas()
        this.createMap()
        this.generatePins(mapData)
    }

    // Создаём полотно Canvas
    createCanvas = () => {
        this.stage = new Konva.Stage({
            container: 'map',
            width: this.canvasWidth,
            height: this.canvasHeight
        })

        this.layer = new Konva.Layer({
            draggable: true,
            dragBoundFunc: (pos) => {
                let newX = pos.x;
                let newY = pos.y;

                // Определяем область для перемещения
                const minX = -(this.mapParams.width - window.innerWidth);
                const minY = -(this.mapParams.height - window.innerHeight) + 30;
                const maxX = -10;
                const maxY = -10;

                // Ограничиваем перемещение элемента
                newX = Math.min(Math.max(newX, minX), maxX);
                newY = Math.min(Math.max(newY, minY), maxY);

                if (newY === -(this.mapParams.height - window.innerHeight) + 30) {
                    this.layer.attrs.draggable = false;
                }

                return {
                    x: newX,
                    y: newY
                };
            }
        })

        this.stage.add(this.layer);
    }

    // Генерация карты на слой
    createMap = () => {
        const map = new Image();
        map.src = this.mapParams.image
        map.onload = () => {
            const layerMap = new Konva.Image({
                x: this.mapParams.x,
                y: this.mapParams.y,
                image: map,
                width: this.mapParams.width,
                height: this.mapParams.height,
            });

            this.layer.add(layerMap)
            this.layer.draw()
        }
    }

    // Итерируемся по объекту mapData и вызываем функцию рендера пинов
    generatePins = <T extends Record<string, unknown>>(mapData: T) => {
        (Object.keys(mapData) as Array<keyof T>).forEach(key => {
            this.createObject(mapData[key] as ImageParams)
        })
    }

    // Рендер пина на карту
    createObject = (pin: ImageParams): void => {
        Konva.Image.fromURL(pin.image, (image) => {
            image.setAttrs({
                x: pin.x,
                y: pin.y,
                width: pin.width * 1.65 + 15,
                height: pin.height * 1.65,
            })
            image.addEventListener('click', () => {
                Fancybox.show([{src: pin.src, type: "inline"}])
            })

            image.addEventListener('touchstart', () => {
                Fancybox.show([{src: pin.src, type: "inline"}])
            })

            image.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'pointer';
            })

            image.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'auto';
            })

            this.layer.add(image);
        });
    }
}

export default CustomMap