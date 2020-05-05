import React from 'react'
import {View,Text, Modal, TouchableOpacity,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {StyledDatePicker, StyledButton} from '../../../components/styled_components'

const {width} = Dimensions.get('window')

const SortByItem = ({index,active,type,makeSelection})=>{
    return(
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{
                makeSelection(index)
            }}                 
        >
            <View style={{
                    height:45,
                    width:width,
                    alignItems:"center",
                    paddingHorizontal:20,
                    flexDirection:"row",
                    borderBottomWidth:1,
                    borderBottomColor:"#D4CFCF"

                }}  
            >
                <Icon name={
                    type==="Increasing Prices"?"ios-trending-up":
                    type==="Decreasing Prices"?"ios-trending-down":
                    "ios-star"
                } size={25} color={active?"#2BB598":"black"} />
                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}} >
                    <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}} >
                        <Text style={{width:300,fontSize:18,color:active?"#2BB598":"black"}} >{type}</Text>
                    </View>
                    {
                     active &&   
                    <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                        <Icon name="ios-checkmark-circle-outline" size={25} color="#2BB598" />
                    </View>
                    }
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

const PriceRange = ({setPriceRange,defaultPrice})=>{
    
    
    return(
        
            <View style={{
                    height:45,
                    width:width,
                    alignItems:"center",
                    paddingHorizontal:20,
                    flexDirection:"row",
                    borderBottomWidth:1,
                    borderBottomColor:"#D4CFCF"

                }}  
            >
                <Icon name="logo-bitcoin"
                 size={25} color="#2BB598" />
                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}} >
                    <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}} >
                        <Text style={{fontSize:18,color:"#2BB598"}} >Price Range</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}} >
                        <Text>Rs</Text>
                        <TextInput placeholder="2000" defaultValue={defaultPrice.lower!==0?`${defaultPrice.lower}`:undefined} maxLength={5} onChangeText={(lower)=>{
                            
                            setPriceRange(lower,defaultPrice.upper)
                        }}  />
                        <Text style={{paddingHorizontal:10,fontSize:10,color:"#2BB598"}} >to</Text>
                        <Text>Rs</Text>
                        <TextInput placeholder="5000" defaultValue={defaultPrice.upper!==0?`${defaultPrice.upper}`:undefined} maxLength={5} onChangeText={(upper)=>{
                            
                            setPriceRange(defaultPrice.lower,upper)
                        }} />
                    </View>
                </View>      
            </View>
    )
}

const StartingFrom = ({setStartingFrom,defualtStarting})=>{
    return(
        
            <View style={{
                    height:45,
                    width:width,
                    alignItems:"center",
                    paddingHorizontal:20,
                    flexDirection:"row",
                    borderBottomWidth:1,
                    borderBottomColor:"#D4CFCF"

                }}  
            >
                <Icon name="ios-calendar"
                 size={25} color="#2BB598" />
                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}} >
                    <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}} >
                        <Text style={{fontSize:18,color:"#2BB598"}} >Starting From</Text>
                    </View>
                   <StyledDatePicker
                    defaultDate={defualtStarting}
                    onChangeDate={(date)=>{
                       setStartingFrom(date)
                   }} />
                </View>      
            </View>
    )
}

const TripDuration = ({setTripDuration,defaultDuration})=>{
    return(
        
            <View style={{
                    height:45,
                    width:width,
                    alignItems:"center",
                    paddingHorizontal:20,
                    flexDirection:"row",
                    borderBottomWidth:1,
                    borderBottomColor:"#D4CFCF"

                }}  
            >
                <Icon name="md-time"
                 size={25} color="#2BB598" />
                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}} >
                    <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}} >
                        <Text style={{fontSize:18,color:"#2BB598"}} >Trip Duration</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}} >  
                        <TextInput placeholder="2" maxLength={3} style={{fontSize:15}} 
                        defaultValue={defaultDuration!==0?`${defaultDuration}`:undefined}
                        onChangeText={(duration)=>{
                            setTripDuration(duration)
                        }} />   
                        <Text style={{paddingHorizontal:10,fontSize:15,color:"grey"}} >days</Text>
                    
                    </View>
                </View>      
            </View>
    )
}



const HeaderElement = ({closeModal,clearFilter})=>{
    return(
        <View style={{elevation:4,height:56,flexDirection:"row",alignItems:"center",paddingHorizontal:15,backgroundColor:"white"}} >
            <View style={{flex:1,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}} >
                <Icon
                    name="ios-close" 
                    size={35} 
                    onPress={()=>closeModal()}
                />
                <Text style={{paddingLeft:20,fontSize:20,fontWeight:"700"}} >Filter</Text>
            </View>
            <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}} >
                <TouchableOpacity
                    onPress={()=>clearFilter()}
                >
                    <Text style={{fontSize:20,color:"#2BB598",fontWeight:"bold"}} >Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const HeadingElement = ({title})=>{
    return(
        
            <View style={{
                    height:50,
                    width:width,
                    backgroundColor:"#E9E5E5",
                    alignItems:"flex-start",
                    justifyContent:"center",
                    paddingLeft:20,
                    opacity:0.5
                }} 
                    >
                <Text style={{fontSize:15,fontWeight:"bold",color:"#989595"}} >{title}</Text>
            </View>
        
    )
}

const Filter = ({
            isFilterModalOpen,closeModal,
            setSortIndex,
            defaultSort,
            setPrice,
            defaultPrice,
            setStarting,
            defualtStarting,
            setDuration,
            defaultDuration
        })=>{
        
        const clearFilter = ()=>{
            setSortIndex(0)
            setPrice(0,0)
            setStarting(new Date())
            setDuration(0)
        }
        const makeSelection = (i)=>{
            setSortIndex(i)
        }

        const selectRange = (lower,upper)=>{
            setPrice(lower,upper)
        }

        const selectStartingDate = (date)=>{
            setStarting(date)
        }

        const selectDuration = (duration)=>{
            setDuration(duration)
        }

        return(
            <Modal visible={isFilterModalOpen}>
                
                <View style={{flex:1}} >
                    <HeaderElement closeModal={closeModal} clearFilter={clearFilter} />
                    <HeadingElement title="Filters" />
                    <PriceRange defaultPrice={defaultPrice} setPriceRange={selectRange} />
                    <StartingFrom defualtStarting={defualtStarting} setStartingFrom={selectStartingDate} />
                    <TripDuration defaultDuration={defaultDuration} setTripDuration={selectDuration} />
                    <HeadingElement title="Sort By" />
                    <SortByItem makeSelection={makeSelection} index={0} active={defaultSort===0} type="Increasing Prices" />
                    <SortByItem makeSelection={makeSelection} index={1} active={defaultSort===1} type="Decreasing Prices" />
                    <SortByItem makeSelection={makeSelection} index={2} active={defaultSort===2} type="Top Rated Offers" />
                    <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",marginBottom:50}} >
                        <StyledButton title="Apply Filter" roundEdged width={150} fontSize={20} 
                            onPress={()=>{
                                closeModal()
                            }}
                        />
                    </View>
                </View>
                
            </Modal>
        )
    
} 

export default Filter