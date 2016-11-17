import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import Util from './util';
import ItemBlock from './home/itemblock';


export default class Home extends Component {
    constructor(props) {
      super(props);
      const width = Math.floor(((Util.size.width - 20) - 50) / 4);
      const items = [
        {
          title: '研发',
          partment: '框架开发',
          color: '#126AFF'
        },
        {
          title: '研发',
          partment: 'BU研发',
          color: '#FFD600'
        },
        {
          title: '产品',
          partment: '公共产品',
          color: '#F80728'
        },
        {
          title: '产品',
          partment: 'BU产品',
          color: '#05C147'
        },
        {
          title: '产品',
          partment: '启明星',
          color: '#FF4EB9'
        },
        {
          title: '项目',
          partment: '项目管理',
          color: '#EE810D'
        },
      ];
      
      this.state = {
        width: width,
        items: items
      };
    }
    render() {
        const Items1 = [];
        const Items2 = [];
        const items = this.state.items;
        for (let i = 0; i < 4; i++) {
          Items1.push(
            <ItemBlock
              title={items[i].title}
              partment={items[i].partment}
              width={this.state.width}
              color={items[i].color}
              nav={this.props.navigator}
              key={i}
             />
          );
        }

        for(let i = 4; i < items.length; i++){
          Items2.push(
            <ItemBlock
              title={items[i].title}
              partment={items[i].partment}
              width={this.state.width}
              color={items[i].color}
              nav={this.props.navigator}
              key={i}
             />
          );
        }

        return (
          <ScrollView style={styles.container}>
            <View style={styles.itemRow}>
              {Items1}
            </View>
            <View style={styles.itemRow}>
              {Items2}
            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 20
  }
});