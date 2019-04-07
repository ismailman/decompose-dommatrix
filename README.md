# Decompose DOMMatrix
Takes in a [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) and returns a set of transforms (translateX, rotateZ, etc). This code is mostly lifted from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js and can be considered as a standalone decompose function. This is actually useful though since a standalone decompose/unmatrix function for javascript was impossible to find.

Note: if you see different transform values returned than you were expecting do know that can happen sometimes. i.e. a different set of transforms can result in the same overall transformation. This is especially true when transforms involve scaling, skewing and rotating.

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

The translate values along the various axis. Is in pixels (px).

#### `rotateX, rotateY, rotateZ: number`

The rotation values along the various axis. Is in degrees (deg).

#### `scaleX, scaleY, scaleZ: number`

The scale values along the various axis. Is unitless.

#### `skewX, skewY, skewZ: number`

The skew values along the various axis. Is in degrees (deg).


