import React, { Component } from 'react';
import AddCategory from './AddCategory';
import ListeCategory from './ListeCategory';
import axios from '../../axios';

import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

class Categories extends Component {
    state = {
        addNew: false,
        
        categories: []
    }

    action = {
        toggleModal: (value) => {
            this.setState({ addNew: value })
        },
        getCategory: () => {
            axios.get('/categories').then(response => {
                if (response.status === 200) {
                    this.setState({
                        categories: response.data
                    })
                    
                }
            })
        }
    }

    render() {
        // Récupération de la variable category depuis le state
        const { addNew, categories } = this.state;
        return (
            <div className="p-5">
                <h1 className="mb-5 text-center h1 text-white">Gestion des catégories</h1>
                <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={() => this.action.toggleModal(true)}>Nouvelle catégorie
                </button> 
                &nbsp;
                <NavLink to={`/voitures`}>
                    <td className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Liste des voitures</td>
                </NavLink>
                <ListeCategory
                    action={{ ...this.action }}
                    categories={categories} />
                <Modal
                    isOpen={addNew}
                    className="modal-modern">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2>Insertion d'une nouvelle catégorie de voiture</h2>
                            </div>
                            <div
                                onClick={() => this.setState({ addNew: false })}
                                className="modal-close">X</div>
                        </div>
                        <hr className="my-4" />


                        <AddCategory
                            action={{ ...this.action }} />
                    </div>
                </Modal>
                {/* <NavLink to={'/parcourir'}>
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    >Parcourir</button>
                </NavLink> */}
            </div>
        )
    }
}
export default Categories;
