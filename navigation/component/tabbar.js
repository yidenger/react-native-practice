/**
 * TabBarIOS组件demo
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
  TabBarIOS,
  ScrollView,
} from 'react-native';

import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 70;

export default class tabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'message'
    }
  }
  select(tabName) {
    this.setState({ tab: tabName });
  }
  render() {
    return (
      <TabBarIOS style={styles.flxe}>
        <TabBarIOS.Item
          title="消息"
          icon={require("../images/message.png")}
          onPress={this.select.bind(this, 'message')}
          selected={this.state.tab == 'message'}
          >
          <ScrollView>
            <View style={styles.message}>
              <Text style={styles.message_title}>南山南</Text>
              <Text>
                他不在和谁谈论相逢的孤岛， 因为心里早已荒无人烟
                            他的心里再也装不下一个家，做一个只对自己说谎的哑巴，他说
                            你任何为人称道的美丽，不及他第一次遇见你
                            时光苟延残喘无可奈何
                            如果所有屠刀连在一起， 走上一生只为去拥抱你
                            喝醉了他的梦， 晚安
                            油田他听见有人唱着古老的歌，唱着今天还在远方发生的
                            像在他眼里看到的古道，没有悲伤但也没有花朵
                            你在南方的艳阳里大雪纷飞， 我在北方的汗液里四季如春
                            如果天黑之前来得及， 我要忘了你的眼睛
                        </Text>
            </View>
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="联系人"
          icon={require('../images/phone.png')}
          onPress={this.select.bind(this, 'phonelist')}
          selected={this.state.tab == 'phonelist'}
          >
          <ScrollView>
            <Text style={styles.list}>
              <Text>唐三藏</Text>
              <Text>131-8904-9077</Text>
            </Text>
            <Text style={styles.list}>
              <Text>孙悟空</Text>
              <Text>131-8904-9077</Text>
            </Text>
            <Text style={styles.list}>
              <Text>猪八戒</Text>
              <Text>131-8904-9077</Text>
            </Text>
            <Text style={styles.list}>
              <Text>沙和尚</Text>
              <Text>131-8904-9077</Text>
            </Text>
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="动态"
          icon={require("../images/star.png")}
          onPress={this.select.bind(this, 'star')}
          selected={this.state.tab === 'star'}
          >
          <ScrollView style={styles.flex}>
            <Image style={{ width: width, height: height }}
              source={{ uri: 'https://vczero.github.io/ctrip/star_page.jpg' }}
              />
          </ScrollView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  message: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  message_title: {
    fontSize: 18,
    color: '#18B5FF',
    marginBottom: 5
  },
  list: {
    height: 30,
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10
  }
});


