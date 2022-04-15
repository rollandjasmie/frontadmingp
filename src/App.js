import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar'
import Devis from './pages/Devis/Devis'
import CorrectDevis from './pages/Devis/CorrectDevis'
import Visuel from './pages/Devis/Visuel'
import Voitures from './pages/Category/Voitures/Voitures';
import Accueil from './pages/Accueil/Accueil';
import Categories from './pages/Category/Categories';
import Utilisateurs from './pages/Utilisateurs/Utilisateurs';
import DetailVoiture from './pages/Category/Voitures/DetailVoiture';
import Login from './pages/Login/Login';
import ClientMessage from './pages/Message/ClientMessage';
import Tarif from './pages/ConfigurationAgence/Tarif/Tarif';
import TarifPersonnaliser from './pages/ConfigurationAgence/Tarif/TarifPeronnaliser';
import Planning from './pages/Planning/Planning';
import ConfigurationAgence from './pages/ConfigurationAgence/ConfigurationAgence';
import GestionSaison from './pages/ConfigurationAgence/GestionSaison/GestionSaison';
import Editer from './pages/Category/Editer/Editer';
import Dashbord from './pages/Dashbord/Dashbord';
import Jours from './pages/ConfigurationAgence/Tarif/Jours/Jours';
import GestionTemp from './pages/ConfigurationAgence/GestionOF/GestionTemp'
import Reservation from './pages/Reservation/Reservation';
import AddTarif from './pages/ConfigurationAgence/Tarif/AddTarif';
import TarifDeBase from './pages/ConfigurationAgence/Tarif/TrifDeBase';
import AddSaison from './pages/ConfigurationAgence/GestionSaison/AddSaison';
import TarifList from './pages/ConfigurationAgence/Tarif/TarifList';
import Indexs  from './pages/ConfigurationAgence/GestionSaison/calendrier/Indexs';
import Partiel from './pages/ConfigurationAgence/Paiment/Partiel';
import Ajoutjour from './pages/ConfigurationAgence/GestionOF/Components/GestionJF/AjoutJour';
// import { loadCldr} from '@syncfusion/ej2-base';

// loadCldr(
// require('cldr-data/supplemental/numberingSystems.json'),
// require('cldr-data/main/fr-CH/ca-gregorian.json'),
// require('cldr-data/main/fr-CH/numbers.json'),
// require('cldr-data/main/fr-CH/timeZoneNames.json')
// );


// import Table from './pages/Tableau/Table';


class App extends React.Component {
  state = {
    categories: [],
    tarif: [],
    voiture: []
  }
  
  render() {
    const { isAuthenticated } = this.props;
   
    return (
      <Router>
        <>
          { isAuthenticated ?
            (
              <>
                <Navbar />
                <Sidebar />
                <div className="main-container">

                  <Switch>
                    <Route exact path="/categories" component={Categories} />

                    <Route exact path="/" component={Accueil} />
                    <Route exact path="/devis" component={Devis} />
                    <Route exact path="/devis/:id" component={CorrectDevis} />
                    <Route exact path="/devis/:id/visuel" component={Visuel}/>
                    <Route exact path="/voitures" component={Voitures} />
                    {/* <Route exact path="/parcourir" component={Parcourir} /> */}
                    <Route exact path="/editer" component={Editer} />
                    <Route exact path="/configuration_agence" component={ConfigurationAgence} />
                    <Route exact path="/gestion_saison" component={GestionSaison} />
                    <Route exact path="/voitures/detail/:id" component={DetailVoiture} />
                    <Route exact path="/utilisateurs" component={Utilisateurs} />
                    <Route exact path="/ClientMessage" component={ClientMessage} />
                    <Route exact path="/tarif" component={Tarif} />
                    <Route exact path="/ouverture" component={GestionTemp} />
                    <Route exact path="/tarifpersonnalise" component={TarifPersonnaliser} />
                    <Route exact path="/planning" component={Planning} />
                    <Route exact path="/dashbord" component={Dashbord} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/reservations" component={Reservation} />
                    <Route exact path="/ajoutjourferier" component={Ajoutjour} />
                    
                    {/* <Route path="/tarifpersonel/:id" component={TarifPersonel} /> */}
                    <Route path="/ajouter_un_tarif/:id" component={AddTarif} />
                    <Route path="/ajouterSaison/:id" component={AddSaison} />
                    <Route path="/paimentpartiel" component={Partiel} />
                    <Route path="/tarif_de_base" component={TarifDeBase} />

                    <Route path="/tarif_list" component={TarifList} />

                    <Route exact path="/voitures" component={Voitures} />
                    <Route exact path="/jours" component={Jours} />
                    <Route exact path="/categories/:id" component={Editer} />
                    <Route path="/calendrier" component={Indexs} />

                  </Switch>
                </div>
              </>
            ) : (
              <Switch>
                <Route exact path="*" component={Login} />
              </Switch>
            )
          }
        </>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth
  }
}

export default connect(mapStateToProps)(App);
