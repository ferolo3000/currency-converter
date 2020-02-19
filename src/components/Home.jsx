import React, { Component } from "react";
import axios from "axios";

import './styles.css';

export default class Converter extends Component {
    state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        currencies: [],
    };

    // Initializes the currencies with values from the Openrates API
    componentDidMount() {
        axios
            .get("https://alt-exchange-rate.herokuapp.com/latest")
            .then(response => {
                // Initialized with 'EUR' because the base currency is 'EUR'
                // and it is not included in the response
                const currencyAr = ["EUR"]
                for (const key in response.data.rates) {
                    currencyAr.push(key)
                }
                this.setState({ currencies: currencyAr.sort() })
            })
            .catch(err => {
                console.log("Oops, something broke with GET in componentDidMount() - we've got a: ", err.message);
            });
    }

    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios.get(`https://alt-exchange-rate.herokuapp.com/latest?base={this.state.fromCurrency}&symbols={this.state.toCurrency}`)
                .then(response => {
                    const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                    this.setState({ result: result.toFixed(5) })
                })
                .catch(err => {
                    console.log("Oops, something broke with GET in convertHandler() - we've got a: ", err.message);
                });
        } else {
            this.setState({ result: "You can't convert the same currency!" })
        }
    };

    // Updates the states based on the dropdown that was changed
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
        <div className="container">
            <div className="converter">
                <div className="row content-input">
                    <div className="inpunt-currency">
                        <p className="title">FROM</p>
                        <select
                        className="btn-from"
                        name="from"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.fromCurrency}>
                        {this.state.currencies.map(cur => (
                        <option key={cur}>{cur}</option>
                        ))}
                        </select>
                    </div>
                    <button className="swtich">&#171; &#187;</button>
                    <div className="output-currency">              
                        <p className="title">TO</p>                   
                        <select
                        className="btn-from"
                        name="to"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.toCurrency}>
                        {this.state.currencies.map(cur => (
                        <option key={cur}>{cur}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className="row content-result">
                    <div className="input-value">
                        <p className="title">AMOUNT</p>
                        <input
                        name="amount"
                        type="text"
                        value={this.state.amount}
                        onChange={event =>
                        this.setState({ amount: event.target.value })
                        }>
                        </input>
                    </div>
                    <div className="output-value">
                        <p className="title">RESULT</p>
                        <p className="content-output">1.025</p>
                        {this.state.result && 
                            <h3>{this.state.result}</h3>
                            }
                    </div>

                </div>       
                <button onClick={this.convertHandler}>Convert</button>           
            </div>
        </div>
        );
    }
}
//export default Converter;