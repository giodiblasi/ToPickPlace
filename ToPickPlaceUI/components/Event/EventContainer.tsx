import React, { Component } from "react";
import {connect} from 'react-redux';
import {MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout} from './eventContainerLayout';
import { Event, Attendee, Topic, AppState } from "../../store/types";
import { AttendeeDetails } from "../Attendees/AttendeeDetails";
import { selectAttendee } from "../../store/actions/attendees";
import { getSelectedAttendee, getSelectedTopic} from "../../store/selectors/selectAttendee";
import { selectTopic } from "../../store/actions/topics";

type Props = {
    currentEvent: Event,
    attendees: Array<Attendee>,
    topics: Array<Topic>,
    selectedAttendee?: Attendee,
    selectAttendee: typeof selectAttendee,
    selectTopic: typeof selectTopic,
    selectedTopic?: Topic
} 

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent, attendees, topics, selectedAttendee, selectAttendee, selectedTopic, selectTopic} = this.props;
        return <div className="grid-container">    
                    <div className={MAIN_AREA}>
                        <h3>Current Event: {currentEvent.description}</h3>
                    </div>
                    <div className={SIDE_AREA}>
                        <h3>attendees</h3>
                        {attendees.map((attendee,index)=>(<button key={`attendee${index}`} onClick={()=>selectAttendee(attendee.id)}>{attendee.name}</button>))}
                        {selectedAttendee ? <AttendeeDetails attendee={selectedAttendee}/> : null}
                    </div>
                    <div className={BOTTOM_AREA}>
                        <h3>Topics</h3>
                        {topics.map((topic,index)=>(<button key={`topic${index}`} onClick={()=>selectTopic(topic.id)}>{topic.description}</button>))}
                        {selectedTopic ? <div>Selected {selectedTopic.description}</div> : null}
                    </div>
                    <style jsx>{eventContainerLayout}</style>
                </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    currentEvent: state.events.selectedEvent,
    attendees: state.attendees.availables,
    topics: state.topics.availables,
    selectedAttendee: getSelectedAttendee(state),
    selectedTopic: getSelectedTopic(state)
});
  
const mapDispatchToProps = (dispatch: Function)=>({
    selectAttendee: (id:string)=>dispatch(selectAttendee(id)),
    selectTopic: (id:string)=>dispatch(selectTopic(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);