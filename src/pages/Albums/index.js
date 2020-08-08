import React from 'react';

// import '../../styles/global.css'
import AlbumsService from '../../services/albumService'
import { Link, withRouter } from "react-router-dom";
import AlbumsTables from './albumsTables'


import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {FileUpload} from 'primereact/fileupload';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
export class Albums extends React.Component {

    constructor() {
        super();
        this.state = {
            albumsList:[],
            file:null
        };
        this.albumsService = new AlbumsService();
        
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
    addAlbums = () => {    
        const { albums, link,file } = this.state;
        let data = new FormData();
        data.append('data', file);
        data.append('albums', albums);
        data.append('link', link);
        this.albumsService.save(data).then(data => {
            this.atualizaLista();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
                // showMessageError("Erro de Login",  erro.response.data.message)
            }
        })
        
    }
    atualizaLista = async () =>{
        await this.albumsService.getList().then(data => {
            if(data.data.length > 0){
                 
                let albums = data.data.map((el) => {
                    return <AlbumsTables Albuns={el} ChangePage={this.onPage}></AlbumsTables>
                }) 
                this.setState({albumsList: albums});
                this.getAlbumsList();
            }else{
                this.setState({albumsList:[]});
            }
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    componentDidMount() {
        this.albumsService.getList().then(data => {
            this.setState({albumsList: data.data});
            this.getAlbumsList();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
    }
    
    deleteAlbum = async (id) => {
        await this.albumsService.erase(id).then(data => {
            this.atualizaLista();
        }).catch(erro => {
            if(erro != null && erro.response != null && erro.response.data != null){
                console.log(erro.response)
                this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
        })
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
                                        
                                        <FileUpload name="imagem"
                                            accept="image/*"
                                            customUpload={true}
                                            uploadHandler={this.invoiceUploadHandler}
                                            mode="basic"
                                            auto={true}
                                            chooseLabel="Upload image"/>
                                        <br></br>
                                    </div>
                                    
                                    
                                
                                </div>
                            </div>
                            
                        </div>
                    </Card>
                
                    </div>
            <Card title="Lista de Albuns" >
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                               <AlbumsTables  Albuns={this.state} ChangePage={this.onPage}></AlbumsTables>  
                            </div>
                        </div>
                    </div>
                </Card>
                
           </>
        );
    }
}
export default withRouter(Albums);
