import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import EditOption from './EditOption';



export default class ListeOptions extends Component {
    state = {
        etape: 1
    }

    componentDidMount() {
        const { action } = this.props;
        action.getOption();
    }

    changerEtape = (newEtape) => {
        this.setState({
            etape: newEtape
        });

    }
    render() {
        const etape = this.state.etape;
        const id = this.props.ids.id;
        const { options, action } = this.props;
       

        return (
            <div className="py-4">

                {etape === 2 ? (<EditOption ids={id} id={this.state.id} />) :
                    (<>
                        <h2>Liste des options</h2>
                        <div className="mt-2">
                            <table className="table-auto bg-gray-100">
                                <thead>
                                    <tr>

                                        <th className="border px-4 py-2">Titre</th>
                                        <th className="border px-4 py-2">Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {options && options.map(option => {
                                        return (
                                            <tr>
                                                <td className="border px-4 py-2">{option.libelle}</td>
                                                <td className="border px-4 py-2">{option.prix}</td>
                                                <td className="border px-4 py-2">
                                                    <label onClick={() => (this.changerEtape(2), this.setState({ id: option.id }))} >
                                                        <span className="text-blue-500 cursor-pointer">Editer</span> &nbsp;
                                                    </label>
                                                    <span className="text-red-500 cursor-pointer" onClick={() => action.deleteOption(option)}>X</span>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </>
                    )}


                <center>{options && options.length === 0 ? (<>Aucune option disponible pour le moment.</>) : null}</center>


            </div>





        )
    }
}
