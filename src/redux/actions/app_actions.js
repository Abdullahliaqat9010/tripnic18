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
        discount:trip.discount.toString(),
        price:trip.price.toString(),
        duration:duration.toString(),
        capacity:trip.capacity.toString(),
        start_date:trip.start_date.toString()
      })
      batch.update(tripDetailsRef,{
        title:trip.title,
        from:trip.from,
        to:trip.to,
        thumbnail:imageUrl?imageUrl:trip.thumbnail,
        discount:trip.discount.toString(),
        duration:duration.toString(),
        description:trip.description,
        price:trip.price.toString(),
        start_date:trip.start_date.toString(),
        end_date:trip.end_date.toString(),
        food:trip.food,
        accomodation:trip.accomodation,
        conveyance:trip.conveyance,
        gender:trip.gender,
        pickup:trip.pickup,
        capacity:trip.capacity.toString(),
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
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = firestore().collection('trips').where('host','==',user.uid).limit(10)
          const snapshot = await tripRef.get()
          unsubscribe()
          res(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))    
        }
        else{
          unsubscribe()
          rej("You are not authorized here")
        }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const fetchTopRated = ()=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = firestore().collection('trips').orderBy('rating').limit(10)
          const snapshot = await tripRef.get()
          unsubscribe()
          res(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))    
        }
        else{
          unsubscribe()
          rej("You are not authorized here")
        }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const fetchBestOffers = ()=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = firestore().collection('trips').orderBy('discount').limit(10)
          const snapshot = await tripRef.get()
          unsubscribe()
          res(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))    
        }
        else{
          unsubscribe()
          rej("You are not authorized here")
        }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const fetchEconomical = ()=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = firestore().collection('trips').where('price','<=','5000').orderBy('price').limit(10)
          const snapshot = await tripRef.get()
          unsubscribe()
          res(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))    
        }
        else{
          unsubscribe()
          rej("You are not authorized here")
        }
      })
    } catch (error) {
      unsubscribe()
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
      let tripsRef = firestore().collection('trips').where('searchTags','array-contains-any',searchTags)
      console.log(filters)
      if(filters.priceRange.lower > "0" || filters.priceRange.upper > "0"){
        if(filters.priceRange.lower < filters.priceRange.upper){
          tripsRef = tripsRef.where('price','>=',filters.priceRange.lower.toString())
          .where('price','<=',filters.priceRange.upper.toString())
        }
        else{
          rej("invalid price range 1")
        }
      }
      else{
        if(filters.priceRange.lower !== "0" && filters.priceRange.upper !== "0" )
        rej("invalid price range 2")
      }
      if(filters.startingFrom !== null){
        let startingDate = new Date(filters.startingFrom)
        startingDate.setHours(0,0,0,0)
        startingDate = startingDate.getTime()
        let today = new Date()
        today.setHours(0,0,0,0)
        today = today.getTime()
        if (startingDate !== today){
          tripsRef = tripsRef.where('start_date','==',startingDate.toString())
        }
      }
      if(filters.tripDuration > "0"){
        tripsRef = tripsRef.where('duration','==', filters.tripDuration.toString())
      }
      if(filters.sortBy === 0){
        tripsRef = tripsRef.orderBy('price','asc')
      }
      else if(filters.sortBy === 1){
        tripsRef = tripsRef.orderBy('price','desc')
      }
      else if(filters.sortBy === 2){
        tripsRef = tripsRef.orderBy('price','asc').orderBy('rating','desc')
      }
      tripsRef = tripsRef.get()
      const trips = (await tripsRef).docs.map((doc)=>({...doc.data(),id:doc.id}))
      res(trips) 
    } catch (error) {
      console.log(error)
      rej(error.message)
    }
  })
}

const addTripRequest = (id)=>{
  return new Promise((res,rej)=>{
    try {
      console.log(id)
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
       if(user){
          const tripRef = firestore().collection('trips').doc(id)
          await tripRef.update({
            requestedBy:firestore.FieldValue.arrayUnion(user.uid)
          })
          unsubscribe()
          res()
       }
       else{
         unsubscribe()
         rej("you are not authorized")
       }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const cancelTrip = (id)=>{
  return new Promise((res,rej)=>{
    try {
      console.log(id)
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
       if(user){
          const tripRef = firestore().collection('trips').doc(id)
          await tripRef.update({
            requestedBy:firestore.FieldValue.arrayRemove(user.uid),
            acceptedTravellers:firestore.FieldValue.arrayRemove(user.uid)
          })
          unsubscribe()
          res()
       }
       else{
         unsubscribe()
         rej("you are not authorized")
       }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}


const likeTrip = (id)=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
       if(user){
          const tripRef = firestore().collection('trips').doc(id)
          await tripRef.update({
            likedBy:firestore.FieldValue.arrayUnion(user.uid)
          })
          unsubscribe()
          res()
       }
       else{
         unsubscribe()
         rej("you are not authorized")
       }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const unlikeTrip = (id)=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
       if(user){
          const tripRef = firestore().collection('trips').doc(id)
          await tripRef.update({
            likedBy:firestore.FieldValue.arrayRemove(user.uid)
          })
          unsubscribe()
          res()
       }
       else{
         unsubscribe()
         rej("you are not authorized")
       }
      })
    } catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}

const isRequested = (id)=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = await firestore().collection('trips').doc(id).get()
          if(tripRef.exists){
            const requestedByList = tripRef.data().requestedBy
            if(requestedByList.includes(user.uid)){
              unsubscribe()
              res(true)
            }
            else{
              unsubscribe()
              res(false)
            }
          }
          else{
            unsubscribe()
            rej("your requested has been deleted")
          }
          
        } 
        else{
          unsubscribe()
          rej("you are not authorized here")
        }
      })
    } 
    catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}


const isTripLiked = (id)=>{
  return new Promise((res,rej)=>{
    try {
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          const tripRef = await firestore().collection('trips').doc(id).get()
          if(tripRef.exists){
            const likedByList = tripRef.data().likedBy
            if(likedByList.includes(user.uid)){
              unsubscribe()
              res(true)
            }
            else{
              unsubscribe()
              res(false)
            }
          }
          else{
            unsubscribe()
            rej("your requested has been deleted")
          }
          
        } 
        else{
          unsubscribe()
          rej("you are not authorized here")
        }
      })
    } 
    catch (error) {
      unsubscribe()
      rej(error.message)
    }
  })
}


export {addNewTrip,fetchTrips,editTrip,fetchTripDetials,deleteTrip,searchTripWithFilter,addTripRequest,likeTrip,unlikeTrip,cancelTrip,isRequested,isTripLiked,fetchTopRated,fetchBestOffers,fetchEconomical}