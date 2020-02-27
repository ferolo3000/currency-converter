import React from "react";
import axios from "axios";
import Chart from 'chart.js';

import "./styles.css"

class Stats extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            fromCurrency: "USD",
            toCurrency: "EUR",
            coinsList: [],
        };

        this.chartRef = React.createRef();
        
  };

  componentDidMount() {
    this.getCurrencies();
    this.getChartsData();
  }

  getCurrencies = () => {
    axios.get("https://alt-exchange-rate.herokuapp.com/latest")
    .then(response => {
      const initCurrency = ["EUR"]
      for (const key in response.data.rates) {
        initCurrency.push(key)
      }
      this.setState({coinsList: initCurrency.sort()})
    })

    .catch(err => {
      console.log("There is an error with componentDidMount(), please check: ", err.message);
  });

  }

  selectHandler = (event) => {
    if (event.target.name === "from") {
        this.setState({ fromCurrency: event.target.value })
        this.getChartsData();
    }
    if (event.target.name === "to") {
      this.setState({ toCurrency: event.target.value })
      this.getChartsData();
  }
    this.getChartsData();
}


  getChartsData = () => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    if (this.state.fromCurrency !== this.state.toCurrency) {
        axios
      .get(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
      .then(response => {
        const chartLabels = Object.keys(response.data.rates);
        const chartData = Object.values(response.data.rates).map(rate => rate[this.state.toCurrency]);
        const chartLabel = `${this.state.fromCurrency}/${this.state.toCurrency}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(err => {
        console.log(
          "There is an error with getting data for chart, please check: ",
          err.message
        );
      });
      
    }
  }

  buildChart = (labels, data, label) => {
  
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: true,
            maintainAspectRatio: false,
            tension: 0,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)", 
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: '#fff'
          }
       },
        title: {
          display: true,
          fontColor: '#fff',
          text: 'Rate Comparison'
        }     ,
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#fff'
          },
        }],
          xAxes: [{
            ticks: {
              fontColor: '#fff'
          },
         }]
        } 
      }
    })
  }

  render(){
    return (
      <React.Fragment>
      <div className="container-content">
        <div className="row">
            <div className="col-md-6 col-sm-12">
              <p className="title">FROM</p>
              <select
                  className="btn-from"
                  name="from"
                  onChange={(event) => this.selectHandler(event)}
                  value={this.state.fromCurrency}>
                  {this.state.coinsList.map(currency => (
                      <option key={currency}>{currency}</option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 col-sm-12">            
                <p className="title">TO</p>                   
                <select
                    className="btn-to"
                    name="to"
                    onChange={(event) => this.selectHandler(event)}
                    value={this.state.toCurrency}>
                    {this.state.coinsList.map(currency => (
                        <option key={currency}>{currency}</option>
                    ))}
                </select>
            </div>
        </div>
      </div>  
        <div className="chart-container">
          <canvas className="chart-coins" ref={this.chartRef} />
        </div>
      </React.Fragment>
    )
  }

}


export default Stats;