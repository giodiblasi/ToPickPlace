import { AppState } from "../../store";
import React, { Dispatch, Component } from "react";
import { EventsActionTypes, Event } from "../../store/events/types";
import {connect} from 'react-redux';
import {MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout} from './eventContainerLayout';

type Props = {
    currentEvent: Event
} 

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent} = this.props;
        return <div className="grid-container">    
                    <div className={MAIN_AREA}>
                        <h3>Current Event: {currentEvent.description}</h3>
                    </div>
                    <div className={SIDE_AREA}>
                        <h3>attendees</h3>
                        {currentEvent.attendees.map(attendee=>(<div>{attendee.name}</div>))}
                    </div>
                    <div className={BOTTOM_AREA}>
                        <p>List</p>
                    </div>
                    <style jsx>{eventContainerLayout}</style>
                </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    currentEvent: state.events.selectedEvent
});
  
const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);