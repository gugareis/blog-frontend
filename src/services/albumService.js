import ApiService from './apiservice'

class AlbumsService extends ApiService {
    constructor(){
        super('/album')
    }
    getList(){
        return this.get('/list')
    }
    save(data){
        return this.post('/add',data)
    }
    erase(id){
        return this.delete('/delete/'+id)
    }
}
export default AlbumsService