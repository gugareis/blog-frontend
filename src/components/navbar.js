import React from 'react'
import {withRouter} from 'react-router-dom'
import NavBarItem from './navBarItem'
import {logout} from '../services/auth';
import { isAuthenticated } from "../services/auth";

class NavBar extends React.Component{
    state = {
      ItensNavbar : null
    } 
    
    componentDidMount() {
      var item = [{"descricao":"BLog",
                  "modulo":"bLog"},
                  {"descricao":"Posts",
                  "modulo":"posts"},
                  {"modulo":"albums",
                    "descricao":"Albuns"} 
                  ];
      
      if(item != null){
        let modulos = item.map((el) => {
          let link=`/#/${el.modulo}`;
          return <NavBarItem href={link} label={el.descricao}></NavBarItem>
        }) 
        this.setState({ItensNavbar : modulos})
      }else{        
        this.props.history.push("login");
      }
    }
    logout = () =>{
      logout();
      this.props.history.push("/");
    }
    render(){
      if(isAuthenticated){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-primary" style={{marginTop:"-120px"}}>
            <div className="container" style={{  boxShadow: 'rgba(0,0,0,0.3)',
                                                    opacity: '0.95'}}>
              <a  href="home.html" 
                  className="navbar-brand" >Blog</a>
              <button className="navbar-toggler" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target="#navbarResponsive" 
                      aria-controls="navbarResponsive" 
                      aria-expanded="false" 
                      aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div  className="collapse navbar-collapse" 
                    id="navbarResponsive">
                <ul className="navbar-nav mr-auto">
                  {this.state.ItensNavbar}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button className="btn btn-primary my-2 my-sm-0" onClick={this.logout}>Sair</button>
                </form>
        
              </div>
            </div>
          </div>
        )
      }
   }
}
export default withRouter (NavBar)