import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

class Detail extends Component {
  render() {
    return (
      <ScrollView>
        <Text>详情页</Text>
        <Text>
          尽管信息很少，但这就是详情页
        </Text>
      </ScrollView>
    );
  }
}

export default Detail;

