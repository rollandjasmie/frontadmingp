import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ErrorField from '../../../../components/ErrorField/ErrorField';
import axios from '../../../../axios';

const OptionSchema = Yup.object().shape({
    libelle: Yup.string()
        .required('Veuillez mettre le titre de l`option'),
    prix: Yup.string()
        .required('Veuillez entrer le prix')
});

export default class AddOptions extends Component {


    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        libelle: '',
                        prix: '',
                        category_id: null

                    }}
                    validationSchema={OptionSchema}
                    onSubmit={(values, { resetForm }) => {
                        // récupération de l'id dans editer.js
                        const id = this.props.ids.id
                        axios.post(`/categories/${id}/options`, values).then(response => {
                            const { action } = this.props;
                            if (response.status === 201) {
                                action.toggleModal(false);
                                resetForm();
                                action.getOption();
                            }
                        })
                    }
                    }
                >
                    {({ errors, touched }) => (
                        <Form
                            autoComplete="off">
                            <div>
                                <div className="flex">
                                    <div className="mb-2 mr-4">
                                        <label className="block text-gray-700 font-bold mb-1 md:mb-0">
                                            Titre de l'option:
                            </label>
                                        <Field
                                            name="libelle"
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                        <ErrorField errors={errors} touched={touched} row="libelle" />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1 md:mb-0">
                                            Prix:
                            </label>
                                        <Field
                                            name="prix"
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                        <ErrorField errors={errors} touched={touched} row="prix" />
                                    </div>


                                </div>


                            </div>

                            <hr className="my-4" />
                            <div className="flex justify-end">
                                <button type="submit" className="text-white px-4 py-2 bg-blue-500 hover:bg-blue-400">Sauvegarder</button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
