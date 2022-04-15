import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from '../../../axios';


export class TarifPeronnaliser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lire: false,
            categories: []
        };
    }

    componentDidMount() {
        axios.get('/categories').then(response => {
            if (response.status === 200) {
                this.setState({
                  category: response.data
              });
              
            }
          });
    }
    render() {
        
        return (
            <div>
            </div>
        )
    }
}

export default TarifPeronnaliser

 