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
  TabBarIOS,
  NavigatorIOS,
  Image,
  StatusBarIOS,
  ScrollView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AlertIOS,
  AsyncStorage
} from 'react-native';

import AdSupportIOS from 'AdSupportIOS';
import Home from './views/home';
import About from './views/about';
import Manager from './views/manager';
import Message from './views/message';
import Util from './views/util';
import Service from './views/service';

//获取设备id
AdSupportIOS.getAdvertisingTrackingEnabled(() => {
  AdSupportIOS.getAdvertisingId(deviceId => {
    //todo 设备id
  }
});

StatusBarIOS.setStyle('light-content');

class Address extends Component {
  statics() {
    return {
      title: '主页',
      description: '选项卡'
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      showIndex: {
        height: 0,
        opacity: 0
      },
      showLogin: {
        flex: 1,
        opacity: 1
      },
      isLoadingShow: false
    };
  }
  componentDidMount() {
    const that = this;
    AsyncStorage.getItem('token', function(err, token){
      if(!err && token){
        let path = Service.host + Service.loginByToken;
        Util.post(path, {
          token: token
        }, function(data){
          if(data, status){
            that.setState({
              showLogin: {
                height: 0,
                width: 0,
                flex: 0,
              },
              showIndex: {
                flex: 1,
                opacity: 1
              },
              isLoadingShow: false
            });
          }
        });
      }
      else{
        that.setState({
          showIndex: {
            height: 0,
            opacity: 0
          },
          showLogin: {
            flex: 1,
            opacity: 1
          },
          isLoadingShow: false
        });
      }
    });

    const path = Service.host + Service.getMessage;
    Util.post(path, {
      key: Util.key
    }, function(data){
      that.setState({
        data: data
      });
    });

  }

  _addNavigator(){}
}

export default class address_book extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS barTintColor="#FFF">
          <TabBarIOS.Item
            icon={'./images/'}
            title="首页"
            selected={this.state.selectedTab === 'home'}
            onPress={this._selectTab.bind(this, 'home')}
          >
          {this._addNavigator(Home, '主页')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={'../images/'}
            title="公告"
            selected={this.state.selectedTab === 'message'}
            onPress={this._selectTab.bind(this, '公告')}
          >
          {this._addNavigator(Message, '公告')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={'../images/'}
            title="管理"
            selected={this.state.selectedTab === 'manager'}
            onPress={this._selectTab.bind(this, 'manager')}
          >
          {this._addNavigator(Manager, '管理')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={'./images/'}
            title="关于"
            selected={this.state.selectedTab === 'about'}
            onPress={this._selectTab.bind(this, 'about')}
          >
          {this._addNavigator(About, '关于')}
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('address_book', () => address_book);
