import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios'
import Indexs from './calendrier/Indexs.js'
import { NavLink } from 'react-router-dom';


class GestionSaison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lire: false,
            saison: [],
            
        }
    }
    componentDidMount() {
        this.getSaison();
       
    }

    getSaison = () => {
        axios.get('/saisons').then(response => {
            if (response.status === 200) {
                this.setState({
                    saison: response.data

                })
                
            }
        })
    }

   

    render() {
        

        
        return (
            <>

                <div>
                    <br/>
                    <NavLink to="/configuration_agence" >
                        <button class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                    </NavLink>
                    <center>
                        <h1>Gestion des Saison</h1>
                        <br/>

                    </center>
                    <div class="d-flex align-items-start text-white">
                        {this.state.saison.map(saison => {
                            if (saison.nomsaison === 'Basse Saison'){
                                return (
                                    <>
                                    <div class="d-flex align-items-start m-2">
                                        <div className="bg-blue-500 rounded-md w-5 h-5 m-2"></div>
                                        <div>
                                            <h2>{saison.nomsaison}</h2>
                                            <span>Par de defaut une journee considerée en {saison.nomsaison} </span>
                                        </div>
                                        
                                    </div>
                                    
                                    </>
                                    
                                )
                            }else if(saison.nomsaison==="Moyenne Saison"){
                                return (
                                    <>
                                    <div class="d-flex align-items-start m-2">
                                        <div className="bg-yellow-500 rounded-md w-5 h-5 m-2"></div>
                                        <div>
                                            <h2>{saison.nomsaison}</h2>
                                            <span>Ajouter nouvelle periode de {saison.nomsaison}</span><br/>
                                            <Link to={`/ajouterSaison/${(saison.id)}`} 
                                            className="rounded bg-warning">
                                                Click ici
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    </>
                                
                                );

                            }else{
                                return (
                                    <>
                                    <div class="d-flex align-items-start m-2">
                                        <div className="bg-red-500 rounded-md w-5 h-5 m-2"></div>
                                        <div>
                                            <h2>{saison.nomsaison}</h2>
                                            <span>Ajouter nouvelle periode de {saison.nomsaison}</span><br/>
                                            <Link to={`/ajouterSaison/${(saison.id)}`} 
                                            className="rounded bg-danger">
                                                Click ici
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    </>
                                
                                    // <Link to={`/ajouterSaison/${(saison.id)}`}
                                    // className="border border-blue-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 
                                    // transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                                    // >
                                    // {saison.nomsaison}
                                    // </Link>
                                
                                );

                            }
                            
                            })}
                        <div class="d-flex align-items-start m-2">
                            <div className="bg-green-500 rounded-md w-5 h-5 m-2"></div>
                            <div>
                                <h2>Erreurs</h2>
                                <span>les deux periode est confondue </span>
                            </div>
                            
                        </div>

                    </div>      
                </div>
                <br/>
                <div>
                    <Indexs/>
                </div>
                

            </>
        )
    }
}

export default GestionSaison;
