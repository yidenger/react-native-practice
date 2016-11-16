import React from 'react-native';
import Dimensions from 'Dimensions';

const { PixelRatio } = React;

const Util = {
    //单位像素 
    pixel: 1 / PixelRatio.get(),
    //屏幕尺寸
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    //POST请求
    post: (url, data, callback) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, fetchOptions)
        .then(response => response.text())
        .then(responseText => callback(JSON.parse(responseText)))
    },
    //key
    key: 'REACT-NATIVE'
}

export default Util;