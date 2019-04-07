/*

from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js

*/ 

export default function roundToThreePlaces(number){
    const arr = number.toString().split('e');
    return Math.round(arr[0] + 'e' + (arr[1] ? +arr[1] - 3 : 3)) * 0.001;
}