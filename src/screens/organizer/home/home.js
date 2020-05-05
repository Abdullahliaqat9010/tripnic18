/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {store} from '../../../redux/store';
import {signout} from '../../../redux/actions/auth_actions';
import {Toast} from '../../../components/styled_components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from 'react-native-vector-icons/Fontisto';

const image = require('./photo.png');
const image2 = require('./photo2.png');

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      reviews: [
        {key: 1, Name: 'Zahan1'},
        {key: 2, Name: 'Zahan2'},
        {key: 3, Name: 'Zahan3'},
        {key: 4, Name: 'Zahan4'},
        {key: 5, Name: 'Zahan5'},
        {key: 6, Name: 'Zahan6'},
      ],
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView>
          <View style={{width: width, height: height * 0.45}}>
            <ImageBackground
              source={image}
              style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 40,
                    fontFamily: 'notoserif',
                    paddingLeft: 30,
                  }}>
                  Company Name
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                  paddingLeft: 25,
                  paddingTop: 10,
                  marginBottom: -5,
                }}>
                <View>
                  <Icon
                    name="star"
                    size={25}
                    color="gold"
                    style={{paddingTop: 2}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'gold',
                      fontSize: 22,
                      paddingLeft: 10,
                    }}>
                    4.8
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      paddingLeft: 10,
                    }}>
                    (10)
                  </Text>
                </View>
              </View>
              <View style={{flex: 0.7, paddingLeft: 30, marginBottom: -20}}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 110,
                    width: 110,
                    borderRadius: 20,
                  }}
                  source={image2}
                />
                <Text style={{color: 'white', fontSize: 23, paddingTop: 2}}>
                  Some Name
                </Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingTop: 5,
                }}>
                <View>
                  <EmailIcon
                    name="email"
                    size={17}
                    color="white"
                    style={{paddingTop: 2}}
                  />
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: 14, paddingLeft: 5}}>
                    21100213@lums.edu.pk
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{}}>
            <View style={{flex: 0.35}}>
              <View style={{paddingTop: 25, paddingLeft: 30}}>
                <Text style={{color: '#707070', fontSize: 27}}>
                  Completed Tours
                </Text>
              </View>
              <View style={{paddingLeft: 30}}>
                <Text style={{color: '#000', fontSize: 27}}>5</Text>
              </View>
            </View>
            <View style={{paddingTop: 25}}>
              <View style={{paddingTop: 0, paddingLeft: 30, marginBottom: -20}}>
                <Text style={{color: '#707070', fontSize: 27}}>Reviews</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  margin: 5,
                }}>
                {this.state.reviews.map((item) => {
                  return (
                    <View key={item.key}>
                      <View
                        style={{
                          marginTop: 24,
                          paddingVertical: 20,
                          paddingLeft: 22,
                          backgroundColor: 'white',
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.23,
                          shadowRadius: 2.62,

                          elevation: 4,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 0.95}}>
                            <Text style={{fontSize: 23, fontWeight: '700'}}>
                              Some Name
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View>
                              <Icon
                                name="star"
                                size={22}
                                color="gold"
                                style={{paddingTop: 1}}
                              />
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: 'gold',
                                  fontSize: 20,
                                  paddingLeft: 3,
                                }}>
                                4.8
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                          <View>
                            <Text style={{fontSize: 17}}>Review of : </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: '600',
                                fontStyle: 'italic',
                              }}>
                              Trip to MURREE
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={{fontSize: 15}}>14 August 1947</Text>
                        </View>
                        <View style={{paddingTop: 15, paddingRight: 20}}>
                          <Text>
                            They didn't compromise on the quality of the Tour.
                            1. Best Bus Service. 2. Best Management. 3. Best
                            Hotel. 4. Best Food. Love the owner of the company
                            and will recommend them definitely.
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//   <Button
//     title="logout"
//     onPress={async () => await store.dispatch(signout())}
//   />
//   {/* <Button title ="show" onPress={()=>this.setState({visible:true})} /> */}
//   <Toast visible={this.state.visible} message="Netword Failure" />
//   <Text>Home</Text>
// </View>; */}
