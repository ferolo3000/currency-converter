import React from "react";
import axios from "axios";

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
  return <div>
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
            <p className="title">RESULT</p>
                {this.state.result && 
                    <h3>{this.state.result}</h3>
                    }
            <button className="btn-convert"onClick={this.convertHandler}>Get</button>    
        </div>
    }
}

export default Converter;

