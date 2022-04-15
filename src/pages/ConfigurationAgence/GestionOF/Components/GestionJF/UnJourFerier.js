import React, { Component } from 'react';
import { Field } from 'formik'

export default class UnJourFerier extends Component {

    nameUDate= `date${this.props.num}` 
    nameUJour= `jour${this.props.num}`
    nameUPrix= `prix${this.props.num}`
    nameCheckU= `checkU${this.props.num}`

    render () {
        return(
            <>
            // <div className="tableResponsive w-full">
                {/* <div className="w-25">
                    <Field className="appearance-none block w-50 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                        px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name="anneeU"/>

                </div> */}
                <tbody>
                    
                    <tr>
                        <td className="input-column">
                            <div>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                        px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" id={this.nameUDate} name={this.nameUDate}/>
                            </div>
                        </td>
                        
                        <td className="input-column">
                            <div>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                        px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id={this.nameUJour} name={this.nameUJour}/>
                            </div>
                        </td>

                        <td className="input-column">
                            <div>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                        px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" id={this.nameUPrix} name={this.nameUPrix}/>
                            </div>
                        </td>
                        <td className="input-check" >
                            <div className="ml-4 mb-4">
                                <Field className="form-check-input" type="checkbox"  id={this.nameCheckU} name={this.nameCheckU} />
                            </div>
                        </td>

                    </tr>    
                </tbody>
            // </div>
        </>
        )
    }
}
