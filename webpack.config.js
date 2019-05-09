const path = require('path');

module.exports = {
    entry: './decomposeDommatrix.mjs',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'decomposeDOMMatrix.js',
        library: 'decomposeDOMMatrix',
        libraryTarget: 'umd'
    }
};