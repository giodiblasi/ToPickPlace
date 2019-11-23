import React, { Dispatch, Component } from "react";
import {connect} from 'react-redux';
import {MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout} from './eventContainerLayout';
import { EventsActionTypes } from "../../store/actions/events/interfaces";
import { Event, Attendee, Topic, AppState } from "../../store/types";
import { AttendeeDetails } from "../Attendees/AttendeeDetails";
import { selectAttendee } from "../../store/actions/attendees";

type Props = {
    currentEvent: Event,
    attendees: Array<Attendee>,
    topics: Array<Topic>,
    selectedAttendee?: Attendee,
    selectAttendee: typeof selectAttendee
} 

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent, attendees, topics, selectedAttendee, selectAttendee} = this.props;
        return <div className="grid-container">    
                    <div className={MAIN_AREA}>
                        <h3>Current Event: {currentEvent.description}</h3>
                    </div>
                    <div className={SIDE_AREA}>
                        <h3>attendees</h3>
                        {attendees.map((attendee,index)=>(<button key={`attendee${index}`} onClick={()=>{console.log('click');selectAttendee(attendee.id)}}>{attendee.name}</button>))}
                        {selectedAttendee ? <AttendeeDetails attendee={selectedAttendee}/> : null}
                    </div>
                    <div className={BOTTOM_AREA}>
                        <h3>Topics</h3>
                        {topics.map((topic,index)=>(<div key={`topic${index}`}>{topic.description}</div>))}
                    </div>
                    <style jsx>{eventContainerLayout}</style>
                </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    currentEvent: state.events.selectedEvent,
    attendees: state.attendees.availables,
    topics: state.topics.availables,
    selectedAttendee: state.attendees.selected
});
  
const mapDispatchToProps = (dispatch: Function)=>({
    selectAttendee: (id:string)=>{console.log('dispatch'); return dispatch(selectAttendee(id))}
});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);