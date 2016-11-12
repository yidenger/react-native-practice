import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActionSheetIOS
} from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.item} onPress={this.tip}>showActionSheetWithOptions</Text>
                <Text style={styles.item} onPress={this.share}>showShareActionSheetWithOptions</Text>
            </View>
        );
    }
    tip() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: [
                '拨打电话',
                '发送邮件',
                '发送短信',
                '取消'
            ],
            cancelButtonIndex: 3,
            destructiveButtonIndex: 0
        }, function(index) {
            alert(index);
        });
    }
    share() {
        ActionSheetIOS.showShareActionSheetWithOptions({
            url: 'https://code.facebook.com',
        }, function(err) {
            alert(err);
        }, function(e){
            alert(e);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    },
    item: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        height: 30,
        borderWidth: 1,
        padding: 6,
        borderColor: '#ddd'
    }
});

