import React, { Component } from 'react';
import axios from 'axios';
import InlineEdit from '../../../../components/InlineEdit/InlineEdit';

export default class EditOption extends Component {
    state = {
        option: {}
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.ids;

        // Envoi d'une requête HTTP pour récupérer le détail de la voiture
        axios.get(`/categories/${id}/options/${this.props.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    option: response.data
                });
            }
        });
    }

    updateOption = (row, value) => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.ids;

        // Mise à jour de la voiture selon le champ modifié
        let { option } = this.state;
        option[row] = value;

        axios.put(`/categories/${id}/options/${this.props.id}`, option).then(response => {
            if (response.status === 204) {
                this.getDetail();
            }
        });
    }

    render() {
        const { option } = this.state;
        return (
            <div>
                <div className="flex">
                    Titre de l'option : &nbsp;
                        <InlineEdit
                        onSave={(value) => this.updateOption('libelle', value)}
                        style={{ flex: 'auto' }}
                        value={option.libelle} />
                </div> <br />
                <div className="flex">
                    Prix : &nbsp;
                        <InlineEdit
                        onSave={(value) => this.updateOption('prix', value)}
                        style={{ flex: 'auto' }}
                        value={option.prix} />
                </div>



            </div>
        )
    }
}