import { loadEvents, selectEvent} from '../../store/actions/events';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';
import SelectionList from '../../components/SelectionList';
import EventSummaryBox from '../../components/EventSummaryBox';
import {printLabel,APP_TITLE } from '../../labels/events';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import { IItemRendererProps } from '@blueprintjs/select';
import EventContainer from '../../components/Event/EventContainer';
import { EventSummary, EventsState, AppState } from '../../store/types';

const mapStateToProps = (state: AppState) => ({
  events:state.events
});

const mapDispatchToProps = (dispatch: Function) =>({
  loadEvents:  () => dispatch(loadEvents()),
  selectEvent: (eventId: string) => dispatch(selectEvent(eventId))
});

type Props = {
  events: EventsState,
  loadEvents: typeof loadEvents,
  selectEvent: typeof selectEvent
}

class Events extends Component<Props> {

  static getInitialProps = async ({ store }: NextPageContextWithStore) => {
    store.dispatch(loadEvents());
    return {
     events:{
       availableEvents: [],
       selectedEvent: {}
     }
    }
  }
  renderEvent = (event:EventSummary, {handleClick}: IItemRendererProps) => (
    <EventSummaryBox key={event.id} event={event} onClick={handleClick}></EventSummaryBox>
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
                <Button text={events.selectedEvent.description || 'Select an event'} rightIcon="double-caret-vertical" />
            </SelectionList>
        </Navbar.Group>
      </Navbar>
      <div>
        <EventContainer/>
      </div>
    </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);