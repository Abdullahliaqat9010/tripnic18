import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()


const sendNotificationToOrganizer = (host_id:string,traveller_id:string,trip_id:string,trip_title:string)=>{
    
    const ref = admin.firestore().collection('organizers').doc(host_id).collection('notifications')
    const timestamp = new Date()
    return ref.add({
      timestamp:timestamp.getTime().toString(),
      traveller_id:traveller_id,
      trip_id:trip_id,
      title:trip_title,
      isResponded:false,
    })     
} 


const sendNotificationToTraveller = (traveller_id:string,trip_id:string,trip_title:string,response:boolean)=>{
    
    const ref = admin.firestore().collection('travellers').doc(traveller_id).collection('notifications')
    const timestamp = new Date()
    return ref.add({
      timestamp:timestamp.getTime().toString(),
      trip_id:trip_id,
      title:trip_title,
      accepted:response
    })     
}


exports.handleNotifications = functions.firestore.document('trips/{trip}').onUpdate(async(change,context)=>{
    const requestListBefore = change.before.data()?.requestedBy
    const requestListAfter = change.after.data()?.requestedBy
    const acceptedTravellersBefore = change.before.data()?.acceptedTravellers
    const acceptedTravellersAfter = change.after.data()?.acceptedTravellers
    const declinedTravellersBefore = change.before.data()?.declinedTravellers
    const declinedTravellersAfter = change.after.data()?.declinedTravellers
    const host_id = change.after.data()?.host
    const trip_id = change.after.id
    const title = change.after.data()?.title
    let newRequest = requestListAfter.filter((request:any)=>{
        return !requestListBefore.includes(request)
    })

    let newAccepted = acceptedTravellersAfter.filter((accepted:any)=>{
        return !acceptedTravellersBefore.includes(accepted)
    })

    let newDeclined = declinedTravellersAfter.filter((declined:any)=>{
        return !declinedTravellersBefore.includes(declined)
    })


    let promises:any = []

    newAccepted.forEach((accepted:any)=>{
        promises.push(sendNotificationToTraveller(accepted,trip_id,title,true))
    })
    newDeclined.forEach((declined:any)=>{
        promises.push(sendNotificationToTraveller(declined,trip_id,title,false))
    })
    newRequest.forEach((req:any) => {
        promises.push(sendNotificationToOrganizer(host_id,req,trip_id,title))
    });
    return Promise.all(promises).then(()=>{
        console.log(newRequest)
    }).catch((error)=>{
        console.log(error)
    })

})


exports.DeleteUser = functions.auth.user().onDelete(async(user)=>{
    const firestore = admin.firestore()
    if(user.customClaims && (user.customClaims as any).organizer !== null){
        const role = user.customClaims.organizer
        const batch = firestore.batch()
        const profileRef = firestore.collection(role?'organizers':'travellers').doc(user.uid)
        const notificationsRef = firestore.collection(role?'organizers':'travellers').doc(user.uid).collection('notifications')
        const notifications = await notificationsRef.get()
        notifications.docs.forEach((doc)=>batch.delete(notificationsRef.doc(doc.id)))
        batch.delete(profileRef)
        return batch.commit()
    }
    else
    return
})

