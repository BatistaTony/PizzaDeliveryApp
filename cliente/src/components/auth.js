

class Auth {

    constructor(){
        this.iduser = ''
        this.logged = false
    }

    login(id,cb){
        this.iduser  = id
        this.logged = true
        cb()
    }

    showUser(){
        return this.iduser
    }


    logout(cb){
        this.iduser = ''
        this.logged = false
        cb()
    }


    islogged(){
        return this.logged
    }


}


export default new Auth()