import React, { Component } from 'react';
import AddJours from './AddJour';
import ListeJours from './ListeJour';
import axios from '../../../../axios';
import { NavLink } from 'react-router-dom';

class Jours extends Component {
    state = {
        jours: []
    }

    action = {
        getJour: () => {
            axios.get('/jours').then(response => {
                if (response.status === 200) {
                    this.setState({
                        jours: response.data
                    })
                }
            })
        },
        deleteJour: (jour) => {
            axios.delete(`/jours/${jour.id}`).then(response => {
                if (response.status === 204) {
                    this.action.getJour();
                }
            })
        }
    }
    

    render() {
        // Récupération de la variable jours depuis le state
        const  { jours } = this.state;
        return (
            <div className="p-5">
                <NavLink to="/tarif" >
                    <button class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                </NavLink>
                <h1>Gestion des jours</h1>

                <ListeJours
                    action={{...this.action}}
                    jours={jours}/>
                <AddJours
                    action={{...this.action}}/>
            </div>
        )
    }
}


export default Jours;
