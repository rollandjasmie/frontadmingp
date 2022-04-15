import React from 'react'
import moment from 'moment';

class Days extends React.Component {
    state = {
        dateContext: moment(),
        datesaison: []
    }
    months  = moment.months();
    async componentDidMount(){  
        await this.setMonth(this.props.month)  
    }
    
    daysInMonths = () => {
        return this.state.dateContext.daysInMonth(); // nombre de jour dans un moi
    }
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // iteration 0, 1, ...6
        return firstDay;
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    afficheTab = jourMoi => {
        if (this.props.tableau2.includes(jourMoi) === true && this.props.tableau3.includes(jourMoi) === true){
            return "bg-green rounded"
        }else if (this.props.tableau2.includes(jourMoi) === true){
            return "bg-danger rounded"
        }else if (this.props.tableau3.includes(jourMoi) === true ){
            return "bg-warning rounded"
        }else{
            return "bg-primary rounded"
        }
    }

    setMonth = month => {
            let monthNo = this.months.indexOf(month);// get month number 
            let dateContext = Object.assign({}, this.state.dateContext);
            dateContext = moment(dateContext).set("month", monthNo); // change month value
            this.setState({
            dateContext: dateContext // add to state
            });
            
    };
    render(){
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
        blanks.push(<td className="emptySlot">
            {"  "}
        </td>);
        }
        
        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonths(); d++) {
            let className = this.afficheTab(d)
            daysInMonth.push(
                <div key={d} className= {className}  >
                    {d}
                </div>
            );
        }
        
        var totalSlots = [...blanks, ...daysInMonth];
        let trElement = totalSlots.map((jour, j) => {
            return (
                <td key={j*10} >
                    {jour}
                </td>
            )

        })
        return(
            <>
                {trElement}
            </>
       
        
        )
    }

}
export default Days;