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
    TextInput,
    View,
    TabBarIOS,
    NavigatorIOS,
    Image,
    StatusBar,
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

StatusBar.setBarStyle('light-content');

export default class AddressBook extends Component {
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
            isLoadingShow: false,
            title: '主页',
            isLogin: false
        };
    }
    componentDidMount() {
        const that = this;
        AsyncStorage.getItem('token', function(err, token) {
            if (!err && token) {
                let path = Service.host + Service.loginByToken;
                Util.post(path, {
                    token: token
                }, function(data) {
                    console.log('data: ', data);
                    if (data.status) {
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
                            isLoadingShow: false,
                            isLogin: true
                        });
                    }
                });
            }
            else {
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
        }, function(data) {
            that.setState({
                data: data
            });
        });

    }

    _selectTab(tabName) {
        this.setState({
            selectedTab: tabName
        });
    }

    _addNavigator(component, title) {
        let data = null;
        if (this.state.title === '公告') {
            data = this.state.data;
        }
        console.log(this.state);
        return (
            <NavigatorIOS
                style={{ flex: 1 }}
                barTintColor='#007AFF'
                titleTextColor='#FFF'
                tintColor='#FFF'
                translucent={false}
                initialRoute={{
                    component: component,
                    title: title,
                    passProps: {
                        data: data
                    }
                }}
                />
        );
    }

    _getEmail(val) {
        const email = val;
        this.setState({
            email: email
        });
    }

    _getPassword(val) {
        const password = val;
        this.setState({
            password: password
        });
    }

    _login() {
        const email = this.state.email;
        const password = this.state.password;
        const path = Service.host + Service.login;
        const that = this;
        console.log('path:', path);
        console.log(email, password);
        that.setState({
            showLogin: {
                height: 0,
                width: 0,
                flex: 0,
            },
            isLoadingShow: true
        });

        AdSupportIOS.getAdvertisingTrackingEnabled(() => {
            AdSupportIOS.getAdvertisingId((deviceId) => {
                Util.post(path, {
                    email: email,
                    password: password,
                    deviceId: deviceId
                }, function(data) {
                    console.log('data: ', data);
                    if (data.status) {
                        const user = data.data;
                        //加入数据到本地
                        AsyncStorage.multiSet([
                            ['username', user.username],
                            ['token', user.token],
                            ['userid', user.userid],
                            ['email', user.email],
                            ['tel', user.tel],
                            ['partment', user.partment],
                            ['tag', user.tag]
                        ], function(err) {
                            AlertIOS.alert('登录', '登录成功');
                            if (!err) {
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
                                    isLoadingShow: false,
                                    isLogin: true
                                });
                            }
                        });
                    }
                    else {
                        AlertIOS.alert('登录', '用户名或者密码错误');
                        that.setState({
                            showLogin: {
                                flex: 1,
                                opacity: 1
                            },
                            showIndex: {
                                height: 0,
                                width: 0,
                                flex: 0
                            },
                            isLoadingShow: false
                        });
                    }
                });
            }, function() {
                AlertIOS.alert('设置', '无法获取设备唯一标识');
            });
        }, function() {
            AlertIOS.alert('设置', '无法获取设备唯一标识， 请关闭设置->隐私->广告->限制广告跟踪');
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoadingShow ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicatorIOS size="small" color="#268DFF"></ActivityIndicatorIOS>
                    </View>
                    : null
                }
                {!this.state.isLoadingShow ?
                    <View style={this.state.showIndex}>
                        <TabBarIOS barTintColor="#FFF">
                            <TabBarIOS.Item
                                icon={require('./images/phone_s.png')}
                                title="首页"
                                selected={this.state.selectedTab === 'home'}
                                onPress={this._selectTab.bind(this, 'home')}
                                >
                                {this._addNavigator(Home, '首页')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('./images/gonggao.png')}
                                title="公告"
                                selected={this.state.selectedTab === 'message'}
                                onPress={this._selectTab.bind(this, 'message')}
                                >
                                {this._addNavigator(Message, '公告')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('./images/manager.png')}
                                title="管理"
                                selected={this.state.selectedTab === 'manager'}
                                onPress={this._selectTab.bind(this, 'manager')}
                                >
                                {this._addNavigator(Manager, '管理')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('./images/about.png')}
                                title="关于"
                                selected={this.state.selectedTab === 'about'}
                                onPress={this._selectTab.bind(this, 'about')}
                                >
                                {this._addNavigator(About, '关于')}
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    </View>
                    : null
                }
                {!this.state.isLogin ?
                    <ScrollView style={[this.state.showLogin]}>
                        <View style={styles.container}>
                            <View>
                                <Image style={styles.logo} source={require('./images/logo.png')}></Image>
                            </View>
                            <View style={styles.inputRow}>
                                <Text>邮箱</Text>
                                <TextInput style={styles.input}
                                    placeholder="请输入邮箱" onChangeText={this._getEmail.bind(this)}
                                    />
                            </View>
                            <View style={styles.inputRow}>
                                <Text>密码</Text>
                                <TextInput style={styles.input}
                                    placeholder="请输入密码" password={true} onChangeText={this._getPassword.bind(this)}
                                    />
                            </View>
                            <View>
                                <TouchableHighlight underlayColor="#FFF" style={styles.btn}
                                    onPress={this._login.bind(this)}
                                    >
                                    <Text style={{ color: '#FFF' }}>登录</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                    : null
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: Image.resizeMode.contain
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        width: 220,
        borderWidth: Util.pixel,
        height: 35,
        paddingLeft: 8,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    btn: {
        marginTop: 10,
        width: 80,
        height: 35,
        backgroundColor: '#3BC1FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

AppRegistry.registerComponent('address_book', () => AddressBook);
