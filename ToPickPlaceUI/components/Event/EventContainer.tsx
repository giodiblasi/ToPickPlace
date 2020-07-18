import React, { Component } from "react";
import { connect } from 'react-redux';
import { MAIN_AREA, SIDE_AREA, BOTTOM_AREA, eventContainerLayout } from './eventContainerLayout';
import { Event, Attendee, Topic, AppState, ModalState, EventMap, Solution } from "../../store/types";
import { AttendeeDetails } from "../Attendees/AttendeeDetails";
import { selectAttendee, openNewAttendeeForm, openUpdateAttendeeForm, deleteAttendee } from "../../store/actions/attendees";
import { getSelectedAttendee, getSelectedTopic } from "../../store/selectors/selectAttendee";
import { selectTopic, openNewTopicForm, openUpdateTopicForm, deleteTopic} from "../../store/actions/topics";
import { cancelOperation } from "../../store/actions/modal";
import {NewAttendee, UpdateAttendee} from "../Attendees/NewAttendee";
import {NewTopic, UpdateTopic} from "../Topics/NewTopic";
import MapBoard from "../Map/MapBoard";
import { updateEventMap } from "../../store/actions/eventMap";
import { getSolution } from "../../store/actions/solution";
import SolutionBoard from "../Map/SolutionMap";
import MapTabs from "../Map/MapTabs";
import ListSearch from "../ListSearch";
import { Button } from "@blueprintjs/core";
import { TopicDetail } from "../Topics/TopicDetail";


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
    openUpdateAttendee: typeof openNewAttendeeForm,
    openNewTopic: typeof openNewTopicForm,
    openUpdateTopic: typeof openUpdateTopicForm,
    cancelOperation: typeof cancelOperation,
    updateEventMap: typeof updateEventMap,
    getSolution: typeof getSolution,
    solution: Solution,
    deleteAttendee: typeof deleteAttendee,
    deleteTopic: typeof deleteTopic,
}

class EventContainer extends Component<Props>{
    render() {
        const { currentEvent, attendees, topics,
            selectedAttendee, selectAttendee,
            selectedTopic, selectTopic,
            openNewAttendee, openUpdateAttendee,
            openNewTopic, openUpdateTopic,
            updateEventMap,
            getSolution,
            solution,
            deleteAttendee,
            deleteTopic} = this.props;
        return <div className="grid-container">
            <NewAttendee/>
            <NewTopic/>
            <UpdateAttendee/>
            <UpdateTopic/>
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
                    <Button intent="primary" onClick={() => openNewAttendee()} icon="add"/>
                    <ListSearch
                        items={attendees.map(a=>({id: a.id, display: `${a.name} ${a.surname}`}))}
                        onSelect={(attendeeId)=>selectAttendee(attendeeId.toString())}>
                            <Button text={selectedAttendee? selectedAttendee.name : 'Select an attendee'} rightIcon="double-caret-vertical" />
                        </ListSearch>
                    {selectedAttendee ? <AttendeeDetails
                        onEdit={()=>openUpdateAttendee()}
                        onDelete={()=>deleteAttendee(currentEvent.id, selectedAttendee.id)}
                        attendee={{
                            ...selectedAttendee,
                            topics: topics.filter(topic => (selectedAttendee.topics || []).includes(topic.id))
                        }}
                    /> : null}
                </div>
                <div>
                    <h3>Topics</h3>
                    <Button intent="primary" onClick={() => openNewTopic()} icon="add"/>
                    <ListSearch
                        items={topics.map(topic=>({id: topic.id, display: topic.name}))}
                        onSelect={(topicId)=>selectTopic(topicId.toString())}>
                            <Button text={selectedTopic? selectedTopic.name : 'Select a topic'} rightIcon="double-caret-vertical" />
                        </ListSearch>
                        {selectedTopic ? <TopicDetail
                            onEdit = {()=>openUpdateTopic()}
                            onDelete = {()=>deleteTopic(currentEvent.id, selectedTopic.id)}
                            topic={selectedTopic}
                            attendees={attendees}/>
                         : null }
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
    openUpdateAttendee: () => dispatch(openUpdateAttendeeForm()),
    cancelOperation: () => dispatch(cancelOperation()),
    openNewTopic: () => dispatch(openNewTopicForm()),
    updateEventMap: (id: string, map: EventMap) => dispatch(updateEventMap(id, map)),
    getSolution: () => dispatch(getSolution()),
    openUpdateTopic: ()=>dispatch(openUpdateTopicForm()),
    deleteAttendee: (eventId: string, attendeeId: string)=>dispatch(deleteAttendee(eventId, attendeeId)),
    deleteTopic: (eventId: string, topicId: string) => dispatch(deleteTopic(eventId, topicId))


});

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);