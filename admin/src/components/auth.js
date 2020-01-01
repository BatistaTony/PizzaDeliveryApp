
class Auth {

    constructor(){
        this.authenticated = false;
    }


    login(cb){
        
       cb()
       this.authenticated = true;
    }

    logout(cb){
        this.authenticated = false;
        cb()
    }

    isAuthenticated(){
        return this.authenticated
    }


}

export default new  Auth()