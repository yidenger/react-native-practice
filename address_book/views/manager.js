import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Util from './util';

import AddUser from './manager/addUser';
import DeleteUser from './manager/deleteUser';
import ModifyPassword from './manager/modifyPassword';
import PostMessage from './manager/postMessage';

export default class Manager extends Component {
  _loadPage(component, title) {
    this.props.navigator.push({
      title: title,
      component: component
    });
  }

  _clear() {
    this.props.navigator.pop();
    AsyncStorage.clear();
  }
  render() {
    const colors = ['#F4000B', '#17B4FF', '#FFD900', '#F00000'];
    const tags = ['U', 'A', 'D', 'M'];
    const items = ['修改密码', '增加联系人', '删除联系人', '发布公告'];
    const components = [ModifyPassword, AddUser, DeleteUser, PostMessage];

    const JSXDOM = [];

    for (let i in items) {
      JSXDOM.push(
        <TouchableOpacity 
          key={i}
          onPress={this._loadPage.bind(this, components[i], items[i])}
        >
          <View style={[styles.item, { flexDirection: 'row' }]}>
            <Text style={[styles.tag, { color: colors[i] }]}>
              {tags[i]}
            </Text>
            <Text style={[styles.font, { flex: 1 }]}>
              {items[i]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          {JSXDOM}
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity onPress={this._clear.bind(this)}>
            <View style={[styles.item, { flexDirection: 'row' }]}>
              <Text style={[styles.tag, { color: colors[items.length] }]}>
                Q
              </Text>
              <Text style={[styles.font, { flex: 1 }]}>
                退出登录
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  item: {
    height: 40,
    justifyContent: 'center',
    borderTopWidth: Util.pixel,
    borderTopColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  font: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 10,
  },
  wrapper: {
    marginTop: 30,
  },
  tag: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});