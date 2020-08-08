import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import UserService from '../../services/userServices' 

import Logo from "../../assets/images/logoBlog2.png";

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';

// import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    userName: "",
    name: "",
    email: "",
    password: "",
    error: ""
  };
  constructor(props){
    super(props);
    this.service = new UserService();
  }
  handleSignUp = async e => {
    e.preventDefault();
    const { name, userName, email, password } = this.state;
    if (!name ||!userName || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
     
      this.service.save({ name,userName, email, password }).then(response =>{
      
        this.props.history.push("/");
      }).catch(erro => {
          if(erro != null && erro.response != null && erro.response.data != null){
              console.log(erro)
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
          }
      })
    }
  };

  render(){
    return (
        <div className="fundao">
            <div className="container" style={{  boxShadow: 'rgba(0,0,0,0.3)',
                                                opacity: '0.9',
                                                position: 'relative',
                                                marginRight: 'auto',
                                                marginLeft: 'auto' }}>
                <div className="row"  >
                    <div className="col-md-4" ></div>
                    <div className="col-md-4" >
                        <div style={{ width: '100%',backgroundColor : '#ffffff'}}>
                                <div className="row">
                                    <span>{this.state.mensagemErro}</span>
                                </div>
                                <div className="wrapper fadeInDown" 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column', 
                                            justifyContent: 'center',
                                            width: '100%',
                                            minHeight: '100%',
                                            padding: '20px'
                                        }}
                                >
                                    <div id="formContent" style={{

                                            borderRadius: '10px 10px 10px 10px',
                                            backgroundColor: '#fff',
                                            width: '90%',
                                            maxWidth: '450px',
                                            position: 'relative',
                                            padding: '0px',
                                            boxShadow: '0 30px 60px 0 rgba(0,0,0,0.3)',
                                            textAlign: 'center'
                                        }}>
                                        <div className="fadeIn first">
                                        <img src={Logo} id="icon" alt="User Icon" />
                                        </div>
                                        <InputText id="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} 
                                                    placeholder="Nome completo"/>                                    
                                        <br></br>                                  
                                        <br></br><InputText id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} 
                                                    placeholder="E-mail"/>                                    
                                        <br></br>                                  
                                        <br></br>
                                        <InputText id="userName" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} 
                                                    placeholder="Nome do usuário"/>                                    
                                        <br></br>                                  
                                        <br></br>
                                        <Password id="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} 
                                                    placeholder="Password"/>
                                        <br></br>                                  
                                        <br></br>                                       
                                        <Button label="Cadastrar" onClick={this.handleSignUp}  />                                 
                                            
                                        <br></br>
                                        <br></br> 
                                    </div>
                                </div>
                          </div>                        
                      </div>
                      <div className="col-md-4" ></div>
                  </div>
              </div>
          </div>
      )
  }
  
}

export default withRouter(SignUp);