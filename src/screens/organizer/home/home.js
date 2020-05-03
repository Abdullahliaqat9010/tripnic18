import React from 'react';
import { View, Text, Button } from 'react-native';
import { store } from '../../../redux/store';
import { signout } from '../../../redux/actions/auth_actions';
import { Toast } from '../../../components/styled_components';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
