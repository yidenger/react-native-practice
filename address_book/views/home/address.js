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

export default class Address extends Component {
  showActionSheet(tel, email, name) {
    const options = [];
    options.push('拨打电话给: ' + name);
    options.push('发送短信给: ' + name);
    options.push('发送邮件给: ' + name);
    options.push('取消');

    const events = [];
    events.push(() => {
      LinkingIOS.openURL('tel://' + tel);
    });
    events.push(() => {
      LinkingIOS.openURL('sms://' + tel);
    });
    events.push(() => {
      LinkingIOS.openURL('mailto://' + email);
    });

    ActionSheetIOS.showActionSheetWithOptions({
      options: options,
      cancelButtonIndex: options.length -1,
    },
      function(index) {
        events[index] && events[index]();
      }
    );
  }

  render() {
    const view = [];
    const items = this.props.data.status ? this.props.data.data : [];
    const colors = ['#E20079', '#FFD6602', '#25BFFE', '#F90000',
      '#04E246', '#04E246', '#00AFC9'
    ];

    for (let i in items) {
      view.push(
        <View style={styles.row}>
          <View style={[styles.text, color]}>
            <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold' }}>
              {items[i].username.substr(0, 1) || '未'}
            </Text>
          </View>
          <View style={styles.part}>
            <Text>
              {items[i].username}
            </Text>
            <Text style={styles.unColor}>
              {(items[i].partment || '') + '部-' + (items[i].title || '') + '人员'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableHighlight underlayColor='#FFF'
              onPress={this.showActionSheet.bind(this, items[i].tel, items[i].email, items[i].username)}
              >
              <Text style={styles.link}>
                {items[i].tel}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#FFF'
              onPress={this.showActionSheet.bind(this, items[i].tel, items[i].email, items[i].username)}
              >
              <Text style={styles.link}>
                {items[i].email}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        {view}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  row: {
    height: 80,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E30082'
  },
  part: {
    marginLeft: 5,
    flex: 1,
  },
  link: {
    color: '#1BB7FF',
    marginTop: 2
  },
  unColor: {
    color: '#575656',
    marginTop: 8,
    fontSize: 12
  }
});
