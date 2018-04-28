import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import GoogleMapLoader from 'react-google-maps-loader'
import GooglePlacesSuggest from 'react-google-places-suggest'
import axios from 'axios'
import convert from 'xml-js'
import { geolocated } from 'react-geolocated'
import MenuItem from 'material-ui/MenuItem'
import LinearProgress from 'material-ui/LinearProgress'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import MyLocation from 'material-ui/svg-icons/maps/my-location'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Alert from 'react-s-alert'

import ImagesList from './ImagesList'

const GOOGLE_API_KEY = 'AIzaSyBmgrCoYFO4PjJPMQkNszSiXkdHTofpp5o'
const FLICKR_API_KEY = '83122fbcf792926c3d08db9cf5ce0ece'

class LocationInput extends Component {
  constructor(props) {
    super(props)
    this.getLocation = this.getPictures.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleMyLocation = this.handleMyLocation.bind(this)
    this.state = {
      searchQuery: '',
      value: '',
      images: [],
      loading: false
    }
  }

  getPictures(lat, lng) {
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

  handleMyLocation() {
    /* eslint-disable */
    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      const { latitude, longitude } = this.props.coords
      this.setState({
        loading: true,
        value: `Latitude: ${latitude} Longitude: ${longitude}`,
        images: []
      })

      this.getPictures(latitude, longitude)
    } else {
      Alert.error(<div>{this.props.positionError.message}</div>, {
        position: 'bottom',
        effect: 'scale',
        beep: false,
        timeout: 5000,
        offset: 0
      })
    }
    /* eslint-enable */
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
        this.getPictures(lat, lng)
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
                  <MenuItem>{prediction ? prediction.description : 'No results'}</MenuItem>
                )}
              >
                <div>
                  <TextField
                    style={{ width: '90%' }}
                    value={this.state.value}
                    hintText="Search for a place"
                    onChange={this.handleSearch}
                    onFocus={e => e.target.select()}
                  />
                  <IconButton onClick={this.handleMyLocation} tooltip="Use my location">
                    <MyLocation color={this.props.muiTheme.palette.primary1Color} />
                  </IconButton>
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
  mobile: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired
}

// Insert props from geolocation api to component
export default muiThemeable()(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })(LocationInput)
)
