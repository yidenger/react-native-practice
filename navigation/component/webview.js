/**
 * WebView组件demo
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TabBarIOS,
  ScrollView,
  WebView,
} from 'react-native';

import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 70;

export default class webview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    injectedJavaScript="alert('欢迎使用React Native')"
                    bounces={false}
                    source={{uri:'https://github.com'}}
                    style={{width:width, height: height}}
                >
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

