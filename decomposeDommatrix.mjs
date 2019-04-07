/*

DOMMatrix is column major, meaning:
 _               _
| m11 m21 m31 m41 |  
  m12 m22 m32 m42
  m13 m23 m33 m43
  m14 m24 m34 m44
|_               _|

*/

import decomposeMatrix from './decomposeMatrix.mjs';

export default function decomposeDOMMatrix(domMatrix) {
	const indexableVersionOfMatrix = new Array(4);
	for (let columnIndex = 1; columnIndex < 5; columnIndex++) {
		const columnArray = indexableVersionOfMatrix[columnIndex - 1] = new Array(4);
		for (let rowIndex = 1; rowIndex < 5; rowIndex++) {
			columnArray[rowIndex - 1] = domMatrix[`m${columnIndex}${rowIndex}`];
		}
	}

	return decomposeMatrix(indexableVersionOfMatrix);
}