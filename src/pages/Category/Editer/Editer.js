import React, { Component } from 'react';
import DureeLocation from '././DureeLocation/DureeLocation';
import TarifDeBase from './TarifDeBase/TarifDeBase'
import { NavLink } from 'react-router-dom';


export default class Editer extends Component {
    state = {
        etape: 0
    };

    changerEtape = (newEtape) => {
        this.setState({
            etape: newEtape
        });
    }

    render() {
        //récupération de l'id de la catégorie
        const { match: { params } } = this.props;

        const etape = this.state.etape
        return (
            <>
            
            <div>
                
                <section className="text-gray-500 ">
                <NavLink to="/categories" >
                    <button  class="text-white bg-indigo-500 m-4 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                </NavLink>
                <div className="container mx-auto flex-wrap">
                    <div className="relative flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">Editer</h1>
                    </div>
                    <div>
                        <div>

                            {/* <div className="flex rounded-lg h-full bg-gray-800 p-5 flex-col">
                                <div className="flex">
                                    <button onClick={() => this.changerEtape(1)}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                            </div>
                                            <h2 className="text-white text-lg title-font font-medium">Caractéristiques du produit</h2>
                                        </div>

                                    </button>
                                </div>
                                {etape === 1 ? (<Caracteristique />) : null}

                            </div><br /> */}
                            <div className="flex rounded-lg h-full bg-gray-800 p-5 flex-col">
                                <button onClick={() => this.changerEtape(2)}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        </div>
                                        <h2 className="text-white text-lg title-font font-medium">Durée de location</h2>
                                    </div>

                                </button>
                                {etape === 2 ? (<DureeLocation ids={params} />) : null}
                            </div><br />



                            {/* <div className="flex rounded-lg h-full bg-gray-800 p-5 flex-col">
                                <button onClick={() => this.changerEtape(3)}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                                        </div>
                                        <h2 className="text-white text-lg title-font font-medium">Gestion des options</h2>
                                    </div>

                                </button> */}

                                {/* ids= id de la catégorie */}
                                {/* {etape === 3 ? (<Options ids={params} />) : null}
                            </div><br /> */}

                            <div className="flex rounded-lg h-full bg-gray-800 p-5 flex-col">
                                <button onClick={() => this.changerEtape(4)}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                                        </div>
                                        <h2 className="text-white text-lg title-font font-medium">Gestion des tarifs agence</h2>
                                    </div>

                                </button>
                                {etape === 4 ? (<TarifDeBase ids={params.id}/>) : null}
                            </div><br />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
        )
    }
}
