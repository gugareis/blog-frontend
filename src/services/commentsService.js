import ApiService from './apiservice'

class ComentsService extends ApiService {
    constructor(){
        super('/comment')
    }
    getList(){
        return this.get('/list')
    }
    getListByPostId(id){
        return this.get('/list/'+id)
    }
    save(data){
        return this.post('/add',data)
    }
    erase(id){
        return this.delete('/delete/'+id)
    }
}
export default ComentsService