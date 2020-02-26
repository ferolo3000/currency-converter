import React from "react";
import axios from "axios";
import Table from "./Table"

import "./styles.css"

class Converter extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            result: null,
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 1,
            coinsTable: [],
            coinsList: [],
            date:"",
        }
  };

  componentDidMount() {
    //this.getListData();
    this.getCurrencies();

  }

  getCurrencies = () => {
    axios.get("https://alt-exchange-rate.herokuapp.com/latest")
    .then(response => {
      const initCurrency = ["EUR"]
      for (const key in response.data.rates) {
        initCurrency.push(key)
      }
      this.setState({coinsList: initCurrency.sort()})
      this.setState({date: response.data.date})
    })

    .catch(err => {
      console.log("There is an error with componentDidMount(), please check: ", err.message);
  });

  }

  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
        axios.get(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
            .then(response => {
                const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                this.setState({ result: result.toFixed(3) })
            })
            .catch(err => {
                console.log("There is an error with convertHandler(), please check: ", err.message);
            });
            this.getListData();
    } else {
        this.setState({ result: "You can't convert the same currency!" })
    }
};

selectHandler = (event) => {
    if (event.target.name === "from") {
        this.setState({ fromCurrency: event.target.value })
    }
    if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value })
    }
}

handleChange = () => {
    this.setState({fromCurrency:this.state.toCurrency})
    this.setState({toCurrency:this.state.fromCurrency})
  }

  getListData = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
    axios.get(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.fromCurrency}`)
      .then(response => {
        const currList = ["EUR"];
        for (const key in response.data.rates) {
            currList.push({ label: key, value: (response.data.rates[key] * this.state.amount).toFixed(3) });
        }
        this.setState({
            coinsTable: currList.sort()
        });
      })
    }
  }


render() {
  return (
      <React.Fragment> 
<div>
    <h2 className="top-title">Currency Converter</h2>
  <div className="container-content">
    <div className="row">
        <div className="col-md-5 col-sm-12">
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
        <div className="col-md-2 col-sm-12 switch">
            <button className="switch-btn" onClick={this.handleChange}>&#8249; &#8250;</button>
        </div>
        <div className="col-md-5 col-sm-12">            
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
    <div className="row"> 
        <div className="col-md-5 col-sm-6">
            <p className="title">AMOUNT</p>
            <input
                className="input-amount"
                name="amount"
                type="text"
                value={this.state.amount}
                onChange={event =>
                    this.setState({ amount: event.target.value })
                }>
            </input>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5 col-sm-6">
            <p className="title date-text">DATE: {this.state.date}</p>
            <button className="btn-convert" onClick={this.convertHandler}>CONVERT</button>
        </div>
    </div>
        <div>
            {this.state.result && 
                <p className="result">{this.state.amount} {this.state.fromCurrency} = {this.state.result} {this.state.toCurrency}</p>
            }
        </div>        
    </div>
</div>
        <div>
            <p className="table-result">In other currencies {this.state.amount} {this.state.fromCurrency} is equals to: </p>
        </div>
        <Table coinsTable={this.state.coinsTable} />
        </React.Fragment>
     )   
    }
}

export default Converter;

