import React, { Component } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import Measurements from './measurements.json'

export default class ChartTest extends Component {
  idFiltered(id) {
    const filtered = Measurements.filter((chartId) => chartId.test_id === id)
    return filtered[0]
  }

  componentDidMount() {
    let chart = am4core.create('chartdiv', am4charts.XYChart)

    // Set up data source
    chart.data = this.idFiltered(this.props.id).measurements

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'time'
    chart.yAxes.push(new am4charts.ValueAxis())

    // Create series
    var series1 = chart.series.push(new am4charts.LineSeries())
    series1.dataFields.valueY = 'value'
    series1.dataFields.categoryX = 'time'
    series1.name = 'Tests'
    series1.strokeWidth = 2
    series1.tensionX = 0.7
    series1.bullets.push(new am4charts.CircleBullet())

    this.chart = chart
  }

  componentDidUpdate() {
    this.chart.data = this.idFiltered(this.props.id).measurements
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  render() {
    return (
      <>
        <h2>{this.props.name}</h2>
        <div id="chartdiv" style={{ width: '100%', height: '80%' }}></div>
      </>
    )
  }
}
