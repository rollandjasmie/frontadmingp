import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { Formik, Field, Form } from 'formik';

let i = 0;
export default class ListeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { categ: '', intvalue: null, id: [], imagevoiture: null };
  }

  // componentWillUnmount() {
  //     clearInterval(this.interval);
  // }

  async componentDidMount() {
    const { action } = this.props;
    action.getCategory();
    await this.getCat();
    await this.getImageVoiture()
    // this.interval = setInterval(() =>
    //   action.getCategory()
    // , 1000) 

  }
  async getImageVoiture() {
    await axios.get(`/categorieVehicule`).then(response => {
      if (response.status === 200) {
        this.setState({
          imagevoiture: response.data
        })
        
      }
    })
  };

  async getCat() {
    await axios.get('/categories').then(response => {
      if (response.status === 200) {
        this.setState({
          categ: response.data

        })
        
      }
      const initvalues = {}
      const ids = []
      this.state.categ.map((value) => {
        initvalues[`val${value.id}`] = value.stock
        initvalues[`ligne${value.id}`] = value.enligne
        ids.push(value.id)

      })
      this.setState({
        intvalue: initvalues,
        id: ids
      })
    })
  }

  deletecat(cat) {
    axios.delete(`/categories/${cat}`).then(response => {
      if (response.status === 204) {
        const { action } = this.props;
        action.getCategory();
      }
    })
  }

  render() {
    const { categories, action } = this.props;
    const stocId = this.state.id
    const images = this.state.imagevoiture
    return (
      <>
        {this.state.intvalue && images ?
          <Formik
            initialValues={this.state.intvalue}
            onSubmit={(value, { setSubmitting }) => {
              setSubmitting(true);
              axios.post('/categorie/stock', {
                value, stocId
              })

              setSubmitting(false);
            }}
          >
            <Form class="w-full">

              <div className="py-4">
                <div class="col-md-12 col-sm-12 ">
                  <div class="x_panel">
                    <div class="x_content">
                      <div class="table-responsive">
                        <table class="table table-striped jambo_table bulk_action">
                          <thead className="text-center">
                            <tr class="headings">
                              {/* <th class="column-title">Marque</th> */}
                              <th class="column-title">Image</th>
                              <th class="column-title">ref </th>
                              <th class="column-title">Titre du produit </th>
                              <th class="column-title">Stock</th>
                              <th class="column-title">En ligne </th>
                              <th class="column-title no-link last">Classement</th>
                              <th class="column-title">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories && categories.map((category, key) => {
                              return (
                                <tr class="even pointer">
                                  
                                  {images[key] ? <td className="text-center"><img src={`http://fd0b515.online-server.cloud/${images[key].image.url}`} alt={images[key].marque} /></td> : <td className="text-center">Aucun image</td>}

                                  <td className="text-center">{category.ref} <i class="success fa fa-long-arrow-up"></i></td>
                                  <td className="text-center">{category.name}</td>
                                  <td >
                                    <Field className="bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-1"
                                      style={{ width: "50px" }} type="number" name={[`val${category.id}`]} />
                                  </td>
                                  <td>
                                    <span><Field className="w-50" type="checkbox" id={category.id} name={[`ligne${category.id}`]} /></span>
                                  </td>
                                  <td className="text-center">
                                    {key + 1}
                                  </td>
                                  <td className="">
                                    <NavLink to={`/categories/${category.id}`}>
                                      <span className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-3 py-3 m-1
                                        transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline" >
                                        <i class="fa fa-edit"></i> Edit
                                        </span>
                                    </NavLink>
                                    <button
                                      type="submit"
                                      className="border border-green-500 bg-green-500 text-white rounded-md px-1 py-3 m-1
                                        transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                    >
                                      Valider
                                      </button>
                                    <button
                                      type="button" onClick={() => this.deletecat(category.id)}
                                      className="border border-green-500 bg-red-400 text-white rounded-md px-1 py-3 m-1
                                        transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                                    >
                                      Supprimer
                                      </button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik> : <h1 className="text-white">Charger</h1>}
      </>
    )
  }
}
