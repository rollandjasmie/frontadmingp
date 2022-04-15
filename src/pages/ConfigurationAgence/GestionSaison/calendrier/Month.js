import React from 'react';
import moment from 'moment';
import Days from './Days'
import axios from '../../../../axios'

class Month extends React.Component {
    
    constructor (propos) {
        super(propos)
        this.state = {
            dateObj: moment(),
            datesaison: []
        }
    }
    async componentDidMount(){
        
        //await this.setMonth(this.props.month)
        await this.getDateSaison();
        
    }
    async getDateSaison () {
        await axios.get(`/date_saisons`).then(response => {
            if (response.status === 200) {
                this.setState({
                    datesaison: response.data,
                    
                });
               
            }
        });
    }

    weekdays = moment.weekdays();
    months  = moment.months();

    month = () => {
        return this.state.dateObj.format("MMMM") // Moi de la date aujourdhui
    }
    currentDate = () => {
        return this.state.dateObj.get("date");
    }
    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    listeJour = () => {
        const date = this.state.datesaison
        let hash = []
        date.map((date) =>{
            if((moment(date.debutsaison).format('Y') || moment(date.finsaison).format('Y')) === moment().format('Y')){
                let debut = moment(date.debutsaison)
                let fin = moment(date.finsaison)
                let saison = date.saison_id
                
                let anneD = parseInt(debut.format('Y'))
                let moisD = parseInt(debut.format('M'))
                let jourD = parseInt(debut.format('D'))
                let anneF = parseInt(fin.format('Y'))
                let moisF = parseInt(fin.format('M'))
                let jourF = parseInt(fin.format('D'))
                if (anneD === anneF){
                    if(moisD === moisF){
                        if(jourD <= jourF ){
                            for(let i = jourD; i <= jourF; i++ ){
                                let saison$i = {}
                                saison$i["anne"]= anneD
                                saison$i["mois"]= debut.format('MMMM')
                                saison$i["jour"] = i
                                saison$i["saison"] = saison
                                hash.push(saison$i)

                            }
                        }
                        else{
                            console.log("eureu")
                        }

                    }else if(moisF === moisD+1){
                        for(let j = jourD; j<= debut.daysInMonth(); j++ ){
                            let saison$j = {}
                            saison$j["anne"]= anneD
                            saison$j["mois"]= debut.format('MMMM')
                            saison$j["jour"] = j
                            saison$j["saison"] = saison
                            hash.push(saison$j)
                        }
                        for(let k=1; k<= jourF; k++){
                            let saison$k = {}
                            saison$k["anne"]= anneD
                            saison$k["mois"]= fin.format('MMMM')
                            saison$k["jour"] = k
                            saison$k["saison"] = saison
                            hash.push(saison$k)
                        }

                    }else if(moisF === moisD+2){
                        for(let jk = jourD; jk<= debut.daysInMonth(); jk++ ){
                            let saison$jk = {}
                            saison$jk["anne"]= anneD
                            saison$jk["mois"]= debut.format('MMMM')
                            saison$jk["jour"] = jk
                            saison$jk["saison"] = saison
                            hash.push(saison$jk)
                        }
                        for(let kl=1; kl<= debut.add(1, 'month').daysInMonth(); kl++){
                            let saison$kl = {}
                            saison$kl["anne"]= anneD
                            saison$kl["mois"]= debut.add(1, 'month').format('MMMM')
                            saison$kl["jour"] = kl
                            saison$kl["saison"] = saison
                            hash.push(saison$kl)
                        }
                        for(let l=1; l<= jourF; l++){
                            let saison$l = {}
                            saison$l["anne"]= anneD
                            saison$l["mois"]= fin.format('MMMM')
                            saison$l["jour"] = l
                            saison$l["saison"] = saison
                            hash.push(saison$l)
                        }
                    }

                }else if(anneD<anneF){
                    if(moisD===12){
                        for(let m = jourD; m<= debut.daysInMonth(); m++){
                            let saison$m = {}
                            saison$m["anne"]= anneD
                            saison$m["mois"]= debut.format('MMMM')
                            saison$m["jour"] = m
                            saison$m["saison"] = saison
                            hash.push(saison$m)

                        }
                    }else if(moisD===1){
                        for(let n = jourD; n<= debut.daysInMonth(); n++){
                            let saison$n = {}
                            saison$n["anne"]= anneD
                            saison$n["mois"]= debut.format('MMMM')
                            saison$n["jour"] = n
                            saison$n["saison"] = saison
                            hash.push(saison$n)

                        }
                        for(let o=1; o<= debut.add(1, 'month').daysInMonth(); o++){
                            let saison$o = {}
                            saison$o["anne"]= anneD
                            saison$o["mois"]= debut.add(1, 'month').format('MMMM')
                            saison$o["jour"] = o
                            saison$o["saison"] = saison
                            hash.push(saison$o)
                        }

                    }

                }
                else{
                    console.log("non")
                }
            }else{
                console.log("date n'existe")
            }

        });
        return hash
    }

    render() {
        let months = this.months.map((mon) => {
            const filtreMois = this.listeJour().filter(unmois => unmois.mois === mon)
            
            const filtreSaison1 = filtreMois.filter(sai => sai.saison === 1)
            const filtreSaison2 = filtreMois.filter(sai => sai.saison === 2)
            const filtreSaison3 = filtreMois.filter(sai => sai.saison === 3)

            const tab1 = []
            const tab2 = []
            const tab3 = []

            filtreSaison1.map(val=> {tab1.push(val.jour)})
            filtreSaison2.map(val=> {tab2.push(val.jour)})
            filtreSaison3.map(val=> {tab3.push(val.jour)})
            return (
                <>  
                    <tr key={mon}>
                        <td> {this.capitalize(String(mon))}</td>
                        <Days month ={mon} tableau1 ={tab1} tableau2 ={tab2} tableau3 ={tab3}/>
                    </tr>
                </>
            )  
        })
        return (
            <>
            {months}
            </>
            )
    }
}
 export default Month;

