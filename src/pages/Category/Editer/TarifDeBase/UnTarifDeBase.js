import React, { Component } from 'react';
import './TarifDeBase.css';
import {  Field } from 'formik'

export default class UnTarifDeBase extends Component {

    

    render(){
        

        return(
           
            
                <tr>
                    <td className="input-column">
                        <div className="row inputjours">
                            <div className="input-nbjours mr-3 ml-3">
                                <Field type="text" className="form-control"  id={[`jourD${this.props.num}`]} name={[`jourD${this.props.num}`]} />
                            </div>

                            <p>à</p>
                            <div className="input-nbjours ml-3 mr-3">
                                <Field type="text" className="form-control"  id={[`jourF${this.props.num}`]} name={[`jourF${this.props.num}`]}  />
                            </div>
                            <p>jours</p>
                        </div>
                    </td>
                    <td className="input-column">
                        <Field type="text" className="form-control input-prix"  id={[`prixBS${this.props.num}`]} name={[`prixBS${this.props.num}`]} />
                        
                    </td>
                    <td className="input-column">
                        <Field type="text" className="form-control input-prix"   id={[`prixMS${this.props.num}`]} name={[`prixMS${this.props.num}`]} />
                        
                    </td>
                    <td className="input-column">
                        <Field type="text" className="form-control input-prix"   id={[`prixHS${this.props.num}`]} name={[`prixHS${this.props.num}`]}/>
                        
                    </td>
                    <td className="input-check">
                        <div className="ml-4 mb-4">
                            <Field className="form-check-input" type="checkbox"  id={[`check${this.props.num}`]} name={[`check${this.props.num}`]} />
                        </div>
                    </td>
                    <td className="input-column">
                        <button type="button" className="btn btn-danger" onClick={e => this.props.suppression(this.props.num)}>suppr</button>
                    </td>
                </tr>
           
       
        )
    }

}