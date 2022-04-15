import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import ErrorField from '../../components/ErrorField/ErrorField';
import axios from '../../axios';
 
const UtilisateurSchema = Yup.object().shape({
    username: Yup.string()
        .required('L\'identifiant ne doit pas être vide'),
    email: Yup.string()
        .required('L\'email ne doit pas être vide'),
    password: Yup.string()
        .required('Le mot de passe ne doit pas être vide')
});
 
class AddUtilisateur extends Component {
    render() {
        return (
        <div>
            <h2 className='text-center mb-3' >Insertion d'un nouvel utilisateur</h2>
            <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={UtilisateurSchema}
            onSubmit={(values, { resetForm }) => {
                axios.post('/admin_users', values).then(response => {
                    const { action } = this.props;
                    if (response.status === 201) {   
                        action.getUtilisateur();  
                    }
                })
                resetForm({});
            }}
            >
            {({ errors, touched }) => (
                <Form
                    autoComplete="off">
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2 md:mb-0">
                            Identifiant
                        </label>
                        <Field
                            autoFocus
                            name="username"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                        <ErrorField errors={errors} touched={touched} row="username"/>
                    </div>
                    
                    <div className="mt-3">
                        <label className="block text-gray-700 font-bold mb-2 md:mb-0">
                            Email
                        </label>
                        <Field
                            name="email"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                        <ErrorField errors={errors} touched={touched} row="email"/>
                    </div>

                    <div className="mt-3">
                        <label className="block text-gray-700 font-bold mb-2 md:mb-0">
                            Mot de passe
                        </label>
                        <Field
                            name="password"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                        <ErrorField errors={errors} touched={touched} row="password"/>
                    </div>
                    <button type="submit" className="text-white px-4 py-2 bg-blue-500 hover:bg-blue-400">Sauvegarder</button>
                </Form>
            )}
            </Formik>
        </div>)
    }
}

export default AddUtilisateur;