import { NextPage, NextPageContext } from 'next';
import { AppState } from '../../store'
import { loadEvents, selectEvent} from '../../store/events/actions';
import { EventsActionTypes, EventsState } from '../../store/events/types';
import { Dispatch, Store } from 'redux';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';
import SelectionList from '../../components/SelectionList';
import EventSummaryBox from '../../components/EventSummaryBox';
import {EVENTS,printLabel } from '../../labels/events';
import { eventNames } from 'cluster';

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
       availableEvents: []
     }
    }
  }

  render() {
    const { events, selectEvent } = this.props;
    
    return (
      <div>
        <SelectionList title={printLabel(EVENTS)}>
          {events.availableEvents
          .map(event=>
            (<EventSummaryBox 
                key={event.id}
                event={event}
                onSelect={selectEvent}/>))}
        </SelectionList>
        <div>Selection: {events.selectedEvent.description} </div>
      </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);