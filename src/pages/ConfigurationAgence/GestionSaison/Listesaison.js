import React, { Component } from 'react';
import moment from 'moment' ;

export default class Listesaison extends Component {
    componentDidMount() {
        const { action } = this.props;
        action.getDateSaison();
    }

    render() {
    //     const { saison, action } = this.props;
    //     const fi = date.filter(person => person.saison_id == thisid);
         return(
             <>
             </>)

    //          <div className="py-4">
    //                 <h2>Periode</h2>
    //                 <div className="mt-2">
    //                     <table class="table table-condensed">
    //                         <tbody>
    //                             { fi.map(dtesaison => {
    //                                 return (
    //                                     <tr>
    //                                         <td ><span className="text-blue-500">Du  <strong>{moment(dtesaison.debutsaison).format('D MMMM Y')}</strong>   au   <strong>{moment(dtesaison.finsaison).format('D MMMM Y')}</strong></span></td>
    //                                         <td ><span className="text-red-500 cursor-pointer" onClick={() => this.action.deleteSaison(dtesaison)}>Supprimer</span></td>
    //                                     </tr>
    //                                 )
    //                             }) }
                                
    //                         </tbody>
    //                     </table>
    //                 </div>
                    
    //                 {/* { utilisateurs && utilisateurs.length === 0 ? (<>Aucun utilisateur disponible pour le moment.</>) : null } */}
                    
                    
    //             </div>
    //         </>
    //     )

     }
}