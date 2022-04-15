import React, { Component } from 'react';
import { Field } from 'formik';


export default class DeuxJourFerier extends Component {

    nameDDate= `dateD${this.props.nbr}`
    nameDJour= `jourD${this.props.nbr}`
    nameDPrix= `prixD${this.props.nbr}`
    nameCheckD= `checkD${this.props.nbr}`

    render () {
        return(
            <tr>
                <td className="input-column">
                
                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 
                px-2 mb-0 leading-tight focus:outline-none focus:bg-white" type="date" name={this.nameDDate}/>
                </td>   
                <td className="input-column">
                
                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 
                px-2 mb-0 leading-tight focus:outline-none focus:bg-white" type="text" name={this.nameDJour}/>
                    
                </td>
                <td className="input-column">
                    
                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 
                px-2 mb-0 leading-tight focus:outline-none focus:bg-white" type="number" name={this.nameDPrix}/>
                    
                </td>
                <td className="" >
                    <div className="ml-4 mb-1 mt-2 ">
                        <Field className="ft" type="checkbox"  id={this.nameCheckD} name={this.nameCheckD} />
                    </div>
                </td>
                <td>
                <button
                    type="button"
                    className="border border-red-500 bg-red-500 text-white rounded-md px-1 py-1 m-0 
                    transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={e => this.props.deletejour(this.props.nbr)}
                >
                    X
                </button>
                </td>
            </tr>    

        )
    }
}
