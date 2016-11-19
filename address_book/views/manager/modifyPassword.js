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
} from 'react-native';

import Util from '../util';
import Service from '../service';

export default class ModifyUser extends Componetn {
  _getOldPassword(val) {
    this.setState({
      oldPassword: val
    });
  }

  _getNewPassword(val) {
    this.setState({
      password: val
    });
  }

  _resetPassword() {
    const path = Service.host + Service.updatePassword;
    const that = this;

    //需要服务器端确认登录的token， 只有token一致才能有权限修改密码
    AsyncStorage.getItem('token', function (err, data) {
      if (!err) {
        Util.post(path,
          {
            password: that.state.password,
            oldPassword: that.state.oldPassword,
            token: data
          },
          function (data) {
            if (data.status) {
              AlertIOS.alert('成功', data.data);
            }
            else {
              AlertIOS.alert('失败', data.data);
            }
          }
        );
      }
      else {
        AlertIOS.alert('失败', data.data);
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ height: 35, marginTop: 30 }}>
          <TextInput style={styles.input} password={true} placeholder="原始密码"
            onChangeText={this._getOldPassword}
            >
          </TextInput>
        </View>
        <View style={{ height: 35, marginTop: 5 }}>
          <TextInput style={styles.input} password={true} placeholder="新密码"
            onChangeText={this._getNewPassword}
            >
          </TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={this._resetPassword}>
            <View style={styles.btn}>
              <Text style={{ color: '#FFF' }}>
                修改密码
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 35,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingLeft: 5,
    fontSize: 13
  },
  btn: {
    justifyContent: 'center',
    aliginItems: 'center',
    marginTop: 20,
    backgroundColor: '#1DB8FF',
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4
  }
});