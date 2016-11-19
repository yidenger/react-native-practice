import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  ActionSheetIOS,
  AlertIOS,
  Image,
  AsyncStorage,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Util from '../util';
import Service from '../service';

export default class PostMessage extends Component {
    _onChange(val) {
        if(val) {
            this.setState({
                message: val
            });
        }
    }

    _postMessage() {
        const that = this;
        AsyncStorage.getItem('token', function(err, token) {
            if(err) {
                AlertIOS.alert('警告', '权限失败， 请退出App, 重新登录');
            }
            else {
                Util.post(Service.host + Service.addMessage, 
                    {
                        token: token,
                        message: that.state.message
                    },
                    function(data) {
                        if(data.status) {
                            AlertIOS.alert('添加成功');
                        }
                        else {
                            AlertIOS.alert('添加失败');
                        }
                    }
                );
            }
        });
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <TextInput 
                        multiline={true}
                        onChangeText={this._onChange}
                        style={styles.textinput}
                        placeholder="请输入公告内容"
                    />
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={this._postMessage}>
                        <View style={styles.btn}>
                            <Text style={{color: '#FFF'}}>发布公告</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textinput: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 8,
        fontSize: 13,
        borderRadius: 4
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1DB8FF',
        height: 38,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4
    }
});

