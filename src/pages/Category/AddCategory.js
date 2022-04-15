import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ErrorField from '../../components/ErrorField/ErrorField';
import axios from '../../axios';

const CategorySchema = Yup.object().shape({
    // image: Yup.string()
    //     .required('L\'image ne doit pas être vide'),
    ref: Yup.string()
        .required('Veuillez mettre la référence'),
    name: Yup.string()
        .required('Veuillez entrer le nom de la catégorie')
});

class AddCategory extends Component {

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        ref: '',
                        name: ''

                    }}
                    validationSchema={CategorySchema}
                    onSubmit={(values, { resetForm }) => {
                        axios.post('/categories', values).then(response => {
                            const { action } = this.props;
                            if (response.status === 201) {
                                action.toggleModal(false);
                                resetForm();
                                action.getCategory();
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
                                            Référence:
                                        </label>
                                        <Field
                                            name="ref"
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                        <ErrorField errors={errors} touched={touched} row="ref" />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1 md:mb-0">
                                            Nom de la Catégorie:
                                        </label>
                                        <Field
                                            name="name"
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                        <ErrorField errors={errors} touched={touched} row="name" />
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
            </div >)
    }
}

export default AddCategory;