import React, { Component } from 'react';
import axios from '../../axios';

import InlineEdit from '../../components/InlineEdit/InlineEdit';

export default class DetailCategory extends Component {
    state = {
        category: {}
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.match.params.id;

        // Envoi d'une requête HTTP pour récupérer le détail de la category
        axios.get(`/categories/${id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    category: response.data
                });
            }
        });
    }

    updateCategory = (row, value) => {
        // Récupération de l'id depuis le route dynamique
        const id = this.props.match.params.id;

        // Mise à jour de la category selon le champ modifié
        let { category } = this.state;
        category[row] = value;

        axios.put(`/categories/${id}`, category).then(response => {
            if (response.status === 204) {
                this.getDetail();
            }
        });
    }

    render() {
        const { category } = this.state;
        return (
            <>
                <div className="p-5 text-white">
                    <h1>Détail de la catégorie</h1>
                    <div className="flex">
                        Marque : &nbsp;
                        <InlineEdit
                            onSave={(value) => this.updateCategory('ref', value)}
                            style={{ flex: 'auto' }}
                            value={category.ref} />
                    </div>
                    <div className="flex">
                        Modèle : &nbsp;
                        <InlineEdit
                            onSave={(value) => this.updateCategory('category', value)}
                            style={{ flex: 'auto' }}
                            value={category.category} />
                    </div>

                </div>
            </>
        )
    }
}
