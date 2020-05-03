import React from 'react';
<<<<<<< HEAD
import { View, Text, Button } from 'react-native';
import { store } from '../../../redux/store';
import { signout } from '../../../redux/actions/auth_actions';
import { Toast } from '../../../components/styled_components';
=======
import {View, Text, Button} from 'react-native';
import {store} from '../../../redux/store';
import {signout} from '../../../redux/actions/auth_actions';
import {Toast} from '../../../components/styled_components';
>>>>>>> 5b8a8b573e8761564540c7017ca77ff7629e6efb

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
<<<<<<< HEAD
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
=======
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
>>>>>>> 5b8a8b573e8761564540c7017ca77ff7629e6efb
        <Button
          title="logout"
          onPress={async () => await store.dispatch(signout())}
        />
        {/* <Button title ="show" onPress={()=>this.setState({visible:true})} /> */}
        <Toast visible={this.state.visible} message="Netword Failure" />
        <Text>Home</Text>
      </View>
    );
  }
}
<<<<<<< HEAD
=======
abc;
>>>>>>> 5b8a8b573e8761564540c7017ca77ff7629e6efb
