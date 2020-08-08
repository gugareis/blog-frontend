import ApiService from './apiservice'

class UserService extends ApiService {
    constructor(){
        super('/api')
    }
    auth(credenciais){
        return this.post('/authenticate',credenciais)
    }
    save(dados){
        return this.post('/newaccount',dados)
    }
    getUser(){
        return this.get('/user');
    }
}
export default UserService