import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    StyleSheet,
    TextInput,
} from 'react-native';

import Util from './util';
import Item from './message/item';

import Detail from './message/detail';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let contents = [];
        const items = [];
        
        if(this.props.data.status) {
            contents = this.props.data.data;
        }
        for(let i = 0; i < contents.length; i++){
            items.push(
                <Item
                    key={i}
                    data={contents[i]}
                    nav={this.props.navigator}
                    component={Detail}
                    text={contents[i].message}
                    name={contents[i].username}
                    date={contents[i].time}
                >
                </Item>
            );
        }

        return (
            <ScrollView style={styles.container}>
                <View style={{height: 50, padding: 7}}>
                    <TextInput style={styles.search} placeholder="搜索" />
                </View>
                <View style={{backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#DDD'}}>
                    {items}
                    <View style={{height: 35}}>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
    },
    search: {
        height: 35,
        borderWidth: Util.pixel,
        borderColor: '#CCC',
        paddingLeft: 10,
        borderRadius: 6,
        backgroundColor: '#FFF',
    }
});