import React, { Component} from 'react'
import axios from '../../../../../axios'
import { NavLink } from 'react-router-dom';
import { Formik, Form} from 'formik';
import DeuxJourFerier from './DeuxJourFerier';
import moment from 'moment'

//import '../GestionOF/gestionOF.css'

class GestionJF extends Component {
    constructor(props) {
        super(props);
        this.deletejour = this.deletejour.bind(this);
        this.state = {
            ligne: [],
            anneUnique : [],
            objetData: [],
            initVal:null
        }
    }
    async componentDidMount(){
        await this.getJourferier()
    }
    async getJourferier(){
        await axios.get('/jourferiers').then(res=>{
            if(res.status===200) {
                this.setState({
                    objetData: res.data
                })
               
            }
            const anne = []
            const id = []
            const inValue = {}
            this.state.objetData.map(val => {
                anne.push(moment(val.dateferie).format("Y"))
                inValue[`dateD${val.id}`]=val.dateferie
                inValue[`jourD${val.id}`]=val.evenement
                inValue[`prixD${val.id}`]=val.surplus
                inValue[`checkD${val.id}`]=""
                id.push(val.id)
            })
            const unique = anne.filter((v, i, a) => a.indexOf(v) === i);
            
            const tab =[]
            unique.map((val, key) => {
                const obj = []
                this.state.objetData.map(anne =>{
                    if(val===moment(anne.dateferie).format("Y")){
                        obj.push(anne)
                    }
                })
                tab.push(obj)
            })
            
            this.setState({
                anneUnique: tab,
                initVal: inValue,
                ligne: id
            })
                
        })
    }
    async deletejour (id)  {
        await axios.delete(`/jourferiers/${id}`).then(response => {
           this.getJourferier()
        })
        
    } 
    render() {
        //let obj=Object.assign( {}, this.state.initValue1,this.state.initValue2)
        
        const ligne = this.state.ligne
        return (
            <>
                <div className="m-4">
                    <div className="page-title">
                        <div className="title_left">
                            <h2> GESTION DES JOUR FERIES </h2>
                        </div>
                    </div>
                    <div >
                        <NavLink to="/ajoutjourferier" >
                            <button style= {{float:"right" ,margin:"10px"}} class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Ajouter Nouveau jourferier</button>
                        </NavLink>

                    </div>
                    {this.state.initVal  ? 
                    <div className="row">
                    <Formik
                        initialValues={this.state.initVal}    
                        onSubmit={(value)=>{
                            axios.post('/updatejours', {value, ligne}).then(response => {
                                this.setState({
                                    anneUnique : [],
                                    objetData: [],
                                    initVal:null   
                                })
                               this.getJourferier()
                            })
                              
                        }}
                    
                    >
                        <Form class="w-full text-white">
                            {this.state.anneUnique.length === 0 ?
                            <h1>Ajouter un jour  ferier</h1> : this.state.anneUnique.map(jour =>{
                                return(
                                    <>
                                    <h1>{moment(jour[0].dateferie).format('Y')}</h1>
                                    <br/>

                                    <table class="text-white w-200">
                                        <thead>
                                            <th>
                                                <td> Dates </td>
                                                                                                
                                            </th>
                                            <th>
                                                <td> Jour ferier </td>
                                                                                                
                                            </th>
                                            <th>
                                                <td> Surplus </td>
                                                                                                
                                            </th>
                                             <th>
                                                <td> Activer pour modifier </td>
                                                                                                
                                            </th>
                                            <th>
                                                <td> Suppression </td>
                                                                                                
                                            </th>
                                        </thead>
                                        {jour.map(anne =>

                                            <DeuxJourFerier key={anne.id} nbr={anne.id} deletejour={this.deletejour}/>

                                        )}
                                    </table>
                                    </>
                                )  
                            })}
                             <button
                                type="submit"
                                className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            >
                                Valider la modification
                            </button>
                            
                        </Form>             
                    </Formik>
                    
                </div>:<h1>Chargement......</h1>}
                </div>
            </>
        );
    }
}

export default GestionJF;
