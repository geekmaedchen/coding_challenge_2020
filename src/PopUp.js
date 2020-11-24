import React, { Component } from 'react'

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <button onClick={this.props.closePopup}>close</button>
          {this.props.children}
        </div>
      </div>
    )
  }
}
