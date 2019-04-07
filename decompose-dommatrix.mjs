/*

this code is copied from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js#L572 and modified
to work with DOMMatrix instead of a flat array

DOMMatrix is column major, meaning:
 _               _
| m11 m21 m31 m41 |  
  m12 m22 m32 m42
  m13 m23 m33 m43
  m14 m24 m34 m44
|_               _|

*/

import * as vectorFns from './vectorFunctions.mjs';
import roundToThreePlaces from './roundToThreePlaces.mjs';
import quaternionToDegreesXYZ from './quaternionToDegreesXYZ.mjs';

const RAD_TO_DEG = 180 / Math.PI;

export default function decomposeDOMMatrix(domMatrix) {
	const quaternion = new Array(4);
	const scale = new Array(3);
	const skew = new Array(3);
	const translation = new Array(3);

	const indexableVersionOfMatrix = new Array(4);
	for (let columnIndex = 1; columnIndex < 5; columnIndex++) {
		const columnArray = indexableVersionOfMatrix[columnIndex - 1] = new Array(4);
		for (let rowIndex = 1; rowIndex < 5; rowIndex++) {
			columnArray[rowIndex - 1] = domMatrix[`m${columnIndex}${rowIndex}`];
		}
	}

	// translation is simple
	// it's the first 3 values in the last column
	// i.e. m41 is X translation, m42 is Y and m43 is Z
	for (let i = 0; i < 3; i++) {
		translation[i] = indexableVersionOfMatrix[3][i];
	}

	// Now get scale and shear.
	const normalizedColumns = new Array(3);
	for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
		normalizedColumns[columnIndex] = indexableVersionOfMatrix[columnIndex].slice(0, 3);
	}

	// Compute X scale factor and normalize first row.
	scale[0] = vectorFns.length(normalizedColumns[0]);
	normalizedColumns[0] = vectorFns.normalize(normalizedColumns[0], scale[0]);

	// Compute XY shear factor and make 2nd row orthogonal to 1st.
	skew[0] = vectorFns.dotProduct(normalizedColumns[0], normalizedColumns[1]);
	normalizedColumns[1] = vectorFns.linearCombination(normalizedColumns[1], normalizedColumns[0], 1.0, -skew[0]);

	// Now, compute Y scale and normalize 2nd row.
	scale[1] = vectorFns.length(normalizedColumns[1]);
	normalizedColumns[1] = vectorFns.normalize(normalizedColumns[1], scale[1]);
	skew[0] /= scale[1];

	// Compute XZ and YZ shears, orthogonalize 3rd row
	skew[1] = vectorFns.dotProduct(normalizedColumns[0], normalizedColumns[2]);
	normalizedColumns[2] = vectorFns.linearCombination(normalizedColumns[2], normalizedColumns[0], 1.0, -skew[1]);
	skew[2] = vectorFns.dotProduct(normalizedColumns[1], normalizedColumns[2]);
	normalizedColumns[2] = vectorFns.linearCombination(normalizedColumns[2], normalizedColumns[1], 1.0, -skew[2]);

	// Next, get Z scale and normalize 3rd row.
	scale[2] = vectorFns.length(normalizedColumns[2]);
	normalizedColumns[2] = vectorFns.normalize(normalizedColumns[2], scale[2]);
	skew[1] /= scale[2];
	skew[2] /= scale[2];

	// At this point, the matrix defined in normalizedColumns is orthonormal.
	// Check for a coordinate system flip.  If the determinant
	// is -1, then negate the matrix and the scaling factors.
	const pdum3 = vectorFns.crossProduct(normalizedColumns[1], normalizedColumns[2]);
	if (vectorFns.dotProduct(normalizedColumns[0], pdum3) < 0) {
		for (let i = 0; i < 3; i++) {
			scale[i] *= -1;
			normalizedColumns[i][0] *= -1;
			normalizedColumns[i][1] *= -1;
			normalizedColumns[i][2] *= -1;
		}
	}

	// Now, get the rotations out
	quaternion[0] =
		0.5 * Math.sqrt(Math.max(1 + normalizedColumns[0][0] - normalizedColumns[1][1] - normalizedColumns[2][2], 0));
	quaternion[1] =
		0.5 * Math.sqrt(Math.max(1 - normalizedColumns[0][0] + normalizedColumns[1][1] - normalizedColumns[2][2], 0));
	quaternion[2] =
		0.5 * Math.sqrt(Math.max(1 - normalizedColumns[0][0] - normalizedColumns[1][1] + normalizedColumns[2][2], 0));
	quaternion[3] =
		0.5 * Math.sqrt(Math.max(1 + normalizedColumns[0][0] + normalizedColumns[1][1] + normalizedColumns[2][2], 0));

	if (normalizedColumns[2][1] > normalizedColumns[1][2]) {
		quaternion[0] = -quaternion[0];
	}
	if (normalizedColumns[0][2] > normalizedColumns[2][0]) {
		quaternion[1] = -quaternion[1];
	}
	if (normalizedColumns[1][0] > normalizedColumns[0][1]) {
		quaternion[2] = -quaternion[2];
	}

	// correct for occasional, weird Euler synonyms for 2d rotation
	let rotationDegrees;
	if (
		quaternion[0] < 0.001 &&
		quaternion[0] >= 0 &&
		quaternion[1] < 0.001 &&
		quaternion[1] >= 0
	) {
		// this is a 2d rotation on the z-axis
		rotationDegrees = [
			0,
			0,
			roundToThreePlaces(
				(Math.atan2(normalizedColumns[0][1], normalizedColumns[0][0]) * 180) / Math.PI
			)
		];
	} else {
		rotationDegrees = quaternionToDegreesXYZ(quaternion);
	}

	// expose both base data and convenience names
	return {
		rotateX: rotationDegrees[0],
		rotateY: rotationDegrees[1],
		rotateZ: rotationDegrees[2],
		scaleX: roundToThreePlaces(scale[0]),
		scaleY: roundToThreePlaces(scale[1]),
		scaleZ: roundToThreePlaces(scale[2]),
		translateX: translation[0],
		translateY: translation[1],
		translateZ: translation[2],
		skewX: roundToThreePlaces(skew[0]) * RAD_TO_DEG,
		skewY: roundToThreePlaces(skew[1]) * RAD_TO_DEG,
		skewZ: roundToThreePlaces(skew[2] * RAD_TO_DEG)
	};
}