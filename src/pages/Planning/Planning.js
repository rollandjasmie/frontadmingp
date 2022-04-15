import React from 'react'
import axios from '../../axios'
import './Planning.css'
import moment from 'moment'
import {
    ScheduleComponent,
    getWeekNumber,
    HeaderRowDirective,
    HeaderRowsDirective,
    ResourcesDirective,
    ResourceDirective,
    TimelineMonth,
    Inject,
    ViewsDirective,
    ViewDirective
} from '@syncfusion/ej2-react-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

class Planning extends React.Component {

    instance = new Internationalization()
    state = {
        categories: null,
        voiture: [],
        reservation: [],
        clients: [],
        imagevoiture: null
    }

    async componentDidMount() {
        await this.getCategories()
        await this.getReservation()
        await this.getVoiture()
        await this.getClient()
        await this.getImageVoiture()
    }

    async getImageVoiture() {
        await axios.get(`/categorieVehicule`).then(response => {
            if (response.status === 200) {
                this.setState({
                    imagevoiture: response.data
                })
                
            }
        })
    }

    async getCategories() {
        await axios.get(`/categories`).then(response => {
            if (response.status === 200) {
                this.setState({
                    categories: response.data
                });
                
            }
        });
    };
    async getClient() {
        await axios.get(`/clients`).then(response => {
            if (response.status === 200) {
                this.setState({
                    clients: response.data
                });
                
            }
        });
    };
    async getVoiture() {
        await axios.get(`/voitures`).then(response => {
            if (response.status === 200) {
                this.setState({
                    voiture: response.data
                });
                
            }
        });

    }
    async getReservation() {
        await axios.get(`reservation/liste`).then(response => {
            if (response.status === 200) {
                this.setState({
                    reservation: response.data
                });
                
            }

        });
    };
    

    getYearDetails(value) {
        return 'Year: ' + this.instance.formatDate(value.date, { skeleton: 'y' });
    }
    getMonthDetails(value) {
        return 'Month: ' + this.instance.formatDate(value.date, { skeleton: 'M' });
    }
    getWeekDetails(value) {
        return 'Week ' + getWeekNumber(value.date);
        ;
    }
    yearTemplate(props) {
        return (<span className="year">{this.getYearDetails(props)}</span>);
    }
    monthTemplate(props) {
        return (<span className="month">{this.getMonthDetails(props)}</span>);
    }
    weekTemplate(props) {
        return (<span className="week">{this.getWeekDetails(props)}</span>);
    }
    data(obj) {

        const filtreVoiture = this.state.voiture.filter(person => person.category_id === obj.id);
        const tab = []
        
        filtreVoiture && filtreVoiture.map(voiture => {
            const filtreResrvation = this.state.reservation.filter(res => res.voiture_id === voiture.id)
            
            if (filtreResrvation.length === 0) {
                console.log("nodataReservation")
            }
            else {
                filtreResrvation.map((resrvCat, key) => {
                    const Client = this.state.clients.filter(client => client.id === resrvCat.client_id)
                    
                    if (Client.length === 0) {
                        console.log("nodataClient")
                    }
                    else {
                        const res$key = {}
                        res$key["Id"] = key + 1
                        res$key["Subject"] = `${Client[0].nom} ${Client[0].prenom}. \n \n \n Le \n ${moment(resrvCat.date_depart).format('ll')}  \n \n \n au ${moment(resrvCat.date_retour).format('ll')}`
                        res$key["StartTime"] = new Date(`${resrvCat.date_depart} ${resrvCat.heure_depart}`)
                        res$key["EndTime"] = new Date(`${resrvCat.date_retour} ${resrvCat.heure_retour}`)
                        res$key["ResourceID"] = resrvCat.signe
                        res$key["Description"] = `Tel:\xa0${Client[0].telephone} \n EMail:\xa0${Client[0].email} \n 
                                                Lieu\xa0de\xa0Depart:\xa0${resrvCat.lieu_depart} \n Lieu\xa0d'Arrive:\xa0${resrvCat.lieu_retour}`
                        // res$key["Location"] = `${resrvCat.lieu_depart} au  ${resrvCat.lieu_retour}`   

                        tab.push(res$key)

                    }
                })
            }
        })
        
        return tab
    }

    stock(voiture, val) {
        const stockvoitur = []
        const filtrevoitur = this.state.voiture.filter(voit => voit.category_id === val.id)[0]
        const filtrereserv = this.state.reservation.filter(res => res.voiture_id === filtrevoitur.id)
        for (let i = 1; i <= voiture; i++) {
            const objet = {}
            let test = ''
            filtrereserv.map(v => {
                if (i === v.signe) {
                    switch (v.status) {
                        case 'Devis':
                            test = '#ff00ff'
                            break;
                        case 'Paye':
                            test = '#008000'
                            break;
                        case 'Devis/paiment total':
                            test = '#3daf04'
                            break;
                        case 'Devis/paiment partiel':
                            test = '#b3b300'
                            break;
                        case 'Paiment partiel':
                            test = '#ace600'
                            break;
                        default:
                            test = 'blue'
                    }

                }
            })
            objet['name'] = `Stock  ${i}`
            objet['id'] = i
            objet['color'] = test
            // objet['voi'] = test
            stockvoitur.push(objet)

        }
        
        return stockvoitur

    }

