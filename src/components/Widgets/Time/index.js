import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshView } from '../../../containers/actions';
import dayjs from 'dayjs';

class Time extends Component {
  state = { time: null };
  componentDidMount = () => {
    const time = dayjs().format('HH:mm');
    this.setState({ time });
    setTimeout(this.getNewTime, 1000);
  };

  getNewTime = () => {
    const { time } = this.state;
    const { config = {}, refreshView } = this.props;
    const { is24Hour = true, showSeconds = true } = config;
    const newTime = is24Hour ? dayjs().format('HH:mm') : dayjs().format('h:mm');
    const seconds = showSeconds ? dayjs().format('ss') : false;
    if (time !== newTime || seconds) this.setState({ time: newTime, seconds: seconds });
    if (dayjs().isSame(dayjs().startOf('hour'), 'second')) {
      refreshView(true);
      setTimeout(refreshView, 1000);
    }
    setTimeout(this.getNewTime, 1000);
  };

  render() {
    const { time, seconds } = this.state;
    return (
      <div className='d-flex flex-row pl-3'>
        <div className='d-flex flex-column'>
          <h1 style={{ color: '#fff' }}>{time}</h1>
        </div>
        <div className='d-flex flex-column mt-3'>
          <h4 style={{ color: '#fff' }}>{seconds}</h4>
          <h4 style={{ color: '#fff' }}>{dayjs().format('A')}</h4>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshView: (refresh) => {
      dispatch(refreshView(refresh));
    },
  };
};

export default connect(null, mapDispatchToProps)(Time);
