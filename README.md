# Decompose DOMMatrix
Takes in a [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) and returns a set of transforms (translateX, rotateZ, etc). This code is mostly lifted from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js and can be considered as a standalone decompose function. This is actually useful though since a standalone decompose/unmatrix function for javascript was impossible to find.

**Important Note**: the transforms are specified in a way that they need to be applied in a specific order to get the same result. Specifically, given a decomposed matrix, to "recompose" the matrix properly you must apply the transforms in the following order: **translate**, **rotate**, **skew**, **scale**. This is why if you apply some transforms, then get the decomposed matrix you may get different values. i.e. if you do 

```
element.style.transform = 'scale(2) rotate(30deg) translateX(30px)';
const decomposed = decomposeDOMMatrix(new DOMMatrix(getComputedStyle(element).getPropertyValue('transform')));
console.log(JSON.stringify(decomposed));
```

you will get a different set of numbers. But if you apply those new set of numbers in the specified order (translate, rotate, skew, scale) your element will look the exact same as your original.

# Usage
```
import decomposeDOMMatrix from 'decompose-dommatrix';

const decomposed = decomposeDOMMatrix(new DOMMatrix(getComputedStyle(element).getPropertyValue('transform')));
console.log(decomposed.translateX);
```

# API

#### `decomposeDOMMatrix(matrix: DOMMatrix): TransformValues`

Takes in a DOMMatrix and returns a map of transforms to values. All values are either in pixels or degrees, depending on the transform.

## TransformValues

#### `translateX, translateY, translateZ: number`

The translate values along the various axis. In pixels (px).

#### `rotateX, rotateY, rotateZ: number`

The rotation values along the various axis. In degrees (deg).

#### `scaleX, scaleY, scaleZ: number`

The scale values along the various axis. Unitless.

#### `skewX, skewY, skewZ: number`

The skew values along the various axis. In degrees (deg).


