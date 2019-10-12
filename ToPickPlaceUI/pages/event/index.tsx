import { NextPage, NextPageContext } from 'next';
import { AppState } from '../../store'
import { loadEvents } from '../../store/events/actions';
import { EventsActionTypes, EventsState } from '../../store/events/types';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import { Component } from 'react';

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({
  loadEvents: () => dispatch(loadEvents())
});

type Props = {
  events: EventsState
}


class Events extends Component<Props> {
   //@ts-ignore
  static getInitialProps = async ({ store, query }: NextPageContext) => {
    console.log(store)
    return {
     events:{
       availableEvents: []
     }
    }
  }

  render() {
    const { events } = this.props
    return (<div>Yeah</div>)
    
  }
}


// const Events: NextPage<{
//     events: EventsState
//  }> = ({events}) => (
//      <div></div>
//   );


// Events.getInitialProps = async ({ store }) => {
//     store.dispatch(loadEvents());
//     return {
//         events:[]
//     }
// }
export default connect(mapStateToProps, mapDispatchToProps)(Events);