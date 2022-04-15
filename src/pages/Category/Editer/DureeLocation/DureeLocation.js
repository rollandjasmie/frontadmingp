import React, { Component } from 'react'
import { Formik , Form, Field } from 'formik';
import axios from '../../../../axios';



export default class DureeLocation extends Component {
    state = {
        inValue: null
    }
    // componentDidMount() {
    //     this.interval = setInterval(() =>
    //         this.getDuree()
    //         , 1000)
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    async componentDidMount(){
        await this.getDuree()     
    }
    async getDuree(){
        await axios.get(`/categories/dureemin/${this.props.ids.id}`).then(response => {
            var objValue = response.data
            var value ={}
            
    
            value[`BS_Min`]= objValue.duree_min_bs
            value[`MS_Min`]= objValue.duree_min_ms
            value[`HS_Min`]= objValue.duree_min_hs
            // value[`check0`]= false
            // value[`check1`]= false
            // value[`check2`]= false
            

            this.setState({
                inValue: value
            })       
        }) 
       
    }
    
    render() {
                
        
        return (
        
            <>
                <div className="page-title">
                    <div className="title_left">
                        <h2> Dureé de jour minimal de :</h2>
                    </div>
                </div>
                
            {
                this.state.inValue ?(
                    <div className="row">
                    <Formik   
                        initialValues={this.state.inValue}
                        onSubmit={(value)=>                    
                            axios.put(`/stock/${this.props.ids.id}` ,value).then(response => {
                                if (response.status===200){
                                    this.setState({
                                        inValue: null
                                    })
                                    this.getDuree()

                                }
                            })
                        }
                    
                    >
                        
                        <Form class="d-flex align-items-start">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                     Basse saison
                                     {/* <div className="ml-4 mb-4">
                                        <Field className="form-check-input" type="checkbox"  id="check0" name="check0" />
                                    </div> */}
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "BS_Min" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Moyen Saison
                                    {/* <div className="ml-4 mb-4">
                                        <Field className="form-check-input" type="checkbox"  id="check1" name="check1" />
                                    </div> */}
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "MS_Min" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Haute Saison
                                    {/* <div className="ml-4 mb-4">
                                        <Field className="form-check-input" type="checkbox"  id="check2" name= "check2" />
                                    </div> */}
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "HS_Min" />
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                
                                <button
                                    type="submit"
                                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                    transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                >
                                    Valide
                                </button>
                            </div>
                                
                        </Form>
                        

                    </Formik>
                    
                </div>

                ):<h1>Antendre</h1>
            }
                
                

            </>
        )
    }
}
