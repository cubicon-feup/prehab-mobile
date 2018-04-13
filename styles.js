'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

let IMAGE_HEIGHT = 252;
let IMAGE_HEIGHT_SMALL = 50;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 10,
        padding:5,
        height: 40,
        width: 252,
        borderColor: '#000',
        borderWidth: 1
    },
    logo:{
        height:$IMAGE_HEIGHT,
        width: $IMAGE_HEIGHT
    },
});