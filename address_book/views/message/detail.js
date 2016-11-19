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

export default class Detail extends Component {
    render() {
        const content = this.props.content;
        
        return (
            <ScrollView>
                <View style={styles.content}>
                    <Text style={{lineHeight: 20}}>{content.message}</Text>
                </View>
                <View>
                    <View style={[styles.luokuan, {marginTop: 25}]}></View>
                    <Text style={[styles.text, {color: '#007AFF'}]}>
                        {content.username}
                    </Text>
                </View>
                <View style={styles.luokuan}>
                    <View style={{flex: 1}}></View>
                    <Text style={[styles.text, {color: '#3BC1FF'}]}>
                        {content.time}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        opacity: 0.85,
    },
    luokuan: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 20
    },
    text: {
        lineHeight: 20,
        width: 90
    }
});