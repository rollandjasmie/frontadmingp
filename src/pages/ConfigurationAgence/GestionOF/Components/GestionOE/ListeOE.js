import React, { Component } from 'react';
import moment from 'moment' ;

export default class ListeOE extends Component {
    componentDidMount() {
        const { action } = this.props;
        action.getOuvert();
    }

    render() {
        const { date, action } = this.props;
        return (
            <div className="py-4">
                    
                    <div className="mt-2">
                        <table class="table table-condensed">
                           <thead>
                              <tr>
                              <th>Periodes ouvert exceptionel </th>
                              <th>Action</th>
                              
                              </tr>
                           </thead>
                            <tbody>
                                {date && date.length === 0 ? (<h1>Chargement</h1>) : date.map(nomdate => {
                                    return (
                                        <tr>
                                          <td className="text-white"><strong>{moment(nomdate.jourouvertdebut).format('D MMMM Y')  }</strong>  jusqu'a  <strong>{ moment(nomdate.jourouvertfin).format('D MMMM Y') }</strong></td>
                                          <td ><span className="text-red-500 cursor-pointer" onClick={() => this.action.deleteOuvert(nomdate)}>Supprimer</span></td>
                                            
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                
                {/* { utilisateurs && utilisateurs.length === 0 ? (<>Aucun utilisateur disponible pour le moment.</>) : null } */}
                
                
            </div>
        )
    }
}
