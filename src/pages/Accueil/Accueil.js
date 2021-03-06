import React, { Component } from 'react'
import axios from '../../axios';
import './Accueil.css';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');



export class Accueil extends Component {
    state = {
        reservations: null,
        depart: null,
        retour: null,
        message: '',
        statusDepart: true,
        statusRetour: true,
        liste: null
    }
    componentDidMount() {
        this.getReservation()
    }
    getReservation() {
        axios.get('/reservations').then(response => {
            if (response.status === 200) {
                this.setState({
                    message: response.data.message,
                    reservations: response.data.reservation,
                    depart: response.data.depart,
                    retour: response.data.retour,
                    statusRetour: true,
                    statusDepart: true,
                    liste: response.data.liste
                })
            }
        })
    }
    // delete(id){
    //     axios.delete(`/reservations/${id}`)
    // }
    delete = (id) => {
        let val = parseInt(id)
        axios.delete(`/reservations/${val}`).then(response => {
            if (response.status === 204) {
                this.getReservation();
            }
        })
    }
    getDepart() {
        this.setState({
            statusRetour: false,
            statusDepart: true
        })
    }
    getRetour() {
        this.setState({
            statusDepart: false,
            statusRetour: true
        })
    }
    render() {

        return (
            <div>
                <div className="right_col" role="main">
                    <div>


                        <div className="clearfix"></div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="contentGeneral">
                                    <div class="panel2">
                                        {/* <div class="x_title">
                                            <span className="titreG">D??parts et Retours du jour</span>
                                            <span className="position-btn">
                                                <button className="btn-dep">D??parts / Retours du jours</button>
                                            </span>
                                        </div> */}
                                        {/* <div class="x_title">
                                            <span className="titreG">D??parts et Retours 7 jour</span>
                                            <span className="position-btn">
                                                <button className="btn-dep">D??parts / Retours 7 jours</button>
                                            </span>
                                        </div> */}
                                        {/* <div class="x_title">
                                            <span className="titreG">D??parts et Retours 30 jour</span>
                                            <span className="position-btn">
                                                <button className="btn-dep">Masquer les D??parts / Retours 30 jours <span className="number-text">X</span></button>
                                            </span>
                                        </div> */}
                                        <div className="x_content">
                                            <div className="listeBtn">
                                                <div>
                                                    <ul className="contenu-btn">
                                                        <li className="Value">
                                                            <button className="btn-depart" onClick={e => this.getReservation()}>
                                                                D??parts/Retours
                                                </button>
                                                        </li>
                                                        <li className="Value"><button className="btn-departs" onClick={e => this.getDepart()}>D??parts</button></li>
                                                        <li className="Value"> <button className="btn-departs" onClick={e => this.getRetour()}>Retours</button> </li>

                                                    </ul>
                                                    <p className="nbr-depart">
                                                        <span className="text-nbr">Nombre de d??parts :<span className="number-text">{this.state.depart}</span></span>
                                                        <span className="text-nbr"><br /></span>
                                                        <span className="text-nbr">Nombre de retours :<span className="number-text">{this.state.retour}</span></span>
                                                    </p>

                                                </div>

                                                <div className="d-flex">
                                                    <Formik
                                                        initialValues={{
                                                            dateDepart: '',
                                                            dateRetour: '',
                                                        }}

                                                        onSubmit={(values, { resetForm }) => {

                                                            axios.get(`/reservations/recherche/${values.dateDepart}/${values.dateRetour}`).then(response => {
                                                                if (response.status === 200) {
                                                                    this.setState({
                                                                        message: response.data.message,
                                                                        reservations: response.data.reservation,
                                                                        depart: response.data.depart,
                                                                        retour: response.data.retour
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <Form>
                                                            <div className="triage">
                                                                <label className="part-date">Trier par periode de retour  du : </label>
                                                                <Field type="date" name="dateDepart" />
                                                                <label className="part-date">jusqu'au : </label>
                                                                <Field type="date" name="dateRetour" />

                                                                <span className="bouton">
                                                                    <button type="submit" class="btn btn-secondary" id="bouton" data-toggle="tooltip" data-placement="left" title="Validation ">Rechercher</button>
                                                                </span>
                                                            </div>
                                                        </Form>

                                                    </Formik>
                                                </div>
                                            </div>
                                            {this.state.reservations ? (
                                                <div>
                                                    <table className="table-accueil">
                                                        <thead>
                                                            <tr className="th-accueil">
                                                                <th>V??hicule</th>
                                                                {/* {this.state.statusDepart ? (<th>d??part</th>) : null}
                                                                {this.state.statusRetour ? (<th>Retour</th>) : null} */}
                                                                {/* <th>Option</th> */}
                                                                <th>D??part</th>
                                                                <th>Retour</th>
                                                                <th>Total</th>
                                                                <th>Acompte</th>
                                                                <th>Nom</th>
                                                                <th>N?? de Vol</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(this.state.reservations).map(reservation => (

                                                                <>
                                                                    {this.state.statusRetour && this.state.statusDepart ? (
                                                                        <>
                                                                            <tr>
                                                                                <td colSpan="9">
                                                                                    <div className="date">
                                                                                        <p className='ml-5'>
                                                                                            Date Retour: <span className='ml-3'>{moment(`${reservation.toString()}`).format('dddd Do MMMM YYYY')}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                        </>
                                                                    ) : null}

                                                                    {Object.keys(this.state.reservations[reservation]).map(res => (
                                                                        <>
                                                                            {this.state.statusDepart && this.state.statusRetour === false && moment(this.state.reservations[reservation][res][0].date_depart).format() >= moment() ?
                                                                                <>
                                                                                    <p>nono</p>
                                                                                    <tr>
                                                                                        <td colSpan="9">
                                                                                            <div className="date">
                                                                                                <p className='ml-5'>

                                                                                                    Date Depart:
                                                                                                    <span className='ml-3'>
                                                                                                        {moment(`${this.state.reservations[reservation][res][0].date_depart.toString()}`).format('dddd Do MMMM YYYY')}
                                                                                                    </span>

                                                                                                </p>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr key={res}>
                                                                                        <td>
                                                                                            <img className="img-voiture" src={`http://fd0b515.online-server.cloud/${this.state.reservations[reservation][res][1].image.url}`} alt={this.state.reservations[reservation][res][1].marque} />


                                                                                            {this.state.reservations[reservation][res][1].marque}
                                                                                        </td>
                                                                                        {/* {this.state.statusDepart ? ( */}
                                                                                        <td>
                                                                                            <div>{moment(`${this.state.reservations[reservation][res][0].date_depart.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                            <div>{this.state.reservations[reservation][res][0].heure_depart}</div>
                                                                                        </td>
                                                                                        {/* ) : null} */}
                                                                                        {/* {this.state.statusRetour ? ( */}
                                                                                        <td>
                                                                                            <div>{moment(`${this.state.reservations[reservation][res][0].date_retour.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                            <div>{this.state.reservations[reservation][res][0].heure_retour}</div>
                                                                                        </td>
                                                                                        {/* ) : null} */}

                                                                                        <td>{this.state.reservations[reservation][res][0].prix}???</td>
                                                                                        <td>{this.state.reservations[reservation][res][0].acompte}???</td>
                                                                                        <td>{this.state.reservations[reservation][res][2].nom}</td>
                                                                                        <td>{this.state.reservations[reservation][res][0].numero_vol}</td>
                                                                                        <td>{this.state.reservations[reservation][res][0].status}</td>
                                                                                        <td>
                                                                                            <span className="text-black p-1 rounded bg-danger cursor-pointer" onClick={() => this.delete(res)}>Sup</span>
                                                                                            <Link onClick={() => window.location.href = `/devis/${parseInt(res)}`} >
                                                                                                <span className="text-black p-1 rounded bg-primary ml-2 cursor-pointer">Detail</span>

                                                                                            </Link>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                                : (
                                                                                    this.state.statusDepart === false && this.state.statusRetour && new Date(this.state.reservations[reservation][res][0].date_retour) >= Date.now() ?
                                                                                        (
                                                                                            <>
                                                                                                <tr>
                                                                                                    <td colSpan="9">
                                                                                                        <div className="date">
                                                                                                            <p className='ml-5'>
                                                                                                                Date Retour:
                                                                                                                <span className='ml-3'>
                                                                                                                    {moment(`${this.state.reservations[reservation][res][0].date_retour.toString()}`).format('dddd Do MMMM YYYY')}
                                                                                                                </span>

                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr key={res}>
                                                                                                    <td>

                                                                                                        <img
                                                                                                            className="img-voiture"
                                                                                                            src={`http://fd0b515.online-server.cloud/${this.state.reservations[reservation][res][1].image.url}`}
                                                                                                            alt={this.state.reservations[reservation][res][1].marque} />
                                                                                                        {this.state.reservations[reservation][res][1].marque}
                                                                                                    </td>
                                                                                                    {/* {this.state.statusDepart ? ( */}
                                                                                                    <td>
                                                                                                        <div>{moment(`${this.state.reservations[reservation][res][0].date_depart.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                                        <div>{this.state.reservations[reservation][res][0].heure_depart}</div>
                                                                                                    </td>
                                                                                                    {/* ) : null} */}
                                                                                                    {/* {this.state.statusRetour ? ( */}
                                                                                                    <td>
                                                                                                        <div>{moment(`${this.state.reservations[reservation][res][0].date_retour.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                                        <div>{this.state.reservations[reservation][res][0].heure_retour}</div>
                                                                                                    </td>
                                                                                                    {/* ) : null} */}
                                                                                                    {/* <td>Options</td> */}
                                                                                                    <td>{this.state.reservations[reservation][res][0].prix}???</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].acompte}???</td>
                                                                                                    <td>{this.state.reservations[reservation][res][2].nom}</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].numero_vol}</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].status}</td>
                                                                                                    <td>
                                                                                                        <span className="text-black p-1 rounded bg-danger cursor-pointer" onClick={() => this.delete(res)}>Sup</span>
                                                                                                        <Link onClick={() => window.location.href = `/devis/${parseInt(res)}`} >
                                                                                                            <span className="text-black p-1 rounded bg-primary ml-2 cursor-pointer">Detail</span>

                                                                                                        </Link>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </>
                                                                                        ) : (
                                                                                            this.state.statusDepart && this.state.statusRetour ? (
                                                                                                <tr key={res}>
                                                                                                    <td>

                                                                                                        <img
                                                                                                            className="img-voiture"
                                                                                                            src={`http://fd0b515.online-server.cloud/${this.state.reservations[reservation][res][1].image.url}`}
                                                                                                            alt={this.state.reservations[reservation][res][1].marque} />
                                                                                                        {this.state.reservations[reservation][res][1].marque}
                                                                                                    </td>
                                                                                                    {this.state.statusDepart ? (
                                                                                                        <td>
                                                                                                            <div>{moment(`${this.state.reservations[reservation][res][0].date_depart.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                                            <div>{this.state.reservations[reservation][res][0].heure_depart}</div>
                                                                                                        </td>
                                                                                                    ) : null}
                                                                                                    {this.state.statusRetour ? (
                                                                                                        <td>
                                                                                                            <div>{moment(`${this.state.reservations[reservation][res][0].date_retour.toString()}`).format('dddd Do MMMM YYYY')}</div>
                                                                                                            <div>{this.state.reservations[reservation][res][0].heure_retour}</div>
                                                                                                        </td>
                                                                                                    ) : null}
                                                                                                    {/* <td>Options</td> */}
                                                                                                    <td>{this.state.reservations[reservation][res][0].prix}???</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].acompte}???</td>
                                                                                                    <td>{this.state.reservations[reservation][res][2].nom}</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].numero_vol}</td>
                                                                                                    <td>{this.state.reservations[reservation][res][0].status}</td>
                                                                                                    <td>
                                                                                                        <span className="text-black p-1 rounded bg-danger cursor-pointer" onClick={() => this.delete(res)}>Sup</span>
                                                                                                        <Link onClick={() => window.location.href = `/devis/${parseInt(res)}`} >
                                                                                                            <span className="text-black p-1 rounded bg-primary ml-2 cursor-pointer">Detail</span>

                                                                                                        </Link>

                                                                                                    </td>
                                                                                                </tr>
                                                                                            ) : null
                                                                                        )

                                                                                )}

                                                                        </>
                                                                    ))}
                                                                </>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (<h3>Chargement</h3>)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accueil;









