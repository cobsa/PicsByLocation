import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { GridList } from 'material-ui/GridList'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import ImageTile from './ImageTile'
import ImageDetails from './ImageDetails'

export default class ImageList extends PureComponent {
  constructor() {
    super()
    this.state = {
      selectedImage: {
        url: undefined,
        photoID: undefined
      },
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.selectImage = this.selectImage.bind(this)
  }
  handleClose() {
    this.setState({
      selectedImage: {
        url: undefined,
        photoID: undefined
      },
      open: false
    })
  }
  selectImage(url, photoID) {
    this.setState({
      open: true,
      selectedImage: {
        url,
        photoID
      }
    })
  }
  render() {
    const { images, mobile } = this.props

    const tiles = images.map(image => {
      const attributes = image['_attributes'] // eslint-disable-line
      const imageUrl = `https://farm${attributes.farm}.staticflickr.com/${attributes.server}/${
        attributes.id
      }_${attributes.secret}_b.jpg`
      return (
        <ImageTile
          photoID={attributes.id}
          key={imageUrl}
          url={imageUrl}
          title={attributes.title}
          selectImage={this.selectImage}
        />
      )
    })

    const actions = [<FlatButton label="Close" primary onClick={this.handleClose} />]
    return (
      <div>
        <GridList cols={mobile ? 1 : 3} cellHeight={360} padding={4}>
          {tiles}
        </GridList>
        <Dialog
          modal={false}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ImageDetails {...this.state.selectedImage} />
        </Dialog>
      </div>
    )
  }
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  mobile: PropTypes.bool.isRequired
}
