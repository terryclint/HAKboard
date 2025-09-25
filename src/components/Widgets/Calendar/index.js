import React, { Component } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import Axios from 'axios';
import ICAL from 'ical.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the dayjs Object
// to the correct localizer.
const localizer = dayjsLocalizer(dayjs);

class Calendar extends Component {
  state = { events: [] };

  componentDidUpdate() {
    const { events } = this.state;
    const { config } = this.props;
    const { refresh } = this.props;
    if ((!events.length && config) || refresh) {
      this.getCalendarEvents();
    }
  }

  getCalendarEvents = () => {
    console.log('Getting Calendar events');
    const { url } = this.props.config;
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    Axios.get(`${PROXY_URL}${url}`).then(({ data }) => {
      const jcalData = ICAL.parse(data);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      const array = vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        if (event.summary) {
          const startTime = dayjs(event.startDate.toJSDate());
          const endTime = dayjs(event.endDate.toJSDate());
          return {
            title: event.isAllDay ? event.summary : `${startTime.format('HH:mm')} - ${event.summary}`,
            start: startTime.toDate(),
            end: endTime.toDate(),
            allDay: event.isAllDay
          };
        }
        return null;
      }).filter(Boolean);

      this.setState({
        events: array
      });
    }).catch(error => {
      console.error('Calendar fetch error:', error);
    });
  };

  isAllDay = event => {
    const a = dayjs(event.start);
    const b = dayjs(event.start).startOf('day');

    const c = dayjs(event.end);
    const d = dayjs(event.start)
      .add(1, 'days')
      .startOf('day');

    return a.isSame(b) && c.isSame(d);
  };

  render() {
    const { events } = this.state;
    return (
      <div className='w-100 '>
        <BigCalendar
          localizer={localizer}
          step={10}
          length={10}
          events={events}
          startAccessor='start'
          endAccessor='end'
          views={['month']}
          drilldownView={null}
          toolbar={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config.widgets.calendar,
    refresh: state.config.refresh
  };
};

export default connect(mapStateToProps)(Calendar);
