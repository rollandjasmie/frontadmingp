import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ConfigurationAgence extends Component {
    render() {
        return (
            <div className="py-4">
                <NavLink to="/" >
                    <button class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                </NavLink>
                <section className="text-gray-700 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <h1 className="h1 text-center text-white mb-4">Configuration agence</h1>
                        </div>

                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <NavLink to="/ouverture" className="p-2 sm:w-1/2 w-full">
                                <div>
                                    <div className="bg-gray-200 rounded flex p-4 h-full items-center hover:bg-indigo-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Gestion des ouvertures/fermetures</span>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink to="/gestion_saison" className="p-2 sm:w-1/2 w-full">
                                <div>
                                    <div className="bg-gray-200 rounded flex p-4 h-full items-center hover:bg-indigo-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Gestion des saisons</span>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink to="/tarif" className="p-2 sm:w-1/2 w-full">
                                <div >
                                    <div className="bg-gray-200 rounded flex p-4 h-full items-center hover:bg-indigo-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium"> Tarifs personnalisés</span>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink to="/paimentpartiel" className="p-2 sm:w-1/2 w-full">
                                <div >
                                    <div className="bg-gray-200 rounded flex p-4 h-full items-center hover:bg-indigo-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Paiement partiel</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button> */}
                    </div>
                </section>
            </div >
        )
    }
}
