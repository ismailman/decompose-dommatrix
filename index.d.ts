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
    skewXY: number;
    skewXZ: number;
    skewYZ: number;
}

export default function decomposeDOMMatrix(domMatrix: DOMMatrix): TransformValues;