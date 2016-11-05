import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Detail from './detail';

class List extends Component {
  render() {
    return (
      <ScrollView style={styles.flex}>
        <Text style={styles.list_item} onPress={this.goTo.bind(this)}>豪华邮轮济州岛3日游</Text>
        <Text style={styles.list_item} onPress={this.goTo.bind(this)}>豪华邮轮台湾3日游</Text>
        <Text style={styles.list_item} onPress={this.goTo.bind(this)}>豪华邮轮地中海8日游</Text>
      </ScrollView>
    );
  }

  goTo() {
    this.props.navigator.push({
      component: Detail,
      title: '邮轮',
      rightButtonTitle: '购物车',
      onRightButtonPress: () => {
        alert('进入我的购物车');
      }
    }
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  list_item: {

  },
});

export default List;