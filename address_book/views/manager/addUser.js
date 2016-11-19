import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  ActionSheetIOS,
  AlertIOS,
  Image,
  AsyncStorage,
} from 'react-native';

import Util from '../util';
import Service from '../service';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        const items = ['A', 'B', 'C', 'D', 'E', 'F'];
        const tags = ['框架开发', 'BU产品', 'BU研发', '启明星', '项目管理', '公共产品'];

        this.state = {
            items: items,
            tags: tags,
            selectA: {
                backgroundColor: '#3BC1FF',
                borderColor: '#3BC1FF'
            },
            select_A: {
                color: '#FFF'
            },
            yan: {
                backgroundColor: '#3BC1FF',
                borderColor: '#3BC1FF'
            },
            yan_text: {
                color: '#FFF'
            },
            tag: '研发',
            partment: '框架研发'
        };
    }
    _select(id) {
        const obj = {};
        const color = {};
        const items = {
            A: {},
            B: {},
            C: {},
            D: {},
            E: {},
            F: {}
        };
        //加上选中的效果
        obj['select' + id] = {
            backgroundColor: '#3BC1FF',
            borderColor: '#3BC1FF'
        };
        color['select_' + id] = {
            color: '#FFF'
        };
        this.setState(obj);
        this.setState(color);
        this.setState();
        //清除其他选中的效果
        delete items[i];

        for(let i in items) {
            const newObj = {};
            newObj['select' + i] = {
                backgroundColor: '#FFF',
                borderColor: '#DDD'
            };
            const newColor = {};
            newColor['select_' + i] = {
                color: '#000'
            };
            this.setState(newObj);
            this.setState(newColor);
        }

        //增加变量
        let partment = '框架研发';
        switch(id) {
            case 'A': 
                partment = this.state.tags[0];
                break;
            case 'B': 
        }
    }
    render() {
        const tagOne = [];
        for(let i = 0; i < 3; i++) {
            tagOne.push(
                <TouchableOpacity onPress={this._select.bind(this, this.state.items[i])}>
                    <View style={[styles.part, this.state['select' + this.state.items[i]]]}>
                        <Text style={this.state['select_' + this.state.items[i]]}>
                            {this.state.tags[i]}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        const tagTwo = [];
        for(let i = 3; i < 6; i++) {
            tagTwo.push(
                <TouchableOpacity onPress={this._select.bind(this, this.state.items[i])}>
                    <View style={[styles.part, this.state['select' + this.state.items[i]]]}>
                        <Text style={this.state['select_' + this.state.items[i]]}>
                            {this.state.tags[i]}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <ScrollView style={{paddingTop: 30}}>
                <View style={styles.row}>
                    <Text style={styles.label}>用户名</Text>
                    <TextInput style={styles.input} onChangeText={this._setUserName} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>密码</Text>
                    <TextInput 
                        style={styles.input}
                        password={true}
                        placeholder="初始密码"
                        onChangeText={this._setPassword}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>邮箱</Text>
                    <TextInput style={styles.input} onChangeText={this._setEmail} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>电话</Text>
                    <TextInput style={styles.input} onChangeText={this._setTel} />
                </View>
                
                <View style={styles.partment}>
                    {tagOne}
                </View>
                <View style={styles.partment}>
                    {tagTwo}
                </View>

                <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'yan')}>
                        <View style={[styles.part, this.state.yan]}>
                            <Text style={this.state.yan_text}>研发</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'chan')}>
                        <View style={[styles.part, this.state.chan]}>
                            <Text style={this.state.chan_text}>产品</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'project')}>
                        <View style={[styles.part, this.state.project]}>
                            <Text style={this.state.project_text}>项目</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this._addUser}>
                        <View style={styles.btn}>
                            <Text>创建用户</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}