import React, { Component } from 'react';
import AddOption from './AddOption';
import ListeOptions from './ListeOptions';
import axios from '../../../../axios';

import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

class Options extends Component {
    state = {
        addNew: false,
        options: []
    }

    action = {
        toggleModal: (value) => {

            this.setState({ addNew: value })
        },

        getOption: () => {
            const params = this.props.ids
            axios.get(`/categories/${params.id}/options`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        options: response.data
                    })
                }
            })
            
        },
        deleteOption: (option) => {
            const params = this.props.ids
            axios.delete(`/categories/${params.id}/options/${option.id}`).then(response => {
                if (response.status === 204) {
                    this.action.getOption();
                }
            })
        }
    }


    render() {
        // Récupération de la variable category depuis le state
        const params = this.props.ids

        const { addNew, options } = this.state;
        return (
            <div className="p-5">
                <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={() => this.action.toggleModal(true)}>Ajouter une option</button> &nbsp;

                <ListeOptions
                    action={{ ...this.action }}
                    options={options}
                    ids={params} />
                <Modal
                    isOpen={addNew}
                    className="modal-modern">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2>Ajouter une option</h2>
                            </div>
                            <div
                                onClick={() => this.setState({ addNew: false })}
                                className="modal-close">X</div>
                        </div>
                        <hr className="my-4" />


                        <AddOption
                            action={{ ...this.action }} ids={params} />
                    </div>
                </Modal>

            </div>
        )
    }
}


export default Options;
