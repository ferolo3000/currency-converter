import React from "react";
import axios from "axios";

import "./styles.css"

class Converter extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            result: null,
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 1,
            currencies: [],
        }
  };

  componentDidMount() {
    axios.get("https://alt-exchange-rate.herokuapp.com/latest")
    .then(response => {
      const initCurrency = ["EUR"]
      for (const key in response.data.rates) {
        initCurrency.push(key)
      }
      this.setState({currencies: initCurrency.sort()})
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
                this.setState({ result: result.toFixed(5) })
            })
            .catch(err => {
                console.log("There is an error with convertHandler(), please check: ", err.message);
            });
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

render() {
  return ( 
  <div className="container-content">
    <div className="row">
        <div className="col-md-5 col-sm-12">
            <p className="title">FROM</p>
            <select
                className="btn-from"
                name="from"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.fromCurrency}>
                {this.state.currencies.map(currency => (
                    <option key={currency}>{currency}</option>
                ))}
            </select>
        </div>
        <div className="col-md-2 col-sm-12">
            <button>xx</button>
        </div>
        <div className="col-md-5 col-sm-12">            
            <p className="title">TO</p>                   
            <select
                className="btn-from"
                name="to"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.toCurrency}>
                {this.state.currencies.map(currency => (
                    <option key={currency}>{currency}</option>
                ))}
            </select>
        </div>
    </div>
    <div className="row"> 
        <div className="col-md-8 col-sm-8">
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
        <div className="col-md-4 col-sm-4">
                <button className="btn-convert"onClick={this.convertHandler}>Get</button>
        </div>
    </div>
    <div>
        {this.state.result && 
            <p className="result"><span style={{fontSize: "20px"}}>{this.state.amount} {this.state.fromCurrency} =</span><br/>
                <span style={{fontSize: "40px"}}>{this.state.result}</span> <span style={{fontSize: "20px"}}>{this.state.toCurrency}</span></p>
            }
    </div>        
        </div>
     )   
    }
}

export default Converter;

