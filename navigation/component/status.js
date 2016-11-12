import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';

StatusBar.setBarStyle('light-content');
StatusBar.setNetworkActivityIndicatorVisible(true);

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1FB9FF'
    }
});