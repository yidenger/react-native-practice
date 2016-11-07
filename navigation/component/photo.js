/**
 * Image组件demo
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
  Image,
} from 'react-native';


export default class photo extends Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    console.log('this.props: ', this.props);
    const imgs = this.props.imgs;
    this.state = {
      imgs: imgs,
      count: 0
    };
  }
  goNext() {
    let count = this.state.count;
    count++;
    if (count < this.state.imgs.length) {
      this.setState({
        count: count
      });
    }
  }
  goPreview() {
    let count = this.state.count;
    count--;
    if (count >= 0) {
      this.setState({
        count: count
      });
    }
  }
  render() {
    return (
      <View style={[styles.flex]}>
        <View style={styles.image}>
          <Image style={styles.imgs}
            source={{ uri: this.state.imgs[this.state.count] }}
            resizeMode="contain"
            ></Image>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={this.goPreview.bind(this)}>
            <View style={styles.btn}>
              <Text>上一张</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goNext.bind(this)}>
            <View style={styles.btn}>
              <Text>下一张</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    borderWidth: 1,
    width: 300,
    height: 200,
    borderRadius: 5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgs: {
    height: 150,
    width: 200
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  btn: {
    width: 60,
    height: 30,
    borderColor: '#0089FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginRight: 20
  }
});
