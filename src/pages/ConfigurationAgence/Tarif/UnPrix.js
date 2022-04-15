import React, { Component } from 'react';
import { Field } from 'formik';

export default class UnPrix extends Component {
   
    namePrix = `prix${this.props.num}`
    nombreJourD = `nombreJourD${this.props.num}`
    nombreJourF = `nombreJourF${this.props.num}`
    render() {
        
        return (
            <div className="d-flex align-items-start">

                {/* <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                    py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name={this.namePrix} type="number"/>
                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                    py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name={this.namePrix} type="number"/>    
                 */}
                <br /><br />
                <div>
                    <h3>Jour</h3>
                    <Field className="appearance-none block w-50 bg-gray-200 text-gray-700 border border-gray-200 rounded 
                    py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 m-2" name={this.nombreJourD} type="number" />
                </div>
                <div>
                    <h3>au</h3>
                    <Field className="appearance-none block w-50 bg-gray-200 text-gray-700 border border-gray-200 rounded 
                    py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 m-2" name={this.nombreJourF} type="number" />

                </div>
                <div>
                    <h3>Prix Euro/Jours</h3>
                    <Field className="appearance-none block w-75 bg-gray-200 text-gray-700 border border-gray-200 rounded 
                    py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 m-2" name={this.namePrix} type="number" />
                </div>

            </div>
        )
    }

}
