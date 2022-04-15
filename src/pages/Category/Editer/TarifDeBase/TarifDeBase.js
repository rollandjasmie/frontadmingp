import React, { Component } from 'react';
import UnTarifDeBase from './UnTarifDeBase';
import './TarifDeBase.css';
import { Formik , Form } from 'formik';
import axios from '../../../../axios';

export default class TarifDeBase extends Component {
    constructor(props) {
        super(props);
        this.suppression = this.suppression.bind(this);
        this.state = {
            nombreLigne: [],
            id:[],
            initValues:null,
            size:0
        }
    }
    
    async suppression (id)  {
        await axios.delete(`/base_tarifs/${id}`).then(response => {
            this.setState({
                nombreLigne: [],
                id:[],
                initValues:null,
                size:0
            })
           this.gettarifdebase()
        })
        
    }
    async ajoutNewPeriod (){
        await axios.put(`/base_tarifs/${this.props.ids}`).then(response => {
            if(response.status===201){
                this.setState({
                    nombreLigne: [],
                    id:[],
                    initValues:null,
                    size:0
                })
               this.gettarifdebase()
            }
        })
    }
    async gettarifdebase () {
       await axios.get(`/base/tarif/${this.props.ids}`).then(response => {
           this.setState({
               size: response.data.tarif_par_categorie.length
           })
            for(var i=0 ; i< response.data.tarif_par_categorie.length ;i++){
                var obj = { ...response.data.tarif_par_categorie[i] };
                this.setState({
                    nombreLigne: [...this.state.nombreLigne,i+1],
                    id:[...this.state.id,obj.id],
                    initValues:{
                       ...this.state.initValues,
                       [`jourD${obj.id}`]: obj.jourdebut,
                       [`jourF${obj.id}`]: obj.jourfin,
                       [`prixBS${obj.id}`]: obj.prixbassesaison,
                       [`prixMS${obj.id}`]: obj.prixmoyennesaison,
                       [`prixHS${obj.id}`]: obj.prixhautesaison,
                       [`check${obj.id}`]: "",
                    },
                })
            }
        })
    }
    async componentDidMount(){
        await this.gettarifdebase()
    }

   
    render() {
        return (
            <>
            {
                this.state.size === this.state.id.length?(

            <div>
                <section className="text-gray-700 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <Formik
                        initialValues = {this.state.initValues}
                        onSubmit={(data)=>{
                            axios.post('/base_tarifs',{data,ids: this.props.ids,id:this.state.id}).then(response => {
                                if (response.status===200){
                                    this.setState({
                                        nombreLigne: [],
                                        id:[],
                                        initValues:null,
                                        size:0
                                    })
                                    this.gettarifdebase()
                                }
                            })
                        }}
                    >{({values, isSubmitting}) => (
                        <Form>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col" className="input-column">Combinaison</th>
                                        <th scope="col" className="input-column">Prix BS(€/jour)</th>
                                        <th scope="col" className="input-column">Prix MS(€/jour)</th>
                                        <th scope="col" className="input-column">Prix HS(€/jour)</th>
                                        <th scope="col" className="input-check">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                     this.state.id.map((ligne) => 
                                        <UnTarifDeBase key={ligne} num={ligne} suppression={this.suppression}/>
                                     )
                                }
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-success" onClick={e => this.ajoutNewPeriod()}>Ajout periode</button>
                                <input type="submit" className="btn btn-primary" value="Valider"/>
                            </div>

                        </Form>
                    )}
                    </Formik>
                    </div>
                </section>

            </div>
        
                ):null
            }
            </>
        )
    }
}