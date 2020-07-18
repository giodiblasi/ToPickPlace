import { loadEvents, selectEvent, createEvent} from '../../store/actions/events';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';
import {printLabel,APP_TITLE } from '../../labels/events';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import EventContainer from '../../components/Event/EventContainer';
import { EventsState, AppState } from '../../store/types';
import ListSearch from '../../components/ListSearch';


const mapStateToProps = (state: AppState) => ({
  events:state.events
});

const mapDispatchToProps = (dispatch: Function) =>({
  loadEvents:  () => dispatch(loadEvents()),
  selectEvent: (eventId: string) => dispatch(selectEvent(eventId)),
  createEvent: (eventName: string) => dispatch(createEvent(eventName))
});

type Props = {
  events: EventsState,
  loadEvents: typeof loadEvents,
  selectEvent: typeof selectEvent,
  createEvent: typeof createEvent
}

class Events extends Component<Props> {

  static getInitialProps = async ({ store }: NextPageContextWithStore) => {
    await store.dispatch(loadEvents());
    return {
     events:{
       availableEvents: [],
       selectedEvent: {}
     }
    }
  }

  render() {
    const { events, selectEvent, createEvent } = this.props;
    return (
      <div>
        <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{printLabel(APP_TITLE)}</Navbar.Heading>
            <Navbar.Divider/>
            <ListSearch
              create={createEvent}
              items={events.availableEvents.map(e=>({id: e.id, display: e.name}))}
              onSelect={(id)=>selectEvent(id.toString())}>
              <Button text={events.selectedEvent.name || 'Select an event'} rightIcon="double-caret-vertical" />
            </ListSearch>
        </Navbar.Group>
      </Navbar>
      <div>
        <EventContainer/>
      </div>
    </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);