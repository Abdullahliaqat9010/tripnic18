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
      console.log(trip_uid)
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

export {addNewTrip,fetchTrips}