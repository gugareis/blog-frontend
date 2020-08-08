import ApiService from './apiservice'

class PostService extends ApiService {
    constructor(){
        super('/post')
    }
    getList(){
        return this.get('/list')
    }
    save(data){
        return this.postFormData('/add',data)
    }
    erase(id){
        return this.delete('/delete/'+id)
    }
}
export default PostService