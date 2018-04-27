import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import GoogleMapLoader from 'react-google-maps-loader'
import GooglePlacesSuggest from 'react-google-places-suggest'
import axios from 'axios'
import convert from 'xml-js'
import MenuItem from 'material-ui/MenuItem'
import LinearProgress from 'material-ui/LinearProgress'
import PropTypes from 'prop-types'

import ImagesList from './ImagesList'

const GOOGLE_API_KEY = 'AIzaSyBmgrCoYFO4PjJPMQkNszSiXkdHTofpp5o'
const FLICKR_API_KEY = '83122fbcf792926c3d08db9cf5ce0ece' //eslint-disable-line

export default class LocationInput extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      searchQuery: '',
      value: '',
      images: [],
      loading: false
    }
  }

  handleSearch(event) {
    this.setState({
      value: event.target.value,
      searchQuery: event.target.value,
      images: []
    })
  }
  handleSelect(geocodedPrediction) {
    this.setState(
      {
        searchQuery: '',
        value: geocodedPrediction.formatted_address,
        loading: true
      },
      () => {
        const lat = geocodedPrediction.geometry.location.lat()
        const lng = geocodedPrediction.geometry.location.lng()

        axios
          .get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&lat=${lat}&lon=${lng}`
          )
          .then(response => {
            const json = convert.xml2js(response.data, { compact: true, spaces: 4 })
            this.setState({
              images: json.rsp.photos.photo,
              loading: false
            })
          })
      }
    )
  }

  render() {
    const { searchQuery, loading } = this.state
    return (
      <div>
        <GoogleMapLoader
          params={{
            key: GOOGLE_API_KEY,
            libraries: 'places,geocode'
          }}
          render={googleMaps =>
            googleMaps && (
              <GooglePlacesSuggest
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: searchQuery
                }}
                onSelectSuggest={this.handleSelect}
                customRender={prediction => (
                  <MenuItem>
                    {prediction ? prediction.description : 'My custom no results text'}
                  </MenuItem>
                )}
              >
                <div>
                  <TextField
                    value={this.state.value}
                    fullWidth
                    hintText="Search for a place"
                    onChange={this.handleSearch}
                  />
                  <br />
                </div>
              </GooglePlacesSuggest>
            )
          }
        />
        <br />
        <br />
        <LinearProgress style={loading ? {} : { display: 'none' }} mode="indeterminate" />
        <ImagesList images={this.state.images} mobile={this.props.mobile} />
      </div>
    )
  }
}

LocationInput.propTypes = {
  mobile: PropTypes.bool.isRequired
}
