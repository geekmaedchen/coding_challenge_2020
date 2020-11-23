import React from 'react'
import Tests from './tests.json'
import AggMeasur from './aggregated_measurements.json'
import ChartTest from './chartTest'

export default function App(id) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Minimum</th>
            <th>Average</th>
            <th>Maximum</th>
          </tr>
        </thead>
        <tbody>
          {Tests.map((test) => (
            <tr key={test.test_id}>
              <td>{test.test_name}</td>
              <td
                onClick={onClick}
                className={findColor(AggMeasured(test.test_id).min)}
              >
                {AggMeasured(test.test_id).min}
              </td>
              <td className={findColor(AggMeasured(test.test_id).average)}>
                {AggMeasured(test.test_id).average}
              </td>
              <td className={findColor(AggMeasured(test.test_id).max)}>
                {AggMeasured(test.test_id).max}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChartTest></ChartTest>
    </>
  )

  function AggMeasured(id) {
    const filtered = AggMeasur.filter((data) => data.test_id === id)
    return filtered[0]
  }

  function findColor(value) {
    if (value <= 49) {
      return 'normal'
    } else if (value <= 99) {
      return 'warning'
    } else if (value <= 149) {
      return 'serious_warning'
    } else if (value <= 200) {
      return 'critical_warning'
    }
  }

  function onClick() {
    window.alert(<ChartTest></ChartTest>)
  }
}