exports.createNewUser = functions.https.onCall((data,context)=>{
    return new Promise(async(res,rej)=>{
        try {
            const uid = context.auth?.uid || "";
            const user = await admin.auth().getUser(uid)
            const phone = ""
            const photoUrl = user.photoURL?user.photoURL:"" 
            const role = data.userRole;
            const userProfile = data.userProfile;
            await grantRole(uid,role)
            await createUserProfile(role,uid,{...userProfile,phone,photoUrl})
            res()
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
})

function grantRole(uid:string,role:boolean): Promise<void>{
    return new Promise(async(res,rej)=>{
        try {
            const user = await admin.auth().getUser(uid);
            if(user.customClaims === undefined){
                await admin.auth().setCustomUserClaims(uid,{organizer:role})
                res()
            }
            else{
                rej({code:"role/denied",message:"Request Declined. There must be some problem with your account"})
            }
        } catch (error) {
            rej(error)
        }
    })
}



// function grantRole(uid:string,role:boolean): Promise<void>{
//     return new Promise(async(res,rej)=>{
//         try {
//             const user = await admin.auth().getUser(uid);
//             console.log(user.customClaims)
//             console.log(role)
//             if(user.customClaims && (user.customClaims as any).organizer !== undefined){
//                 rej({code:"role/denied",message:"Request Declined. There must be some problem with your account"})
//             }
//             else{
//                 await admin.auth().setCustomUserClaims(uid,{organizer:role})
//                 res()
//             }
//         } catch (error) {
//             rej(error)
//         }
//     })
// }

interface Profile{
    name:string, 
    email:string,
    city:string,
    gender:string,
    phone:string,
    photoUrl:string
}

function createUserProfile(role:boolean,uid:string,userProfile:Profile){
    const firestore = admin.firestore()
    if(role){    
        let organizerProfile:any
            organizerProfile = {
            name:userProfile.name,
            companyName:"",
            email:userProfile.email,
            city:userProfile.city,
            gender:userProfile.gender,
            phone:userProfile.phone,
            profilePicture:userProfile.photoUrl,
            ratings:0.0,
            about:"",
            socialLinks:{
                fb:"",
                instagram:"",
                twitter:"",
                youtube:""
            },
            completedTrips:0
        } 
        return firestore.collection('organizers').doc(uid).create(organizerProfile)
    }
    else{
        return firestore.collection('travellers').doc(uid).create(userProfile)
    }
    
}


exports.addNewTrip = functions.https.onCall((data,context)=>{
    const trip = {...data}
    if(context.auth === null){
        return Promise.reject("You are not authorized here")
    }
    return new Promise( async (res,rej)=>{
        try {
            const uid = context.auth?.uid || ""
            let rating = 0
            let isDiscounted = false
            if(trip.discount > 0){
                isDiscounted = true
            }
            let starting_Date = new Date(trip.start_date)
            starting_Date.setHours(0,0,0,0)
            let ending_Date = new Date(trip.end_date)
            ending_Date.setHours(0,0,0,0)
            const startingDate = starting_Date.getTime()
            const endingDate = ending_Date.getTime()
            let duration = Math.floor( (endingDate - startingDate)/(1000*60*60*24) )
            const ratingRef = admin.firestore().collection('organizers').doc(uid)
            const doc = await ratingRef.get()
            if(doc.exists){
            rating = doc.data()?.ratings
            }
            
            const batch = admin.firestore().batch()
            const tripRef = admin.firestore().collection('trips').doc()          
            const detailsRef = admin.firestore().collection('trips/'+tripRef.id+'/more_info').doc('details')
            
            batch.set(tripRef,{
            isDiscounted:isDiscounted,
            title:trip.title,
            thumbnail:trip.imageUrl,
            discount:trip.discount.toString(),
            price:trip.price.toString(),
            rating:rating,
            duration:duration.toString(),
            capacity:trip.capacity.toString(),
            host:uid,
            start_date:startingDate.toString(),
            likedBy:[],
            requestedBy:[],
            acceptedTravellers:[],
            declinedTravellers:[],
            searchTags:generateSearchTags(trip.title)
            })

            batch.set(detailsRef,{
                title:trip.title,
                from:trip.from,
                to:trip.to,
                thumbnail:trip.imageUrl,
                discount:trip.discount.toString(),
                duration:duration.toString(),
                description:trip.description,
                rating:rating,
                price:trip.price.toString(),
                start_date:startingDate.toString(),
                end_date:endingDate.toString(),
                food:trip.food,
                accomodation:trip.accomodation,
                conveyance:trip.conveyance,
                gender:trip.gender,
                pickup:trip.pickup,
                capacity:trip.capacity.toString(),
                schedule:trip.schedule
            })

            await batch.commit()
            res(tripRef.id)
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })    
})


const generateSearchTags = (title:string)=>{
    let lowerCase = title.toLowerCase()
    let garbage = ['or','on','the','top','of','then','over','above','to','and','days','month','day','1','2',
                   '3','4','5','6','7','8','9','10','week']
    let words = lowerCase.split(' ')
    const searchTags = words.filter((word)=>{
        return  !garbage.includes(word)
    })
    return searchTags
}

exports.updatePhoneNumber = functions.https.onCall((_data,context)=>{
    if(context.auth === null){
        return Promise.reject("You are not authorized here")
    }
    return new Promise(async(res,rej)=>{
        try {
            const uid = context.auth?.uid || ""
            const user = await admin.auth().getUser(uid);
            const isOrganizer = user.customClaims?.isOrganizer
            await admin.firestore().collection(isOrganizer?'organizers':'travellers').doc(uid).update({
                phone:user.phoneNumber
            })
            res()
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
})
