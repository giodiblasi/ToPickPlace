import { AppState } from "../../store";
import React, { Dispatch, Component } from "react";
import { EventsActionTypes, Event } from "../../store/events/types";
import {connect} from 'react-redux';

type Props = {
    currentEvent: Event
}

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent} = this.props;
        return <div>
            <h3>Current Event: {currentEvent.description}</h3>
            <div>
                <h3>attendees</h3>
                {currentEvent.attendees.map(attendee=>(<div>{attendee.name}</div>))}
            </div>
        </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    currentEvent: state.events.selectedEvent
});
  
const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);