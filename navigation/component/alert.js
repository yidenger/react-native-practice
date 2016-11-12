import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.item} onPress={this.tip}>提示对话框</Text>
      <Text style={styles.item} onPress={this.input}>输入对话框</Text>
    </View>
    );
  }

  tip() {
    AlertIOS.alert('提示', '选择学习React Native', [
      {
        text: '取消',
        onPress: () => {
          alert('你点击了取消按钮');
        }
      },
      {
        text: '确认',
        onPress: () => {
          alert('你点击了确认按钮');
        }
      }
    ]);
  }

  input() {
    AlertIOS.prompt('提示', '使用React Native开发App', [
      {
        text: '取消',
        onPress: () => {
          alert('你点击了取消按钮');
        }
      },
      {
        text: '确认',
        onPress: (e) => {
          alert(e);
        }
      }
    ]);
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
