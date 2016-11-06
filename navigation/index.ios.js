/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import List from './component/list';
import Photo from './component/photo';

export default class navigation extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{ flex: 1 }}
        initialRoute={{
          component: List,
          title: '邮轮',
          passProps: {},
        }}
        />
    );
  }
}

//搜索框
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  getValue(text) {
    let value = text;
    this.setState({
      show: true,
      value: value,
    });
  }
  hide(val) {
    this.setState({
      show: false,
      value: val
    });
  }
  render() {
    return (
      <View style={styles.flex}>
        <View style={[styles.flexDirection, styles.inputHeight]}>
          <View style={styles.flex}>
            <TextInput 
              style={styles.input} 
              returnKeyType="search" 
              placeholder="请输入关键字"
              onEndEditing={this.hide.bind(this, this.state.value )}
              value={this.state.value}
              onChangeText={this.getValue.bind(this)}
            />
          </View>
          <View style={styles.btn}>
            <Text style={styles.search} onPress={this.hide.bind(this, this.state.value)}>
              搜索
            </Text>
          </View>
        </View>
        {this.state.show ? 
          <View style={[styles.result]}>
            <Text onPress={this.hide.bind(this, this.state.value + '庄')}
              style={styles.item} numberOfLine={1}>{this.state.value}庄
            >
            </Text>
            <Text onPress={this.hide.bind(this, this.state.value + '园街')}
              style={styles.item} numberOfLine={1}>{this.state.value}园街
            >
            </Text>
            <Text onPress={this.hide.bind(this, 80 + this.state.value + '综合商店')}
              style={styles.item} numberOfLine={1}>80{this.state.value}综合商店
            >
            </Text>
            <Text onPress={this.hide.bind(this, this.state.value + '桃')}
              style={styles.item} numberOfLine={1}>{this.state.value}桃
            >
            </Text>
            <Text onPress={this.hide.bind(this, '杨林' + this.state.value + '园')}
              style={styles.item} numberOfLine={1}>杨林{this.state.value}
            >
            </Text>
          </View>
          : null
        }
      </View>
    );
  }
}

class App extends Component {
  render() {
    return (
      <View style={[styles.flex, styles.topStatus]}>
        <Search></Search>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexDirection: {
    flexDirection: 'row',
  },
  input: {
    height: 45,
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderColor: '#ccc',
    borderRadius: 4
  },
  inputHeight: {
    height: 45
  },
  btn: {
    width: 55,
    marginLeft: -5,
    marginRight: 5,
    backgroundColor: '#23BEFF',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  topStatus: {
    marginTop: 25
  },
  item: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
  }
});


class App2 extends Component {
  show(text) {
    alert(text);
  }
  render() {
    return(
      <View style={styles2.flex}>
      <TouchableHighlight
        onPress={this.show.bind(this, 'React Native入门与实战')}
        underlayColor="red"
      >
        <Text style={styles2.item}>React Native入门与实战</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={this.show.bind(this, '图灵出版社')}
        underlayColor="#E1F6FF"
      >
        <Text style={styles2.item}>图灵出版社</Text>
      </TouchableHighlight>
      <TouchableOpacity
        onPress={this.show.bind(this, 'you click button')}
      >
        <View style={styles2.btn}>
          <Text style={{fontSize: 25, color: '#fff'}}>按钮</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
    
  }
}

const styles2 = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 25
  },
  item: {
    fontSize: 18,
    marginLeft: 5,
    color: '#434343'
  },
  btn: {
    marginLeft: 30,
    marginTop: 30,
    width: 100,
    height: 100,
    backgroundColor: '#18B4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  }
});

const imgs = [
  'https://avatars2.githubusercontent.com/u/10626873?v=3&s=466',
  'https://avatars2.githubusercontent.com/u/4279697?v=3&s=400',
  'https://avatars2.githubusercontent.com/u/10626873?v=3&s=466'
];

class App3 extends Component {
  render() {
    return (
      <View style={[{flex: 1, marginTop: 40}]}>
        <Photo imgs={imgs}></Photo>
      </View>
    );
  }
}

AppRegistry.registerComponent('navigation', () => App3);
