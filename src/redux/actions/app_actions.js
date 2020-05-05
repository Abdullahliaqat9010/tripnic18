import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import storage from '@react-native-firebase/storage'

const uploadImage = (path,filename)=>{
  return new Promise(async(res,rej)=>{
    try {
      const reference = storage().ref(filename);
      await reference.putFile(path)
      const downloadUrl = await reference.getDownloadURL()
      res(downloadUrl)
    } catch (error) {
      rej(error)
    }
  })
}

const addNewTrip = (trip)=>{
  return new Promise(async(res,rej)=>{
    try {
      const addTrip = functions().httpsCallable('addNewTrip')
      const trip_uid = (await addTrip({...trip,imageUrl:""})).data
      const imageUrl = await uploadImage(trip.path,trip_uid+'/'+trip.filename)
      //console.log(trip_uid)
      const tripRef = firestore().collection('trips').doc(trip_uid)
      const tripDetailsRef = firestore().collection('trips/'+trip_uid+'/more_info').doc('details')
      const batch = firestore().batch()
      batch.update(tripRef,{thumbnail:imageUrl})
      batch.update(tripDetailsRef,{thumbnail:imageUrl})
      await batch.commit()
      res()
    }
    catch (error) {
      rej(error.message)
    }
  })
}

const editTrip = (trip)=>{
  return new Promise(async(res,rej)=>{
    try {
      let imageUrl = ""
      if(trip.path !== 'notSelected'){
        console.log("testing123")
        imageUrl = await uploadImage(trip.path,trip.id+'/'+trip.filename)
      }
      const tripRef = firestore().collection('trips').doc(trip.id)
      const tripDetailsRef = firestore().collection('trips/'+trip.id+'/more_info').doc('details')
      const batch = firestore().batch()
      let duration = Math.floor( (trip.end_date - trip.start_date)/(1000*60*60*24) )
      batch.update(tripRef,{
        title:trip.title,
        thumbnail:imageUrl?imageUrl:trip.thumbnail,
        discount:trip.discount,
        price:trip.price,
        duration:duration,
        capacity:trip.capacity,
        start_date:trip.start_date
      })
      batch.update(tripDetailsRef,{
        title:trip.title,
        from:trip.from,
        to:trip.to,
        thumbnail:imageUrl?imageUrl:trip.thumbnail,
        discount:trip.discount,
        duration:duration,
        description:trip.description,
        price:trip.price,
        start_date:trip.start_date,
        end_date:trip.end_date,
        food:trip.food,
        accomodation:trip.accomodation,
        conveyance:trip.conveyance,
        gender:trip.gender,
        pickup:trip.pickup,
        capacity:trip.capacity,
        schedule:trip.schedule
      })
      await batch.commit()
      res()
    }
    catch (error) {
      rej(error.message)  
    } 
  })
}

const fetchTripDetials = (id)=>{
  return new Promise(async(res,rej)=>{
    try {
      //console.log(id)
      const tripDoc = await firestore().collection('trips/'+id+'/more_info').doc('details').get()
      if(tripDoc.exists){
        res(tripDoc.data())
      }
      else{
        rej("Trip has been deleted previously")
      }
    } 
    catch (error) {
      rej(error.message)
    }
  })
}

const fetchTrips = ()=>{
  return new Promise((res,rej)=>{
    try {
      auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = firestore().collection('trips').where('host','==',user.uid).limit(10)
          const snapshot = await tripRef.get()
          res(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))    
        }
        else{
          rej("You are not authorized here")
        }
      })
    } catch (error) {
      rej(error.message)
    }
  })
}

const deleteTrip = (id)=>{
  return new Promise(async(res,rej)=>{
    try {
      const docRef = firestore().collection('trips').doc(id)
      const detailsRef = firestore().collection('trips/'+id+'/more_info').doc('details')

      const batch = firestore().batch()
      batch.delete(detailsRef)
      batch.delete(docRef)

      await batch.commit()
      res()
    } catch (error) {
      rej(error.message)
    }
  })
}

const searchTripWithFilter = (query,filters)=>{
  return new Promise(async(res,rej)=>{
    let lowercase = query.toLowerCase()
    let searchTags = lowercase.split(" ")
    try {
      
      // const tripsRef = firestore().collection('trips').where('price','>','0').get()
      const tripsRef = firestore().collection('trips').where('searchTags','array-contains-any',searchTags).get()
      const trips = (await tripsRef).docs.map((doc)=>({...doc.data(),id:doc.id}))
      res(trips) 
    } catch (error) {
      
    }
  })
}

export {addNewTrip,fetchTrips,editTrip,fetchTripDetials,deleteTrip,searchTripWithFilter}