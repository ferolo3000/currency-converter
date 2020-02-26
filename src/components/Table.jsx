import React from "react";

import "./styles.css"

class Table extends React.Component {

  render() {
    return (
      <table className="table table-coins table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center table-title pr-4 py-2">Currency</th>
            <th scope="col" className="text-center table-title pr-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {this.props.coinsTable.map((currency, k) => {
            return (
              <tr key={k}>
                <td className="text-center table-text">{currency.label}</td>
                <td className="text-center table-text">{currency.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
