import React from 'react'
import {View,Text, FlatList,TouchableOpacity,StyleSheet,Dimensions,ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')

const TourCardMinified = ()=>{
    return(
        <TouchableOpacity 
            style={{
                flex:1,
                elevation:3,
                width:250,
                height:300,
                backgroundColor:"white",
                borderRadius:10
            }} 
            activeOpacity={0.9}
            >
            <ImageBackground 
                source={{uri:'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
                style={{width:250,height:180}}
                imageStyle={{borderTopLeftRadius:10,borderTopRightRadius:10}}
            >
                <View style={{flex:1,flexDirection:"row"}} >
                   
                    <View style={{padding:10,flex:1,alignItems:"flex-start",justifyContent:"flex-end"}} >
                        {   50 > 0 &&
                            <View style={{flexDirection:"row",borderRadius:5,width:100,alignItems:"center",justifyContent:"center",marginBottom:5,backgroundColor:"#2BB396"}} >
                                <Icon name="md-flame" size={25} color="white" />
                                <Text style={{marginLeft:5,color:"white",fontSize:20}} >{'50'+'% off'}</Text>
                            </View>
                        }
                    </View>
                    <View style={{ padding:10,flex:1,alignItems:"flex-end",justifyContent:"flex-end"}} >
                        <Icon onPress={()=>console.log("heart")} name="ios-heart" size={35} color="white" />
                    </View>
                </View>
            </ImageBackground>
            <View style={{flex:1,padding:10,justifyContent:"center"}} >
                <View style={{marginBottom:10}} >
                    <Text style={{fontSize:17,fontWeight:"bold"}} >Title testing for the long titles</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="ios-timer" size={15} />
                    <Text style={{marginLeft:5}} >{"5"+' days'}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="md-person" size={15} />
                    <Text style={{marginLeft:5}} >{'20'+' persons'}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <View style={{width:100,flexDirection:"row",alignItems:"center"}} >
                        <Icon name="ios-pricetag" size={15} />
                        <Text style={{marginLeft:5}} >{'Rs '+'2000'}</Text>
                    </View>
                    <View style={{flex:1}} >
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                            <Icon name="ios-star" size={15} color="#FDCC0D" />
                            <Text style={{paddingLeft:10,paddingRight:5,color:"#FDCC0D",fontSize:17}} >4.5</Text>
                            <Text style={{fontSize:15,color:"grey"}} >(3)</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

const HorizondalScrollItems = ()=>{
    return(
        <FlatList
            style={{paddingLeft:5,backgroundColor:"white"}}
            horizontal = {true}
            onEndReached={()=>console.log("end Reached")}
            onEndReachedThreshold={0.3}  
            ListFooterComponent={()=>{
                return(
                    <View style={{width:50}} />
                )
            }}     
            ItemSeparatorComponent={() => {
                return(
                <View style={{flex:1,width:20}} />
                )
            }}
            showsHorizontalScrollIndicator={false}
            data={[{title: 'Title Text', key: '1'},
                    {title: 'Title Text', key: '2'},
                    {title: 'Title Text', key: '3'},
                    {title: 'Title Text', key: '4'},
                    {title: 'Title Text', key: '5'},
                    {title: 'Title Text', key: '6'}
                    ]}
            renderItem={({item, index, separators}) => (
                <TourCardMinified />
            )}
            />
    )
}

const SearchBar = (props)=>{
    return(
        <View style={{width:width,height:80,alignItems:"center",justifyContent:"center"}} >
            <TouchableOpacity 
            onPress={()=>props.navigateToSearch()}
            activeOpacity={0.9}
            style={{
                width:width-40,
                height:50,
                alignItems:"flex-start",
                justifyContent:"center",
                borderRadius:5,
                elevation:5,
                backgroundColor:"white"
                }}>
                <View style={{flex:1,alignItems:"center",justifyContent:"flex-start",flexDirection:"row"}}>
                    <Icon  style={{paddingHorizontal:15}} name="ios-search" size={30} />
                    <Text style={{color:"#989595",fontSize:16}}>Search your favourite places</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    
    navigateToSearch = ()=>{
        this.props.navigation.navigate("Search")
    }

    render(){
        return(
            <>
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
                <FlatList
                    ListHeaderComponent={()=>{
                        return(
                            <SearchBar navigateToSearch={this.navigateToSearch} />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    data={[{title: 'Top Rated', key: '1'},
                            {title: 'Best Offers', key: '2'},
                            {title: 'Economical Trips', key: '3'},
                            ]}
                    renderItem={({item}) => (
                        <View >
                            <View style={{height:80,justifyContent:"center"}} >
                                <Text style={{paddingLeft:20,fontSize:30,fontWeight:"bold"}} >{item.title}</Text>
                            </View>
                            <View style={{height:310,justifyContent:"center"}} >
                                <HorizondalScrollItems/>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.key}
                    />
            </View>
            
            </>
        )
    }
}

const styles = StyleSheet.create({
    floatingButton:{
        //width: 60,  
        //height: 60,   
        //borderRadius: 30,            
        //backgroundColor: 'red',                                    
        //position: 'absolute',                                          
        //bottom: 100,                                                    
        //right: 10,
    }

})  