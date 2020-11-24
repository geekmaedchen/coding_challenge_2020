import React, { useState } from 'react'
import Tests from './tests.json'
import AggMeasur from './aggregated_measurements.json'
import ChartTest from './ChartTest'
import PopUp from './PopUp'

export default function App() {
  const [state, setState] = useState({ selected: null })

  return (
    <div>
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
            <tr
              id={test.test_id}
              key={test.test_id}
              onClick={(event) => clickOn(test.test_id, test.test_name)}
            >
              <td className="bold">{test.test_name}</td>
              <td className={findColor(AggMeasured(test.test_id).min)}>
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
      <div>{promptChart()}</div>
    </div>
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
  function clickOn(id, name) {
    setState({ selected: id, name: name })
  }

  function closePopup() {
    setState({ selected: null, name: null })
  }

  function promptChart() {
    if (state.selected !== null) {
      return (
        <PopUp closePopup={closePopup}>
          <ChartTest id={state.selected} name={state.name} />
        </PopUp>
      )
    }
  }
}
