import ApiService from './apiservice'

class UsuarioService extends ApiService {
    constructor(){
        super('/api')
    }
    auth(credenciais){
        return this.post('/authenticate',credenciais)
    }
    save(dados){
        return this.post('/newaccount',dados)
    }
}
export default UsuarioService