    render() {
        const categorye = this.state.categories
        const images = this.state.imagevoiture

        return (
            <>
            <br/>
                <div className="d-flex flex-row text-white mr-5">
                    <div className="d-flex flex-row ml-auto">
                        <div className="boxdevis mr-1">

                        </div>
                        <div>
                            <p>: Devis</p>

                        </div>
                    </div>
                    <div className="d-flex flex-row ml-auto">
                        <div className="boxdevispartiel mr-1">

                        </div>
                        <div>
                            <p>: Devis/paiment partiel</p>

                        </div>
                    </div>
                    <div className="d-flex flex-row ml-auto">
                        <div className="boxdevistotal mr-1">

                        </div>
                        <div>
                            <p>: Devis/paiment total</p>

                        </div>
                    </div>
                    <div className="d-flex flex-row ml-auto">
                        <div className="boxpaye mr-1">

                        </div>
                        <div>
                            <p>: Payer</p>

                        </div>
                    </div>
                    <div className="d-flex flex-row ml-auto">
                        <div className="boxpartiel mr-1">

                        </div>
                        <div>
                            <p>: Paiement partiel</p>

                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                {categorye && images ? categorye.map((value, key) => {
                    return (
                        <>
                            <div className="text-white">
                                <div className="d-flex align-items-start m-1">
                                    <fieldset>
                                        {images[key] ? <img className="images planning" src={
                                            `http://fd0b515.online-server.cloud/${images[key].image.url}`
                                        } alt={images[key].marque} /> :
                                            <p className='pa textes'>Aucun Voiture</p>}
                                    </fieldset>

                                    <div className="category">
                                        <h1>Categorie: {value.name} </h1>
                                        <span>Stock : {value.stock ? value.stock : 0} vehicule</span>
                                    </div>
                                </div>

                                {value.stock ?

                                    <ScheduleComponent width='100%' height='350px' selectedDate={new Date()} eventSettings={{ dataSource: this.data(value) }} group={{ resources: ['Resources'] }}>
                                        <HeaderRowsDirective height='5px'>
                                            <HeaderRowDirective option='Week' template={this.weekTemplate.bind(this)} />
                                            <HeaderRowDirective option='Date' />
                                        </HeaderRowsDirective>
                                        <ViewsDirective>
                                            <ViewDirective option='TimelineMonth' />
                                        </ViewsDirective>

                                        <ResourcesDirective>
                                            <ResourceDirective dataSource={this.stock(value.stock, value)} allowMultiple={true} field='ResourceID' title='Resource Name' name='Resources' textField='name' idField='id' colorField='color' />
                                        </ResourcesDirective>
                                        <Inject services={[TimelineMonth]} />
                                    </ScheduleComponent>
                                    :
                                    <div style={{ width: '100%', height: '100px', color: 'red' }}>
                                        <center>Les stock de vehicule est vide</center>
                                    </div>
                                }

                                <br /><br />
                            </div>
                        </>
                    )
                }) : <h1 className="text-white">Chargement ..........</h1>}
            </>
        )
    }

}
export default Planning;


// import './Planning.css'
// import * as React from 'react';
// import { TimelineViews, TimelineMonth, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

// import { extend } from '@syncfusion/ej2-base';
// // import { SampleBase } from './sample-base';
// import * as dataSource from './data.json';
// /**
//  * schedule timeline resource grouping sample
//  */
// class Planning extends React.Component {
//     constructor() {
//         super(...arguments);
//         this.data = extend([], dataSource.resourceData.concat(dataSource.timelineResourceData), null, true);
//         this.projectData = [
//             { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
//             { text: 'PROJECT 2', id: 2, color: '#56ca85' },
//             { text: 'PROJECT 3', id: 3, color: '#df5286' }
//         ];
//         this.categoryData = [
//             { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
//             { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
//             { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
//             { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
//             { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
//             { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
//         ];
//     }
//     render() {
//         return (<div className='schedule-control-section'>
//                 <div className='col-lg-12 control-section'>
//                     <div className='control-wrapper'>
//                         <ScheduleComponent cssClass='timeline-resource-grouping' width='100%' height='650px' selectedDate={new Date(2018, 3, 4)} currentView='TimelineWeek' eventSettings={{
//             dataSource: this.data
//         }} group={{ resources: ['Categories'] }}>
//                             <ResourcesDirective>
//                                 <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false} dataSource={this.projectData} textField='text' idField='id' colorField='color'>
//                                 </ResourceDirective>
//                                 <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true} dataSource={this.categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color'>
//                                 </ResourceDirective>
//                             </ResourcesDirective>
//                             <ViewsDirective>
//                                 {/* <ViewDirective option='TimelineDay'/> */}
//                                 <ViewDirective option='TimelineWeek'/>
//                                 {/* <ViewDirective option='TimelineWorkWeek'/>
//                                 <ViewDirective option='TimelineMonth'/>
//                                 <ViewDirective option='Agenda'/> */}
//                             </ViewsDirective>
//                             <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop]}/>
//                         </ScheduleComponent>
//                     </div>
//                 </div>
//             </div>);
//     }
// }

// export default Planning;