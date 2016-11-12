import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio
} from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{borderWidth: 1, borderColor: 'red', height: 40, marginBottom: 20}}></View>
                <View style={{borderWidth: 1/PixelRatio.get(), borderColor: 'red', height: 40}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    }
});