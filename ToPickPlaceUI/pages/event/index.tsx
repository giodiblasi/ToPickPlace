import { NextPage, NextPageContext } from 'next';
import { AppState } from '../../store'
import { loadEvents } from '../../store/events/actions';
import { EventsActionTypes, EventsState } from '../../store/events/types';
import { Dispatch, Store } from 'redux';
import {connect} from 'react-redux';
import { Component } from 'react';
import {NextPageContextWithStore} from '../../utils/nextTypes';

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
  events:state.events
});

const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({
  loadEvents: () => {dispatch(loadEvents())}
});

type Props = {
  events: EventsState,
  loadEvents: typeof loadEvents
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
    const { events, loadEvents } = this.props;
    
    return (
      <div>
        {events.availableEvents.map(e=>e.description).join("-")}
        <button onClick={loadEvents}>Click Me</button>
      </div>)
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);