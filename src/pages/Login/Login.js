import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLoginAttempt } from '../../redux/Auth/auth.action';
import ErrorField from '../../components/ErrorField/ErrorField';
import './Login.scss';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('L\'username ne doit pas être vide'),
    password: Yup.string()
        .required('Le mot de passe ne doit pas être vide')
});

class Login extends Component {
    render() {
        return (
            <div className="login">
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        this.props.userLoginAttempt(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form
                            autoComplete="off">
                            <h1 className="text-center pb-5">Connectez-vous</h1>
                            
                            <div>
                                <div className="mb-2">
                                    <label className="block font-bold mb-1 md:mb-0">
                                        Username
                            </label>
                                    <Field
                                        name="username"
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                    <ErrorField errors={errors} touched={touched} row="username" />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-bold mb-1 md:mb-0">
                                        Mot de passe
                            </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-dark-700 leading-tight focus:outline-none focus:bg-gray focus:border-purple-500" />
                                    <ErrorField errors={errors} touched={touched} row="password" />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-center mt-5">
                                <button type="submit" className="text-white px-4 py-2  rounded  border-2 border-gray-200 bg-blue-500 hover:bg-blue-400">Se Connecter</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.AuthReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginAttempt: (username, password) => { dispatch(userLoginAttempt(username, password)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);