import React from 'react'
import {View,Text,TouchableOpacity,FlatList,Dimensions,Image,TextInput} from 'react-native'
import Filter from './filter'
import {searchTripWithFilter} from '../../../redux/actions/app_actions'
import Icon from 'react-native-vector-icons/Ionicons'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import {Toast} from '../../../components/styled_components'


const {width} = Dimensions.get('window')

const CustomSearchBar = ({setQuery,searchTrip})=>{
    return(
        <View style={{flexDirection:"row",alignItems:"flex-end"}} >
            <TextInput 
                style={{
                    fontSize:15,
                    textAlignVertical:"bottom",
                    paddingVertical:10,
                    borderBottomWidth:1
                }}  
                placeholder="Search for your favourite places in Pakistan" 
                onChangeText={(t)=>setQuery(t)}
                onSubmitEditing={()=>{
                    searchTrip()
                }}
                returnKeyType="search"
            />
            <Icon 
                style={{marginLeft:10}}  
                name="ios-search" 
                size={30} 
                onPress={()=>{
                    searchTrip()
                }}
                />
        </View>
    )
}

const Search = ({navigation}) => {
    
    const [isFilterModalOpen,setFilterModal] = React.useState(false)
    const [sortBy,setSortBy] = React.useState(0)
    const [priceRange,setPriceRange] = React.useState({lower:"0",upper:"0"})
    const [startingFrom, setStartingFrom] = React.useState(null)
    const [tripDuration,setTripDuration] = React.useState("0")
    const [trips,setTrips] = React.useState([])
    const [placeholder,setPlaceholder] = React.useState("")
    const [query,setQuery] = React.useState("")
    const [isSearching,setSearching] = React.useState(false)
    const [msg,setMsg] = React.useState("")
    const [toggleToast,setToggleToast] = React.useState(false)
    
    
    const makeSelection = (i)=>{
        setSortBy(i)
    }

    const selectRange = (lower,upper)=>{
        setPriceRange({lower,upper})
    }

    const selectStartingDate = (date)=>{
        setStartingFrom(date)
    }

    const selectDuration = (duration)=>{
        setTripDuration(duration)
    }
    
    const openFilterModal = ()=>{
        setFilterModal(true)
    }
    const closeFilterModal = ()=>{
        setFilterModal(false)
    }

    const searchTrip = async()=>{
        try {
            if(query === "")
            return
            setSearching(true)
            const t = await searchTripWithFilter(query,{sortBy,priceRange,startingFrom,tripDuration})
            setSearching(false)
            setTrips(t)
            if(t.length > 0){
                setPlaceholder("Search Result for "+query)
            }
            else{
                setPlaceholder("No result found for "+query)
            }
            //console.log(t) 
        } catch (error) {
            setMsg(error)
            setSearching(false)
            setToggleToast(true)
        }
    }

    React.useEffect(()=>{
        if(toggleToast){
            setToggleToast(false)
        }
    },[toggleToast])

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>{
                    openFilterModal()
                }}
            >
                <Text style={{fontSize:20,color:"#2BB598",paddingRight:20,fontWeight:"bold"}} >Filter</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation ]);
    
        return(
            <View style={{flex:1,backgroundColor:"white"}}>
               
                <FlatList
                    contentContainerStyle={{alignItems:"center"}}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{height:10}} />
                        )
                    }}
                    ListFooterComponent={()=>{
                        return(
                            <View style={{height:100}} />
                        )
                    }}
                    data={trips}
                    ListHeaderComponent={
                            <View style={{width:width,height:120,alignItems:"center",justifyContent:"center"}} >
                                <CustomSearchBar setQuery={setQuery}  searchTrip={searchTrip} />

                                <View style={{width:width, alignItems:"center",justifyContent:"center",marginVertical:15}} >
                                    {
                                        isSearching?
                                        <ProgressBarAndroid styleAttr="Small" />:
                                        <Text style={{color:"#707070",}} >{placeholder}</Text>                              
                                    }
                                </View>
                            </View>
                        }

                        renderItem={(item)=>{
                            const trip = item.item
                            return(
                                <TouchableOpacity 
                                onPress={()=>{
                                    navigation.navigate("Preview",{id:trip.id})
                                }}
                            
                                activeOpacity={0.9}
                                style={{
                                    width:width-20,
                                    height:150,
                                    backgroundColor:"white",
                                    borderRadius:10,
                                    elevation:5,
                                    flexDirection:"row"
                                    }} >
                                
                                    <Image
                                        source={{uri:trip.thumbnail}}
                                        style={{flex:4,borderBottomLeftRadius:10,borderTopLeftRadius:10}}
                                    />
                            
                                <View style={{flex:3,paddingHorizontal:10,justifyContent:"center"}} >
                                    <Text style={{fontSize:17,fontWeight:"bold",marginBottom:10}} >{trip.title}</Text>
                                    <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                                        <Icon name="ios-timer" size={15} />
                                        <Text style={{marginLeft:5}} >{trip.duration+' days'}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                                        <Icon name="md-person" size={15} />
                                        <Text style={{marginLeft:5}} >{trip.capacity+' persons'}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                                        <Icon name="ios-pricetag" size={15} />
                                        <Text style={{marginLeft:5}} >{'Rs '+trip.price}</Text>
                                    </View>
                                    {   trip.discount > 0 &&
                                        <View style={{flexDirection:"row",borderRadius:5,alignItems:"center",justifyContent:"center",marginBottom:5,backgroundColor:"#2BB598"}} >
                                            <Icon name="md-flame" size={15} color="white" />
                                            <Text style={{marginLeft:5,color:"white"}} >{trip.discount+'% off'}</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                />
                <Filter 
                    isFilterModalOpen={isFilterModalOpen} 
                    closeModal={closeFilterModal}
                    setSortIndex = {makeSelection}
                    defaultSort = {sortBy}
                    setPrice = {selectRange}
                    defaultPrice = {priceRange}
                    setStarting = {selectStartingDate}
                    defualtStarting = {startingFrom}
                    setDuration = {selectDuration}
                    defaultDuration = {tripDuration}
                />
                <Toast message={msg} visible={toggleToast} />
            </View>
        )
    
} 

export default Search