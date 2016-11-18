import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  ActionSheetIOS,
  AlertIOS,
  LinkingIOS,
  Image,
} from 'react-native';

import Util from '../util';
import Service from '../service';

export default class Item extends Component {
  //加载页面
  loadPage(data) {
    const content = data;
    this.props.nav.push({
      title: '消息详情',
      component: this.props.component,
      passProps: {
        content: content
      }
    });
  }

  render() {
    <TouchableHighlight onPress={this.loadPage.bind(this, this.props.data)}>
      <View style={styles.item}>
        <View style={styles.width55}>
          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
            {this.props.name.substr(0, 1)}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text numberOfLines={2} style={styles.text}>
            {this.props.text}
          </Text>
          <Text style={styles.date}>
            {this.props.date}
          </Text>
        </View>
        <View numberOfLines={1} style={styles.m10}>
          <Text style={styles.name}>
            {this.props.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 5,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  width55: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05C147',
    marginRight: 10,
  },
  date: {
    color: '#CCC',
    fontSize: 11,
  },
  m10: {
    marginLeft: 10
  },
  name: {
    color: '#929292',
    fontSize: 13
  }
});

