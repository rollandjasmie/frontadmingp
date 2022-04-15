import React, { Component, setStat} from 'react'
import axios from '../../../../../axios'
import { Formik, Form, Field } from 'formik';
import '../GestionOF/gestionOF.css'
import moment from 'moment' ;
import ErrorField from '../../../../../components/ErrorField/ErrorField';
import * as Yup from 'yup';

const FermetureSchema = Yup.object().shape({
	jourfermedebut: Yup.date()
		.required('Vous devez entre la date de debut de fermeture exceptionnel'),
		// .transform(parseDateString).min(yesterday,"la date de depart doit être supérieur à aujourd'hui"),
    jourfermefin: Yup.date()
		.required('Vous devez entre la date de fin de fermeture exceptionnel')
		.when('jourfermedebut',(jourfermedebut,schema) =>{
			return schema.min(jourfermedebut,'La date fin doit être supérieur a la date de debut de fermeture exceptionnel')
		}),
});

class GestionFE extends Component {
    
    state = {

        dateF : []
    }
    
    componentDidMount() {
        this.action.getFerme()
        // this.interval = setInterval(() =>
        //     this.action.getFerme()
        //     ,5000)
    }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    action = {
        getFerme: () => {
            axios.get(`/fermexceptions`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        dateF: response.data
                    });
                    
                }
            });
        },
        
        deleteFerme: (ferme) => {
            axios.delete(`/fermexceptions/${ferme.id}`).then(response => {
                if (response.status === 204) {
                    this.action.getFerme();
                }
            })
        }
    } 
    render() {
        return (
            <>
                <div className="page-title">
                    <div>
                        <h2>GESTION DES FERMETURES EXECEPTIONNEL </h2>
                    </div>
                </div>
                <h3>Ajouter autant de periode fermeture nécessaire </h3>
                <br/><br/>
                <div className="row">
                    <Formik
                        initialValues={{
                            jourfermedebut: '',
                            jourfermefin:''
                            
                        }}
                        validationSchema={FermetureSchema}
                        onSubmit={(data, { resetForm })=> {                  
                            axios.post('/fermexceptions', data).then(response => {
                                if (response.status === 201) {   
                                    this.action.getFerme();  
                                }
                            })   
                            resetForm({});
                        }}
                    
                    >
                        {({ errors, touched }) => (
                            <Form className="d-flex align-items-start">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Du :
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" name="jourfermedebut"/>
                                <ErrorField errors={errors} touched={touched} row="jourfermedebut"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Au
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="jourfermefin"/>
                                <ErrorField errors={errors} touched={touched} row='jourfermefin'/>
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                        
                                <button
                                    type="submit"
                                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                    transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                >
                                    Ajouter
                                </button>
                            </div>  
                        </Form>)} 
                    </Formik>
                </div>

                {/* Liste des jour exceptionel */}
                
                <div className="py-4">
                    
                    <div className="mt-2">
                        <table class="table table-condensed">
                           <thead>
                              <tr>
                              <th>Periodes ferme exceptionel </th>
                              <th>Action</th>
                              
                              </tr>
                           </thead>
                            <tbody>
                                { this.state.dateF.map(nomdate => {
                                    return (
                                        <tr>
                                          <td className="text-white"><strong>{moment(nomdate.jourfermedebut).format('D MMMM Y')  }</strong>  jusqu'a  <strong>{ moment(nomdate.jourfermefin).format('D MMMM Y') }</strong></td>
                                          <td ><span className="text-red-500 cursor-pointer" onClick={() => this.action.deleteFerme(nomdate)}>Supprimer</span></td>
                                            
                                        </tr>
                                    )
                                }) }
                                
                            </tbody>
                        </table>
                    </div>
                    
                    {/* { utilisateurs && utilisateurs.length === 0 ? (<>Aucun utilisateur disponible pour le moment.</>) : null } */}
                    
                    
                </div>
            </>
        )
    }
}
export default GestionFE