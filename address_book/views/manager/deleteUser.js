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
  TouchableOpacity,
} from 'react-native';

import Util from '../util';
import Service from '../service';

export default class DeleteUser extends Component {
  _getEmail(val) {
    this.setState({
      email: val
    });
  }

  _deleteUser() {
    const that = this;
    AlertIOS.alert('提示', '确认删除该用户?', [
      {
        text: '删除', onPress: () => {
          const path = Service.host + Service.deleteUser;
          AsyncStorage.getItem('token', function (err, data) {
            if (!err) {
              Util.post(path,
                {
                  token: data,
                  email: that.state.email
                },
                function (data) {
                  if (data.status) {
                    AlertIOS.alert('成功', '删除成功');
                  }
                  else {
                    AlertIOS.alert('失败', '删除失败');
                  }
                }
              );
            }
          });
        }
      },
      { text: '取消', onPress: () => null }
    ]);
  }
  render() {
    return (
      <ScrollView>
        <View style={{ height: 35, marginTop: 30 }}>
          <TextInput
            style={styles.input}
            placeholder="请输入用户的邮箱"
            onChangeText={this._getEmail}
            />
        </View>

        <View>
          <TouchableOpacity
            onPress={this._deleteUser}
            >
            <View style={styles.btn}>
              <Text style={{ color: '#FFF' }}>删除用户</Text>
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
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#1DB8FF',
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4
  }
});