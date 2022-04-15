import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Voiture.css'




export default class ListeVoiture extends Component {
    componentDidMount() {
        const { action } = this.props;
        action.getVoiture();
        action.getCategory();
    }

    render() {
        const { voitures, categories, action } = this.props;
        

        return (
            <div className="py-4 text-white">
                <h2>Liste des voitures</h2>
                <div className="mt-2">
                    <table className="table-auto">
                        
                        <thead>
                            <tr>
                                <th className="">  </th>
                                <th className="border px-4 py-2">Marque</th>
                                <th className="border px-4 py-2">Modèle</th>
                                <th className="border px-4 py-2">Places</th>
                                <th className="border px-4 py-2">Type</th>
                                <th className="border px-4 py-2">Vitesse</th>
                                <th className="border px-4 py-2">Climatisation</th>
                                <th className="border px-4 py-2">Portes</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voitures && voitures.map(voiture => {
                                // if (voiture.category_id) {
                                //     const nomCategorie = 
                                // }
                                return (
                                    <tr>
                                        <td className="border"><img src={`http://fd0b515.online-server.cloud/${voiture.image.url}`} alt ={voiture.marque}/></td>
                                        <td className="border px-4 py-2">{voiture.marque}</td>
                                        <td className="border px-4 py-2">{voiture.model}</td>
                                        <td className="border px-4 py-2">{voiture.places}</td>
                                        <td className="border px-4 py-2">{voiture.mode}</td>
                                        <td className="border px-4 py-2">{voiture.vitesse}</td>
                                        <td className="border px-4 py-2">{voiture.climatisation}</td>
                                        <td className="border px-4 py-2">{voiture.portes}</td>
                                        <td className="border px-4 py-2">
                                            <NavLink to={`/voitures/detail/${voiture.id}`}>
                                                <span className="text-blue-500 cursor-pointer">Voir détail</span> &nbsp;
                                            </NavLink>
                                            <span className="text-red-500 cursor-pointer" onClick={() => action.deleteVoiture(voiture)}>Supprimer</span>
                                        </td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table>
                </div>

                <center>
                {voitures && voitures.length === 0 ? (<>Aucune voiture disponible pour le moment.</>) : null}</center>

            </div>





        )
    }
}
