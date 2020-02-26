import React from "react";

import "./styles.css"

class Stats extends React.Component {

  render() {
    return (
        <React.Fragment>
        <h1>This is a title</h1>
        <canvas ref={this.props.chartRef} />
        </React.Fragment>
    );
  }
}

export default Stats;