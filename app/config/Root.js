import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../components/App'

const Root = () => {
  return (
    <MuiThemeProvider>
      <Router>
        <Switch>
          <Route path="/" component={App} exact />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default Root
