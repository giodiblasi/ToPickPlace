import React, { Component } from "react";
import { connect } from 'react-redux';
import { MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout } from './eventContainerLayout';
import { Event, Attendee, Topic, AppState, ModalState, EventMap, Solution } from "../../store/types";
import { AttendeeDetails } from "../Attendees/AttendeeDetails";
import { selectAttendee, openNewAttendeeForm } from "../../store/actions/attendees";
import { getSelectedAttendee, getSelectedTopic } from "../../store/selectors/selectAttendee";
import { selectTopic, openNewTopicForm } from "../../store/actions/topics";
import { cancelOperation } from "../../store/actions/modal";
import NewAttendee from "../Attendees/NewAttendee";
import NewTopic from "../Topics/NewTopic";
import MapBoard from "../Map/MapBoard";
import { updateEventMap } from "../../store/actions/eventMap";
import { getSolution } from "../../store/actions/solution";
import SolutionBoard from "../Map/SolutionMap";
import { Tabs, Tab } from "@blueprintjs/core";
import MapTabs from "../Map/MapTabs";


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
    updateEventMap: typeof updateEventMap,
    getSolution: typeof getSolution,
    solution: Solution
}

class EventContainer extends Component<Props>{
    render() {
        const { currentEvent, attendees, topics,
            selectedAttendee, selectAttendee,
            selectedTopic, selectTopic,
            openNewAttendee, openNewTopic, updateEventMap, getSolution, solution } = this.props;
        return <div className="grid-container">
            <NewAttendee />
            <NewTopic />
            <div className={MAIN_AREA}>
                <div className = "item">
                    <MapTabs
                        drawMapPanel={<div>

                            {currentEvent.eventMap
                                ? <MapBoard
                                    map={currentEvent.eventMap}
                                    saveMap={(map) => updateEventMap(currentEvent.id, map)} />
                                : null
                            }</div>}

                        solutionMapPanel={<div>
                            {currentEvent.eventMap
                                ? <SolutionBoard
                                    attendee={attendees}
                                    map={currentEvent.eventMap}
                                    solution={solution}
                                    getSolution={() => getSolution()}>
                                </SolutionBoard>
                                : null}
                        </div>}></MapTabs>
                </div>


            </div>
            <div className={SIDE_AREA}>
                <div>
                    <h3>attendees</h3>
                    <button onClick={() => openNewAttendee()}>Add Attendee</button>
                    {attendees.map((attendee, index) => (<button key={`attendee${index}`} onClick={() => selectAttendee(attendee.id)}>{attendee.name}</button>))}
                    {selectedAttendee ? <AttendeeDetails
                        attendee={{
                            ...selectedAttendee,
                            topics: topics.filter(topic => (selectedAttendee.topics || []).includes(topic.id))
                        }}
                    /> : null}
                </div>
                <div>
                    <h3>Topics</h3>
                    <button onClick={() => openNewTopic()}>Add Topic</button>
                    {topics.map((topic, index) => (<button key={`topic${index}`} onClick={() => selectTopic(topic.id)}>{topic.name}</button>))}
                    {selectedTopic ? <div>Selected {selectedTopic.description}</div> : null}
                </div>
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
    modalState: state.modal,
    solution: state.solution
});

const mapDispatchToProps = (dispatch: Function) => ({
    selectAttendee: (id: string) => dispatch(selectAttendee(id)),
    selectTopic: (id: string) => dispatch(selectTopic(id)),
    openNewAttendee: () => dispatch(openNewAttendeeForm()),
    cancelOperation: () => dispatch(cancelOperation()),
    openNewTopic: () => dispatch(openNewTopicForm()),
    updateEventMap: (id: string, map: EventMap) => dispatch(updateEventMap(id, map)),
    getSolution: () => dispatch(getSolution())


});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);