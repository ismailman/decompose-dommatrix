/*

 copied from: https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js

*/


import roundToThreePlaces from './roundToThreePlaces.mjs';

const RAD_TO_DEG = 180 / Math.PI;

export default function quaternionToDegreesXYZ(quaternion) {

	const [qx, qy, qz, qw] = quaternion;
	const qw2 = qw * qw;
	const qx2 = qx * qx;
	const qy2 = qy * qy;
	const qz2 = qz * qz;
	const test = qx * qy + qz * qw;
	const unit = qw2 + qx2 + qy2 + qz2;

	if (test > 0.49999 * unit) {
	  return [0, 2 * Math.atan2(qx, qw) * RAD_TO_DEG, 90];
	}
	if (test < -0.49999 * unit) {
	  return [0, -2 * Math.atan2(qx, qw) * RAD_TO_DEG, -90];
	}

	return [
	  roundToThreePlaces(
		Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz2) * RAD_TO_DEG,
	  ),
	  roundToThreePlaces(
		Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz2) * RAD_TO_DEG,
	  ),
	  roundToThreePlaces(Math.asin(2 * qx * qy + 2 * qz * qw) * RAD_TO_DEG),
	];

}