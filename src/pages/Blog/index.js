import React from 'react';

// import '../../styles/global.css'
import PostService from '../../services/postService'
import commentsService from '../../services/commentsService'
import { Link, withRouter } from "react-router-dom";


import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {FileUpload} from 'primereact/fileupload';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
export class Blog extends React.Component {

    constructor() {
        super();
        this.state = {
            postsList:[],
            commentsList:[],
            post:"",
            link:"",
            commentTupla:[],
            gridList:null,
            file:null
        };
        this.postService = new PostService();
        this.commentsServices = new commentsService();
        
        this.onClick = this.onClick.bind(this);
        // this.onUpload = this.onUpload.bind(this);
    }
    invoiceUploadHandler = ({files}) => {
        const [file] = files;
        this.setState({file:file});
        // const fileReader = new FileReader();
        // fileReader.onload = (e) => {
        //     this.uploadInvoice(e.target.result);
        // };
        // fileReader.readAsDataURL(file);
    };
    uploadInvoice = (invoiceFile) => {
        
    
        this.setState({file:invoiceFile});
    };
    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }
    addPost = () => {    
        const { post, link,file } = this.state;
        let data = new FormData();
        data.append('data', file);
        data.append('post', post);
        data.append('link', link);
        this.postService.save(data).then(data => {
            this.atualizaLista();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
                // showMessageError("Erro de Login",  erro.response.data.message)
            }
        })
    }
    atualizaLista = () =>{
        this.postService.getList().then(data => {
            if(data.data.length > 0){
                this.setState({postsList: data.data});
                this.getPostList();
            }else{
                this.setState({gridList:[]});
            }
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    componentDidMount() {
        this.postService.getList().then(data => {
            this.setState({postsList: data.data});
            this.getPostList();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    deleteComment = async (id) => {
        await this.commentsServices.erase(id).then(data => {
            this.atualizaLista();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    
    deletePost = async (id) => {
        await this.postService.erase(id).then(data => {
            this.atualizaLista();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    getPostList =  () => {
        const result = this.state.postsList.map((item, i) => {
            let list = [];
            
            const data =  this.commentsServices.getListByPostId(parseInt(item.id)).then(data => {
               list = data.data;
               let componetsGet = list.map((el) => {
                if(el.userId === item.userId){
                    return <p>{el.comments}
                            <Button label="Excluir" onClick={() => this.deleteComment(el.id)} icon="pi pi-times" className="p-button-secondary"/>
                        </p>
                }else{
                    return <p>{el.comments}</p>
                }
              }); 
              this.setState({componets:componetsGet});
           }).catch(erro => {
               if(erro != null && erro.response != null && erro.response.data != null){
                   console.log(erro.response)
                   this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Erro ao buscar commentários' });
               }
           })
           
           return (<Card footer={<span>   
                       <span className="p-float-label">
                           <InputText id="Comment" value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} />
                       </span>
                       <Button label="Adicionar commentário" onClick={() => this.addComment(item.id,this.state.comment)} icon="pi pi-check" style={{marginRight: '.25em'}}/>
                       <Button label="Excluir" onClick={() => this.deletePost(item.id)} icon="pi pi-times" className="p-button-secondary"/>
                   </span>} header={<img alt="Card" src={`data:image/jpeg;base64,${item.data}`}/>}>
                   
                   <br></br>
                   <h5>Post</h5>
                   <p>
                       {item.post}
                   </p>
                   <h5>Link</h5>
                   <p>
                       {item.link}
                   </p>
                   <h5>Comentários</h5>
                       {this.state.componets}
               </Card>);
        
        });
        this.setState({gridList:result});
    }
    addComment = (id,comment) =>{
        this.commentsServices.save({"postId":id,"comment":comment}).then(data => {
            this.atualizaLista();
        }).catch(erro => {
               if(erro != null && erro.response != null && erro.response.data != null){
                   console.log(erro.response)
                   this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Erro ao buscar commentários' });
               }
           })
    }
    getcommenttList =  (item) => {
        
    }
    
    render() {
        return (
            <>  <Messages ref={(el) => this.messages = el}></Messages>
                <div  className="container">
                    <Card title="Posts" >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bs-component">
                                    <div className="p-col-12 p-md-4">
                                        
                                        <label htmlFor="inputPost">Post </label>
                                        <span className="p-float-label">
                                            <InputText id="post" value={this.state.post} onChange={(e) => this.setState({post: e.target.value})} />
                                        </span>
                                        <br></br>
                                        <label htmlFor="inputPost">Link </label>
                                        <span className="p-float-label">
                                            <InputText id="link" value={this.state.link} onChange={(e) => this.setState({link: e.target.value})} />
                                        </span>
                                        <br></br>
                                        <FileUpload name="imagem"
                                            accept="image/*"
                                            customUpload={true}
                                            uploadHandler={this.invoiceUploadHandler}
                                            mode="basic"
                                            auto={true}
                                            chooseLabel="Upload image"/>
                                        <br></br>
                                        <div className="p-col-12 p-md-4">
                                            
                                            <Button  onClick={this.addPost} label='Adicionar post' icon="pi pi-plus" iconPos="right"></Button>
                                        </div>
                                    </div>
                                    
                                    
                                
                                </div>
                            </div>
                            
                        </div>
                    </Card>
                    {this.state.gridList}
                
                </div>
           </>
        );
    }
}
export default withRouter(Blog);
