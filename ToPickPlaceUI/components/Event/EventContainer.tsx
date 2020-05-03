import React, { Component } from "react";
import { connect } from 'react-redux';
import { MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout } from './eventContainerLayout';
import { Event, Attendee, Topic, AppState, ModalState, EventMap } from "../../store/types";
import { AttendeeDetails } from "../Attendees/AttendeeDetails";
import { selectAttendee, openNewAttendeeForm } from "../../store/actions/attendees";
import { getSelectedAttendee, getSelectedTopic } from "../../store/selectors/selectAttendee";
import { selectTopic, openNewTopicForm } from "../../store/actions/topics";
import { cancelOperation } from "../../store/actions/modal";
import NewAttendee from "../Attendees/NewAttendee";
import NewTopic from "../Topics/NewTopic";
import MapBoard from "../Map/MapBoard";
import { updateEventMap } from "../../store/actions/eventMap";


type Props = {
    currentEvent: Event,
    attendees: Array<Attendee>,
    topics: Array<Topic>,
    selectedAttendee?: Attendee,
    selectAttendee: typeof selectAttendee,
    selectTopic: typeof selectTopic,
    selectedTopic?: Topic,
    modalState: ModalState,
    openNewAttendee: typeof openNewAttendeeForm,
    openNewTopic: typeof openNewTopicForm,
    cancelOperation: typeof cancelOperation,
    updateEventMap: typeof updateEventMap
}

class EventContainer extends Component<Props>{
    render() {
        const { currentEvent, attendees, topics,
            selectedAttendee, selectAttendee,
            selectedTopic, selectTopic,
            openNewAttendee, openNewTopic, updateEventMap } = this.props;
        return <div className="grid-container">
            <NewAttendee/>
            <NewTopic/>
            <div className={MAIN_AREA}>
                <h3>Current Event: {currentEvent.name}</h3>
                {currentEvent.eventMap
                    ?<MapBoard
                        map={currentEvent.eventMap}
                        saveMap={(map)=>updateEventMap(currentEvent.id, map)}/>
                    :null
                }
            </div>
            <div className={SIDE_AREA}>
                <h3>attendees</h3>
                <button onClick={() => openNewAttendee()}>Add Attendee</button>
                {attendees.map((attendee, index) => (<button key={`attendee${index}`} onClick={() => selectAttendee(attendee.id)}>{attendee.name}</button>))}
                {selectedAttendee ? <AttendeeDetails attendee={selectedAttendee} /> : null}
            </div>
            <div className={BOTTOM_AREA}>
                <h3>Topics</h3>
                <button onClick={() => openNewTopic()}>Add Topic</button>
                {topics.map((topic, index) => (<button key={`topic${index}`} onClick={() => selectTopic(topic.id)}>{topic.description}</button>))}
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
    selectedTopic: getSelectedTopic(state),
    modalState: state.modal
});

const mapDispatchToProps = (dispatch: Function) => ({
    selectAttendee: (id: string) => dispatch(selectAttendee(id)),
    selectTopic: (id: string) => dispatch(selectTopic(id)),
    openNewAttendee: () => dispatch(openNewAttendeeForm()),
    cancelOperation: () => dispatch(cancelOperation()),
    openNewTopic: () => dispatch(openNewTopicForm()),
    updateEventMap: (id: string, map: EventMap) => dispatch(updateEventMap(id, map))

});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);