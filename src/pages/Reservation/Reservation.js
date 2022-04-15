import React, { Component } from 'react'
import axios from '../../axios';
import { Formik, Form, Field } from 'formik';

import './reservation.css';
export class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lire: false,
            reservations: []
        };
    }

    componentDidMount() {
        // Simple GET request using axios
        this.getAdminReservation();
    }

    getAdminReservation = () => {
        axios.get(`/admin_reservations`)
            .then(res => {
                const reservations = res.data;
                this.setState({ reservations });
                console.log(res);
            })
    }
    
    deleteAdminReservation = (admin_reservation) => {
        axios.delete(`/admin_reservations/${admin_reservation.id}`).then(response => {
            if (response.status === 204) {
                this.getAdminReservation();
            }
        })
    }

    render() {

        return (
            <div>
                <h1 className="Titre-reservation">Reservation</h1>
                
                <div class="col-md-12 col-sm-12  ">
                <div class="x_panel">
                <Formik 
                    initialValues={{
                        dateDepart: '',
                        dateRetour: '',
                        lieuDepart: 'Aeroport de Rolland gaross',
                        lieuRetour: 'Aeroport de rolland gaross',
                        heureDepart: '',
                        heureRetour: '',
                        description: ''

                    }}

                    onSubmit={(values, { resetForm }) => {
                        axios.post('/admin_reservations', values).then(response => {
                            if (response.status === 201) {
                                resetForm()
                            }

                        })
                    
                    }} 
                >
                    <Form>
                       
                                <label className="part-date">Date de départ :</label>
                            <Field type="date" name="dateDepart" />
                          
                                <label className="part-date">heure de départ :</label>
                            <Field type="time" name="heureDepart" />
                         
                                <label className="part-date">date retour :</label>
                            <Field type="date" name="dateRetour" />
                          
                                <labe>heure retour:</labe>
                            <Field type="time" name="heureRetour" />
                         
                            <label className="part-date">Description :</label>
                                <Field Component="textarea" className="input-desc" name="description" type="text"/>
                                <span className="bouton">
                             <button type="submit" class="btn btn-secondary" id="bouton" data-toggle="tooltip" data-placement="left" title="Validation ">Valider</button>
                             </span>
                    </Form>

                </Formik>
                  <div class="x_content">
                    <div class="tab-content" id="myTabContent">
                    <table class="table table-striped jambo_table bulk_action">

                            <tr className="teble-title">
                                <th>Date de départ</th>
                                <th>Date de retour</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                            { this.state.reservations.map(reservation => {
                            return (
                            <tr>
                                <td>{reservation.dateDepart} à {reservation.heureDepart}</td>
                                <td>{reservation.dateRetour} à {reservation.heureRetour}</td>
                                <td>{reservation.description}</td>
                                <td><button className="bouton-cur" type="button" onClick={() => this.deleteAdminReservation(reservation)} >
                                    Suprimer
                                </button>
                                </td>
                            </tr>
                            )})}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Reservation
