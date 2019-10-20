import { NextPage, NextPageContext } from 'next';
import { AppState } from '../../store'
import { loadEvents, selectEvent} from '../../store/events/actions';
import { EventsActionTypes, EventsState, EventSummary } from '../../store/events/types';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';
import SelectionList from '../../components/SelectionList';
import EventSummaryBox from '../../components/EventSummaryBox';
import {SELECT_EVENT,printLabel,APP_TITLE } from '../../labels';
import {styleLayout as layoutStyle, MIDDLE_COLUMN, SIDE_COLUMN} from './layoutStyle';
import { Navbar, Alignment, Button, Label } from '@blueprintjs/core';

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
  events:state.events
});

const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({
  loadEvents: () => {dispatch(loadEvents())},
  selectEvent: (eventId:string)=> dispatch(selectEvent(eventId))
});

type Props = {
  events: EventsState,
  loadEvents: typeof loadEvents,
  selectEvent: typeof selectEvent
}

class Events extends Component<Props> {

  static getInitialProps = async ({ store, query }: NextPageContextWithStore) => {
    store.dispatch(loadEvents());
    return {
     events:{
       availableEvents: [],
       selectedEvent: {}
     }
    }
  }
  renderEvent = (event:EventSummary, {handleClick}) => (
    <EventSummaryBox event={event} onSelect={handleClick}></EventSummaryBox>
  )
  render() {
    const { events, selectEvent } = this.props;
    
    return (
      <div>
        <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{printLabel(APP_TITLE)}</Navbar.Heading>
            <Navbar.Divider/>
            <SelectionList
              onSelect={selectEvent}
              eventsSummary={events.availableEvents}
              renderEvent={this.renderEvent}>
                <Button text={events.selectedEvent.description || printLabel(SELECT_EVENT)} rightIcon="double-caret-vertical" />
            </SelectionList>
        </Navbar.Group>
      </Navbar>
        <div className={SIDE_COLUMN}>
          
        </div>
        <div className={MIDDLE_COLUMN}>
          Selection: {events.selectedEvent.description}
        </div>
        <style jsx>{layoutStyle}</style>
      </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
Menlo, Monaco, 'Courier New', monospace