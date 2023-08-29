import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';

var Chart = require("chart.js")

class Chart1 extends Component {

  constructor(props) {
    super(props);
    this.chart1Ref = React.createRef();
    this.state = {
      id: props.projectID,
      budgetTotal: "",
      budgetDep: []
    }

  }

  componentDidMount() {
    this.chart1 = new Chart(this.chart1Ref.current, {
      type: 'doughnut',
      data: {
        labels: this.props.depts,
        datasets: [{
          data: [this.props.design, this.props.engineering, this.props.finance, this.props.hr, this.props.marketing, this.props.sales, this.props.security],
          backgroundColor: ['#e47676', '#ffb01d', '#b0fff4', '#6ec56e', '#9e9e9e', '#47b4b4', '#ffff89']
        }]
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total || this.props.budgetEdited > 0) {
      BudgetAPI.getBudget(this.props.projectID).then(res => {
        this.chart1.destroy();

        this.chart1 = new Chart(this.chart1Ref.current, {
          type: 'doughnut',
          data: {
            labels: this.props.depts,
            datasets: [{
              data: [res.data.Design, res.data.Engineering, res.data.Finance, res.data.HR, res.data.Marketing, res.data.Sales, res.data.Security],
              backgroundColor: ['#e47676', '#ffb01d', '#b0fff4', '#6ec56e', '#9e9e9e', '#47b4b4', '#ffff89']
            }]
          }
        });
      })
        .catch(err => console.log(err.message));
    }
  }

  render() {
    return (
      <div>
        <canvas id='chart1' className='chart' ref={this.chart1Ref} />
      </div>
    )
  };
};

export default Chart1;