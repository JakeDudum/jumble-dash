import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart2 extends Component {

  constructor(props) {
    super(props);
    this.chart2Ref = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.unsolved);
    this.chart2 = new Chart(this.chart2Ref.current, {
      type: 'bar',
      data: {
        //labels are task names or ids
        labels: this.props.tasks.map(task => task.task),
        //data needs to 
        datasets: [
          {
            label: "Unsolved Problems",
            backgroundColor: "#df4343",
            data: [40, 29]
          },
          {
            label: "Solved Problems",
            backgroundColor: "#379937",
            data: [26, 50]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      this.chart2.destroy();
      console.log(this.props);

      console.log("PROBLEMS WE HAVE", this.props.unsolved.length)
      console.log("counter",this.props.counter)

      this.chart2 = new Chart(this.chart2Ref.current, {
        type: 'bar',
        data: {
          labels: this.props.tasks.map(task => task.task),
          datasets: [
            {
              label: "Incomplete",
              backgroundColor: "#df4343",
              data: this.props.unsolved
            },
            {
              label: "Complete",
              backgroundColor: "#379937",
              data:  this.props.solved
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100
                }
              }
            ]
          }
        }
      });
    }
  }

  render() {
    return (
      <canvas className='chart' ref={this.chart2Ref} />
    )
  };

};

export default Chart2;