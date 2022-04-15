import React, { Component } from 'react';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';
import InlineEdit from '../../../components/InlineEdit/InlineEdit';

export default class DetailVoiture extends Component {
    state = {
        voiture: {}
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.match.params.id;

        // Envoi d'une requête HTTP pour récupérer le détail de la voiture
        axios.get(`/voitures/${id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    voiture: response.data
                });
            }
        });
    }

    updateVoiture = (row, value) => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.match.params.id;

        // Mise à jour de la voiture selon le champ modifié
        let { voiture } = this.state;
        voiture[row] = value;

        axios.put(`/voitures/${id}`, voiture).then(response => {
            if (response.status === 204) {
                this.getDetail();
            }
        });
    }

    render() {
        const { voiture } = this.state;
        return (
            <>
                <div className="p-5">
                    <NavLink to="/voitures" >
                        <button class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                    </NavLink>
                    <div className="p-5">
                        <h1 className="text-white">Détail de la voiture</h1>
                        <div className="flex text-white">
                            Marque : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('marque', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.marque} />
                        </div>
                        <div className="flex text-white">
                            Modèle : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('model', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.model} />
                        </div>
                        <div className="flex text-white">
                            Places : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('places', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.places} />
                        </div>
                        <div className="flex text-white">
                            Type : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('mode', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.mode} />
                        </div>
                        <div className="flex text-white">
                            Climatisation : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('climatisation', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.climatisation} />
                        </div>
                        <div className="flex text-white">
                            Vitesse : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('vitesse', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.vitesse} />
                        </div>
                        <div className="flex text-white">
                            Portes : &nbsp;
                        <InlineEdit
                                onSave={(value) => this.updateVoiture('portes', value)}
                                style={{ flex: 'auto' }}
                                value={voiture.portes} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
