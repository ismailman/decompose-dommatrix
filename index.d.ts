declare module "decompose-dommatrix";

export interface TransformValues {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    translateX: number;
    translateY: number;
    translateZ: number;
    skewX: number;
    skewY: number;
    skewZ: number;
}

export default function decomposeDOMMatrix(domMatrix: DOMMatrix): TransformValues;