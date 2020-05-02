const validateEmail = (email)=>{
    var regrex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
    return regrex.test(email)
}

export {validateEmail}