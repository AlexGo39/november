import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { mapData } from "../mapData/mapData";

import { Fancybox } from "@fancyapps/ui";

const mapImage = "assets/images/map.svg";

interface ImageParams {
    x: number,
    y: number,
    image: string,
    width: number,
    height: number,
    src?: string,
    previewSrc?: string
}

class CustomMap {
    canvas;
    stage: Stage;
    canvasWidth;
    canvasHeight;
    layer: Layer;
    scale;
    iconScale;
    mapParams: ImageParams;

    constructor(el: HTMLCanvasElement) {
        this.canvas = el;
        this.canvasWidth = 1920;
        this.canvasHeight = 1080;
        this.scale = 1;
        this.iconScale = 1;
        this.mapParams = {
            x: 0,
            y: 0,
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

    createObject = (pin: ImageParams): void => {
        let timeoutId: number | null = null;

        Konva.Image.fromURL(pin.image, (image) => {
            image.setAttrs({
                x: pin.x,
                y: pin.y,
                width: pin.width * this.iconScale,
                height: pin.height * this.iconScale,
            });

            const showPreview = () => {
                const previewElement = document.getElementById(pin.previewSrc);
                if (previewElement) {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }

                    previewElement.style.visibility = 'visible';
                    previewElement.style.opacity = '1';
                    previewElement.style.zIndex = '999';

                    const previewWidth = previewElement.offsetWidth;
                    const previewHeight = previewElement.offsetHeight;
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;

                    let left, top;

                    // Adjust vertical axis (40% from the bottom)
                    const verticalAxis = windowHeight * 0.6;

                    // Determine left/right positioning
                    if (pin.x + previewWidth > windowWidth) {
                        left = pin.x - previewWidth - 6;
                    } else {
                        left = pin.x + 6;
                    }

                    // Determine top/bottom positioning based on the adjusted axis
                    if (pin.y > verticalAxis) {
                        top = pin.y - previewHeight - 20;
                    } else {
                        top = pin.y + 20;
                    }

                    previewElement.style.position = 'absolute';
                    previewElement.style.left = `${left}px`;
                    previewElement.style.top = `${top}px`;
                }
            };

            const hidePreview = () => {
                const previewElement = document.getElementById(pin.previewSrc);
                if (previewElement) {
                    timeoutId = window.setTimeout(() => {
                        previewElement.style.opacity = '0';
                        previewElement.style.zIndex = '-1';
                    }, 300);
                }
            };

            image.addEventListener('click', () => {
                Fancybox.show([{ src: pin.src, type: "inline" }]);
            });

            image.addEventListener('touchstart', () => {
                Fancybox.show([{ src: pin.src, type: "inline" }]);
            });

            image.on('mouseenter', () => {
                document.body.style.cursor = 'pointer';
                showPreview();
            });

            image.on('mouseleave', () => {
                document.body.style.cursor = 'auto';
                hidePreview();
            });

            this.layer.add(image);

            const previewElement = document.getElementById(pin.previewSrc);
            if (previewElement) {
                previewElement.addEventListener('mouseenter', () => {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    previewElement.style.opacity = '1';
                    previewElement.style.zIndex = '999';
                });

                previewElement.addEventListener('mouseleave', hidePreview);
            }
        });
    };








}

export default CustomMap