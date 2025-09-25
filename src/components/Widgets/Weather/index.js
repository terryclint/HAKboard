import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactSVG } from 'react-svg';

class Weather extends Component {
  state = { data: null };
  componentDidUpdate() {
    const { data } = this.state;
    const { refresh } = this.props;
    if (!data || refresh) {
      this.getWeather();
    }
  }

  getWeather = () => {
    // Note: Dark Sky API was discontinued in 2023
    // This component needs to be updated to use a different weather API
    // such as OpenWeatherMap, WeatherAPI, or AccuWeather
    console.warn('Weather component needs updating: Dark Sky API is discontinued');

    // Placeholder data for demonstration
    const placeholderData = {
      currently: {
        icon: 'partly-cloudy-day',
        summary: 'Weather API unavailable',
        apparentTemperature: 20.5
      }
    };

    this.setState({ data: placeholderData });
  };

  render() {
    const { data } = this.state;
    if (!data) return null;
    console.log(data);
    console.log(data.currently.icon + '.svg');
    return (
      <div className='d-flex flex-fill flex-grow flex-column m-3 align-items-start'>
        <ReactSVG className='weather-icon' src={`/assets/icons/${data.currently.icon}.svg`} />
        <h6>{data.currently.summary}</h6>
        <h2>{data.currently.apparentTemperature.toFixed(1)}°C</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    refresh: state.config.refresh,
  };
};

export default connect(mapStateToProps)(Weather);
