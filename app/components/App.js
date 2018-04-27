import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

import LocationInput from './LocationInput'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerWidth
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { width } = this.state
    const isMobile = width <= 500
    return (
      <div>
        <AppBar title="InstaNear" showMenuIconButton={false} />
        <br />
        <LocationInput mobile={isMobile} />
      </div>
    )
  }
}
