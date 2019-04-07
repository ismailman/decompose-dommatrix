/*

 copied from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js#L572

 vectors are just arrays of numbers

*/

export function length(vector) {
    return Math.sqrt(
        vector[0] * vector[0] + 
        vector[1] * vector[1] + 
        vector[2] * vector[2]
    );
}

export function normalize(vector, preComputedVectorLength) {
    return [
        vector[0]/preComputedVectorLength, 
        vector[1]/preComputedVectorLength,
        vector[2]/preComputedVectorLength
    ];
}

export function dotProduct(vectorA, vectorB) {
    return (
        vectorA[0] * vectorB[0] +
        vectorA[1] * vectorB[1] +
        vectorA[2] * vectorB[2]
    );
}

export function crossProduct(vectorA, vectorB) {
    return [
        vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],
        vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],
        vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0]
    ];
}

export function linearCombination(vectorA, vectorB, aScaleFactor, bScaleFactor) {
    return [
        vectorA[0] * aScaleFactor + vectorB[0] * bScaleFactor,
        vectorA[1] * aScaleFactor + vectorB[1] * bScaleFactor,
        vectorA[2] * aScaleFactor + vectorB[2] * bScaleFactor
    ];
}