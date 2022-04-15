import React, { Component } from 'react'
import axios from '../../../axios'

class TrifDeBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saison: []
        }
    }
    componentDidMount() {
        this.getSaison();
    }

    getSaison = () => {
		axios.get('/saisons').then(response => {
			if (response.status === 200) {
				this.setState({
					saison: response.data

				})
				
			}
		})
    }
    render() {
        
        return (
            <>

            <div>
                <center>
                    <h1>Gestion des Saison</h1>
                    <br/>
                    {this.state.saison.map(saison => {
                            // return (
                                
                            //     <Link to={`/ajouterSaison/${(saison.nomSaison)}`}
                            //     className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                            //     transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            //     >
                            //     {saison.nomSaison}
                            //     </Link>
                            
                            // );
                        })}
                
                </center> 
            </div>
            </>
        )
    }
}

export default TrifDeBase;
