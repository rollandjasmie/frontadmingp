import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import moment from 'moment'

export default class ChiffreAffaire extends Component {

  state = {
    dateMonment: moment(),
    reservation: [],
    showMonth: false,
    showYears: false,
    allmonths: moment.months()
  }
  constructor(props) {
    super(props)
  }
  months = moment.months();
  daysInMonths = () => {
    return this.state.dateMonment.daysInMonth(); // nombre de jour dans un moi
  }

  month = () => {
    return this.state.dateMonment.format("MMMM");
  };

  years = () => {
    return this.state.dateMonment.format("Y");
  };

  componentDidMount() {
    this.getResvation()
  }

  getResvation() {
    axios.get('/reservation/liste').then(res => {
      if (res.status === 200) {
        this.setState({
          reservation: res.data
        })
      }
    })
  }

  setMonth = month => {
    let monthNo = this.months.indexOf(month);// get month number 
    let dateMonment = Object.assign({}, this.state.dateMonment);
    dateMonment = moment(dateMonment).set("month", monthNo); // change month value
    this.setState({
      dateMonment: dateMonment // add to state
    });
  };

  setYear = year => {
    let dateMonment = Object.assign({}, this.state.dateMonment);
    dateMonment = moment(dateMonment).set("year", year);
    this.setState({
      dateMonment: dateMonment
    });
  };

  showMonth = (e, month) => {
    this.setState({
      showMonth: !this.state.showMonth
    });
  };

  showYear = (e) => {
    this.setState({
      showYears: !this.state.showYears
    });
  };

  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td key={data} className="m-1"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <a href="#">{this.capitalize(String(data))}</a>
        </td>
      );
    });
    let rows = [];
    let cells = [];
    months.forEach((row, i) => {
      if (i % 6 !== 0 || i == 0) { // except zero index 
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells); // add last row
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="table w-25 text-white border">
        <tbody>{monthlist}</tbody>
      </table>
    );
  }
  getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray
  }

  yearClick() {
    return <p className="text-white m-2"> Selection anne suivant ou precedent</p>
  }

  onPrev = () => {
    let curr = "";
    if (this.state.showYears == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateMonment: this.state.dateMonment.subtract(1, curr)
    });
  };

  onNext = () => {
    let curr = "";
    if (this.state.showYears == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateMonment: this.state.dateMonment.add(1, curr)
    });
  };

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  CA_Anne() {
    const trieAnne = this.state.reservation
      .filter(anne => moment(anne.update_at).format("Y") == this.state.dateMonment.format("Y"))
    let totalprixanne = 0
    trieAnne.map(anne => {
      totalprixanne = totalprixanne + anne.prix
    })
    return totalprixanne
  }

  CA_Moi() {
    const trieMois = this.state.reservation
      .filter(unmois => moment(unmois.update_at).format("MMMM Y") === this.state.dateMonment.format("MMMM Y"))
    let totalprixmoi = 0
    trieMois.map(moi => {
      totalprixmoi = totalprixmoi + moi.prix
    })
    return totalprixmoi
  }

  datas() {
    let reservation = this.state.reservation
    let datemoment = this.state.dateMonment
    const filtreMois = reservation.filter(unmois => moment(unmois.update_at).format("MMMM Y") === datemoment.format("MMMM Y"))
    const objetData = {}
    for (let i = 1; i <= this.daysInMonths(); i++) {
      let prix$i = 0
      filtreMois.map(res => {
        let jour = parseInt(moment(res.updated_at).format("D"))
        if (jour === i) {
          prix$i = prix$i + res.prix
        }
      })

      objetData[i] = prix$i
    }
    return objetData
  }

  render() {
    const data = {
      labels: Object.keys(this.datas()),
      datasets: [
        {
          label: 'CA',
          fill: true,
          lineTension: 0.3,

          borderColor: '#4834d4',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#4834d4',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#4834d4',
          pointHoverBorderColor: '#4834d4',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(this.datas())
          //data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    return (
      <div className="m-2">
        <center>
          <h1 className="text-white">CHIFFRE D'AFFAIRE (CA)</h1>
          <br />
          <div className="daty row">
            <span className=" text-white  col-md-4 cont-flesy" onClick={e => { this.onPrev() }}>
              <a href="#"><i class="fa fa-angle-left flesy"></i></a>
            </span>
            <span className="text-white  col-md-2 volana" onClick={e => { this.showMonth() }}>
              <a href="#">{this.capitalize(String(this.month()))}</a>
            </span>
            <span className="text-white col-md-2 taona " onClick={(e) => this.showYear()} >
              <a href="#"> {this.years()}</a>
            </span>
            <span className=" text-white  col-md-4 cont-flesy" onClick={e => { this.onNext() }}>
              <a href="#"><i class="fa fa-angle-right flesy"></i></a>
            </span>
          </div>
          {this.state.showYears && (
            <this.yearClick />
          )}
          {this.state.showMonth &&
            < this.MonthList data={moment.months()} />}
        </center>
        <br />
        <div className="m-3 d-flex justify-content-between">
          <h2>Totale Moi  {this.month()}: {this.CA_Moi()}</h2>
          <h2>Totale Anne {this.years()} : {this.CA_Anne()}</h2>
        </div>
        <div className='diagrame-line' style={{ background: "#161b36" }}>
          <Line data={data} height="80vh" />
        </div>
      </div>
    );
  }
};