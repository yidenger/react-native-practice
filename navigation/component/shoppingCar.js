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
  Image,
  TabBarIOS,
  ScrollView,
  WebView,
} from 'react-native';

import Dimensions from 'Dimensions';

const Model = [
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  }

];

//单个商品
class Item extends Component {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={this.props.press}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{ uri: this.props.url }}
            >
            <Text numberOfLines={1} style={styles.item_text}>
              {this.props.title}
            </Text>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
}
//列表
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    const _that = this;
    AsyncStorage.getAllKeys(function () {
      if (err) {

      }

      _that.setState({
        count: keys.length
      });
    });
  }

  goGouWu() {
    this.props.navigator.push({
      component: GouWu,
      title: '购物车'
    });
  }

  press(data) {
    let count = this.state.count;
    count++;
    this.setState({
      count: count
    });
    //AsyncStorage存储
    AsyncStorage.setItem('SP-' + this.genId() + '-SP', JSON.stringify(data), function(err){
      if(err) {

      }
    });
  }

  genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() *16 | 0;
      let v = c == 'x' ? r: (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  }

  render() {
    let list = [];
    for(let i in Model){
      if(i % 2 === 0) {
        var row = (
          <View style={styles.row}>
            <Item url={Model[i].url}
              title={Model[i].title}
              press={this.press.bind(this, Model[i])}
            >
            </Item>
            <Item url={Model[parseInt(i) + 1].url}
              title={Model[parseInt(i) + 1].title}
              press={this.press.bind(this, Model[parseInt(i) + 1])}
            >
            </Item>
          </View>
        );
        list.push(row)
      }
    }

    const count = this.state.count;
    let str = null;
    if(count) {
      str = ', 共' + count + '件商品';
    }

    return (
      <ScrollView style={{marginTop: 10}}>
        {list}
        <Text
          onPress={this.goGouWu}
          style={styles.btn}
        >
          去结算{str}
        </Text>
      </ScrollView>
    );
  }
}
//购物车
class GouWu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      price: 0,
    };
  }

  render() {
    const data = this.state.data;
    let price = this.state.price;
    let list = [];

    for(let i in data) {
      price += parseFloat(data[i].price);
      list.push(
        <View
          style={{styles.row, styles.list_item}}
        >
          <Text style={styles.list_item_desc}>
            {data[i].title}
            {data[i].desc}
          </Text>
          <Text style={styles.list_item_price}>¥{data[i].price}</Text>
        </View>
      );
    }

    let str = null;
    if(price) {
      str = ', 共' + price.toFixed(1) + '元';
    }

    return (
      <ScrollView style={{marginTop: 10}}>
        {list}
        <Text style={styles.btn}>
          支付{str}
        </Text>
        <Text style={styles.clear} onPress={this.clearStorage}>清空购物车</Text>
      </ScrollView>
    );
  }

  componentDidMount() {
    const _that = this;
    AsyncStorage.getAllKeys(function(err, keys){
      if(err){
        console.log(err);
      }

      AsyncStorage.multiGet(keys, function(errs, result){
        let arr = [];
        for(let i in result) {
          arr.push(JSON.parse(result[i][1]));
        }
        _that.setState({
          data: arr
        });
      });
    });
  }
}

clearStorage() {
  const _that = this;
  AsyncStorage.clear(function(err) {
    if(!err){
      _that.setState({
        data: [],
        price: 0
      });
      alert('购物车已经清空');
    }
  });
}

export default class shoppingCar extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={
          {
            component: List,
            title: '水果列表'
          }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10``
  },
  item: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 5,
    height: 100
  },
  img: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  item_text: {
    backgroundColor: '#0000',
    opacity: 0.7,
    color: '#fff',
    height: 25,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 74
  },
  btn: {
    backgroundColor: '#FF7200',
    height: 33,
    textAlign: 'center',
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
    marginTop: 40,
    fontSize: 18
  },
  list_item: {
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderWidth: 1,
    height: 30,
    borderRadius: 3,
    borderColor: '#ddd'
  },
  list_item_desc: {
    flex: 2,
    fontSize: 15
  },
  list_item_price: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15
  },
  clear: {
    marginTop: 10,
    backgroundColor: '#FFF',
    color: '#000',
    borderColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
    height: 33,
    fontSize: 18,
    textAlign: 'center'
  }
});



