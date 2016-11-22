import React, { Component } from 'react';
import {
    WebView,
    ScrollView,
    Text,
    View
} from 'react-native';

export default class webview extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
              <WebView source={{uri: this.props.url}} />
            </View>
        );
    }
}
