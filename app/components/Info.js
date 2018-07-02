import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Info extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader title="About this site" actAsExpander showExpandableButton />
          <CardText expandable>
            Find images from Flickr based on location. This is a demo site made for my
            development/programming portfolio. Head to{' '}
            <a href="https://github.com/cobsa/PicsByLocation">Github</a> for more info.
          </CardText>
        </Card>
        <Card>
          <CardHeader
            title="Location API disabled in insecure context!"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            Google has disabled HTML location API for non-secure website, since this is a demo
            project https is not available and thus &quot;Use my location&quot; - function does not
            work
          </CardText>
        </Card>
      </div>
    )
  }
}
