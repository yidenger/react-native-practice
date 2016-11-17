import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Util from '../util';
import Service from '../service';
import Address from './address';

export default class ItemBlock extends Component {
  //加载页面
  _loadPage(e) {
    const nav = this.props.nav;
    const key = Util.key;
    const partment = this.props.partment;
    const path = Service.host + Service.getUser;

    Util.post(path, {
      key: key,
      partment: partment
    }, function(data) {
      nav.push({
        title: this.props.title,
        component: Address,
        passProps: {
          data: data
        }
      });
    }.bind(this));
  }
  render() {
    const size = {
      width: parseInt(this.props.width),
      height: parseInt(this.props.width),
      backgroundColor: this.props.color
    };

    return (
      <TouchableHighlight underlayColor="#FFF" onPress={this._loadPage.bind(this)}>
        <View style={[styles.itemBlock, size]}>
          <View>
            <Text style={styles.font18}>{this.props.title}</Text>
          </View>
          <View>
            <Text style={styles.font10}>{this.props.partment}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10
  },
  font18: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  font10: {
    color: '#fff',
    fontSize: 10
  }
});
