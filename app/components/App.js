import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Alert from 'react-s-alert'
// mandatory
import 'react-s-alert/dist/s-alert-default.css'
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

import LocationInput from './LocationInput'
import Info from './Info'

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
    const mobile = width <= 500
    return (
      <div>
        <AppBar title="PicsByLocation" showMenuIconButton={false} />
        <br />
        <Info />
        <LocationInput mobile={mobile} />
        <Alert stack={{ limit: 3 }} />
      </div>
    )
  }
}
