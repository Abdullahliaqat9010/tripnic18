const validateEmail = (email)=>{
    //var regrex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
    var regrex = /[\w-]+@([\w-]+\.)+[\w-]+/
    return regrex.test(email)
}

const validateCreateUserForm = (email,name,gender,city)=>{
    if(!validateEmail(email)){
        throw "Invalid or Empty email"
    }
    if(name === ""){
        throw "Cannot continue with empty name field"
    }
    if(gender === "Not Specified"){
        throw "Please select a gender"
    }
    if(city === "Not Specified"){
        throw "Please select a city"
    }
}

const validatePhoneNumber = (phone)=>{
    const regrex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
    const isValid = regrex.test(phone)
    if(!isValid){
        throw "Invalid or Empty Phone number"
    }
}

const validatePhoneCode = (code) =>{
    if(code.length < 6){
        throw "You must enter a 6 digit code"
    }
}

const validateCompanyInfo = (companyName,about) =>{
    if(companyName === ""){
        throw "You must enter a Company Name"
    }
    if(about === ""){
        throw "Write something about your company"
    }
}

const validateTripInfo = (trip) => {
    
    if(trip.start_date === null){
        throw "You must select a starting date for trip"
    }
    if(trip.end_date === null){
        throw "You must select a starting date for trip"
    }
    const date1 = new Date(trip.start_date)
    const date2 = new Date(trip.end_date)
    date2.setHours(0,0,0,0)
    date1.setHours(0,0,0,0)
    console.log(date1.getTime() > date2.getTime())
    if(date1.getTime() > date2.getTime()){
        throw "Start date cannot come after End date."
    }
    if(trip.title === ""){
        throw "You must enter a title for trip"
    }
    if(trip.path === ""){
        throw "Select at least one image for trip thumbnail"
    }
    if(trip.to === "Not specified"){
        throw "Select destination of trip"
    }
    if(trip.from === "Not specified"){
        throw "Please specify the starting point of trip"
    }
    if(trip.description === ""){
        throw "Please add description of trip"
    }
    if(trip.price === 0){
        throw "Please add price of your trip"
    }
    if(trip.capacity === 0){
        throw "Please specify a capacity greater than zero"
    }
   
}

export {validateTripInfo,validateEmail,validateCreateUserForm,validatePhoneNumber,validatePhoneCode,validateCompanyInfo}