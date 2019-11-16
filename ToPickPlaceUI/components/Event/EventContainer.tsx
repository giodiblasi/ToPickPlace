import { AppState } from "../../store";
import React, { Dispatch, Component } from "react";
import {connect} from 'react-redux';
import {MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout} from './eventContainerLayout';
import { EventsActionTypes } from "../../store/actions/events/interfaces";
import { Event, Attendee, Topic } from "../../store/types/events";

type Props = {
    currentEvent: Event,
    attendees: Array<Attendee>,
    topics: Array<Topic>
} 

class EventContainer extends Component<Props>{
    render(){
        const {currentEvent, attendees, topics} = this.props;
        return <div className="grid-container">    
                    <div className={MAIN_AREA}>
                        <h3>Current Event: {currentEvent.description}</h3>
                    </div>
                    <div className={SIDE_AREA}>
                        <h3>attendees</h3>
                        {attendees.map((attendee,index)=>(<div key={`attendee${index}`}>{attendee.name}</div>))}
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
    topics: state.topics.availables
});
  
const mapDispatchToProps = (dispatch: Dispatch<EventsActionTypes>)=>({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);