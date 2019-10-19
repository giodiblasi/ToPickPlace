import { NextPage, NextPageContext } from 'next';
import { AppState } from '../../store'
import { loadEvents, selectEvent} from '../../store/events/actions';
import { EventsActionTypes, EventsState } from '../../store/events/types';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';
import SelectionList from '../../components/SelectionList';
import EventSummaryBox from '../../components/EventSummaryBox';
import {EVENTS,printLabel } from '../../labels/events';
import {styleLayout as layoutStyle, MIDDLE_COLUMN, SIDE_COLUMN} from './layoutStyle';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

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

  render() {
    const { events, selectEvent } = this.props;
    
    return (
      <div>
        <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>ToPickPlace</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
        <div className={SIDE_COLUMN}>
          <SelectionList title={printLabel(EVENTS)}>
            {events.availableEvents
            .map(event=>
              (<EventSummaryBox 
                  key={event.id}
                  event={event}
                  onSelect={selectEvent}/>))}
          </SelectionList>
        </div>
        <div className={MIDDLE_COLUMN}>
          Selection: {events.selectedEvent.description}
        </div>
        <style jsx>{layoutStyle}</style>
      </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);