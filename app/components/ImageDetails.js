import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import convert from 'xml-js'

const FLICKR_API_KEY = '83122fbcf792926c3d08db9cf5ce0ece'

export default class ImageDetails extends Component {
  constructor() {
    super()
    this.state = {
      title: undefined,
      author: undefined,
      description: undefined,
      link: undefined,
      loading: true
    }
  }
  componentDidMount() {
    if (this.props.photoID) {
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&photo_id=${
            this.props.photoID
          }`
        )
        .then(response => {
          /* eslint-disable dot-notation */
          const json = convert.xml2js(response.data, { compact: true, spaces: 4 })
          const { photo } = json.rsp
          this.setState({
            title: photo.title['_text'],
            author: photo.owner['_attributes'].username,
            description: photo.description['_text'],
            link: photo.urls.url['_text'],
            loading: false
          })
          /* eslint-enable dot-notation */
        })
    }
  }

  render() {
    const { title, author, description, link, loading } = this.state
    if (loading) {
      return (
        <div>
          <img src={this.props.url} alt={this.props.url} style={{ width: '100%' }} />
        </div>
      )
    }
    return (
      <div>
        <div>
          <img src={this.props.url} alt={this.props.url} style={{ width: '100%' }} />
          <h2>{title}</h2>
          <br />
          Author: {author} <br />
          Description: {description || 'Not provided'} <br />
          <a href={link} target="_blank">
            Link
          </a>
          <br />
          <br />
        </div>
      </div>
    )
  }
}

ImageDetails.propTypes = {
  url: PropTypes.string,
  photoID: PropTypes.string
}
