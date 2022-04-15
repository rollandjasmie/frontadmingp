import React, { Component } from 'react';
import GestionOF from './Components/GestionOF/GestionOF.js';
// import GeastionOE from './Components/GestionOE/GestionOE.js'
import GestionFE from './Components/GestionFE/GestionFE.js';
import GestionJF from './Components/GestionJF/GestionJF.js';
import { NavLink } from 'react-router-dom';

class GestionTemp extends Component {
    render() {
        return (
            <div>
            <NavLink to="/configuration_agence" >
                <button style= {{float:"right"}} class="text-white m-4 bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
            </NavLink>
            <GestionOF />
            
            {/* <GeastionOE /> */}
            
            <GestionFE />
            <GestionJF />
            </div>
        );
    }
}

export default GestionTemp;
