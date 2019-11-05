import { AppState } from "../../store";
import React, { Dispatch, Component } from "react";
import { EventsActionTypes, Event } from "../../store/events/types";
import {connect} from 'react-redux';
import { SIDE_COLUMN, MIDDLE_COLUMN, styleLayout } from "../../style/layoutStyle";

type Props = {
    currentEvent: Event
}

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent} = this.props;
        return <div>
            <div>
                <div className={MIDDLE_COLUMN}>
                    <h3>Current Event: {currentEvent.description}</h3>
                </div>
                <div className={SIDE_COLUMN}>
                    <h3>attendees</h3>
                    {currentEvent.attendees.map(attendee=>(<div>{attendee.name}</div>))}
                </div>
            </div>
            <style jsx>{styleLayout}</style>
        </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    currentEvent: state.events.selectedEvent
});
  
const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);