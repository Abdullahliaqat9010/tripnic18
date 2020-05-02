const validateEmail = (email)=>{
    var regrex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
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

export {validateEmail,validateCreateUserForm,validatePhoneNumber,validatePhoneCode}