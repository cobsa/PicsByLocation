import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'

export default class ImageTile extends Component {
  constructor() {
    super()
    this.handleLoad = this.handleLoad.bind(this)
    this.handleZoom = this.handleZoom.bind(this)

    this.state = {
      loaded: false
    }
  }
  handleLoad() {
    this.setState({
      loaded: true
    })
  }
  handleZoom() {
    this.props.selectImage(this.props.url)
  }
  render() {
    const { url, title } = this.props
    const { loaded } = this.state //eslint-disable-line
    return (
      <div>
        <GridTile
          style={loaded ? { maxHeight: '360px' } : { display: 'none' }}
          key={url}
          title={title || 'No title provided'}
          titlePosition="bottom"
          actionIcon={
            <IconButton onClick={this.handleZoom}>
              <ZoomIn color="white" />
            </IconButton>
          }
        >
          <img style={{ objectFit: 'cover' }} src={url} alt={url} onLoad={this.handleLoad} />

          <div
            style={
              this.state.loaded ? { display: 'none' } : { margin: '3px', backgroundColor: 'grey' }
            }
          />
        </GridTile>
      </div>
    )
  }
}

ImageTile.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectImage: PropTypes.func.isRequired
}
