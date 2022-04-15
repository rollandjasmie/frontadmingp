import React, { Component } from 'react';
import AddUtilisateur from './AddUtilisateur';
import ListeUtilisateur from './ListeUtilisateur';
import axios from '../../axios';

class Utilisateurs extends Component {
    state = {
        utilisateurs: []
    }

    action = {
        getUtilisateur: () => {

            axios.get('/admin_users').then(response => {
                if (response.status === 200) {
                    this.setState({
                        utilisateurs: response.data
                    })
                }
            })
        },
        deleteUtilisateur: (utilisateur) => {
            axios.delete(`/admin_users/${utilisateur.id}`).then(response => {
                if (response.status === 204) {
                    this.action.getUtilisateur();
                }
            })
        }
    }


    render() {
        // Récupération de la variable voiture depuis le state
        const { utilisateurs } = this.state;
        return (
            <div className="d-flex justify-content-center">
                <div className="p-5">
                    <h1 className='text-center text-white h1'>Gestion des utilisateurs</h1>

                    <ListeUtilisateur
                        action={{ ...this.action }}
                        utilisateurs={utilisateurs} />
                    <AddUtilisateur
                        action={{ ...this.action }} />
                </div>

            </div>

        )
    }
}


export default Utilisateurs;
