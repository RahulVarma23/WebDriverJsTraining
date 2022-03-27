var credentials = function(){

    this.passwordValidation = function(password){
        if(password.length>=8 && password.length<=12){
            return 'Valid password'
        }else if(password.length<8){
            return 'Invalid password: password should be of minimum 8 characters'
        }else if(password.length>12){
            return 'Invalid password: password should be of maximum 12 characters'
        }
    }
}

module.exports = new credentials()