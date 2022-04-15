import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ListeJours extends Component {
    componentDidMount() {
        const { action } = this.props;
        action.getJour();
    }

    render() {
        const { jours, action } = this.props;
        return (
            <div className="py-4">
                <h2>Liste des jours par euros </h2>
                <div className="mt-2">
                    <table className="table-auto">
                        <thead>
                            <tr>
                            <th className="border px-4 py-2">Nom</th>
                            <th className="border px-4 py-2">Jours</th>
                            </tr>
                        </thead>
                        <tbody>
                            { jours && jours.map(jour => {
                                return (
                                    <tr>
                                        <td className="border px-4 py-2">{ jour.name }</td>
                                        <td className="border px-4 py-2">{ jour.nombrejour }</td>
                                        <td className="border px-4 py-2"><span className="text-red-500 cursor-pointer" onClick={() => action.deleteJour(jour)}>Supprimer</span></td>
                                    </tr>
                                )
                            }) }
                            
                        </tbody>
                    </table>
                </div>
                
                { jours && jours.length === 0 ? (<>Aucun jour disponible pour le moment.</>) : null }
                
                
            </div>
        )
    }
}
