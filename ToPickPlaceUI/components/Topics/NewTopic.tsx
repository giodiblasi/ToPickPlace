import React, { Component, ChangeEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes, Button, Card } from "@blueprintjs/core";
import { MODALS, ModalState, AppState, Topic } from "../../store/types";
import { cancelOperation } from "../../store/actions/modal";
import { connect } from "react-redux";
import { saveTopic, updateTopic } from "../../store/actions/topics";
import { getSelectedTopic } from "../../store/selectors/selectAttendee";


type Props = {
    modalState: ModalState,
    cancelOperation: typeof cancelOperation,
    saveTopic: (eventid: string, attendee: Topic)=>void,
    eventId: string,
    topic?: Topic,
    modalType: MODALS
}

type TopicFormState = {
    description: string,
    name:string,
    id: string
}

class TopicForm extends Component<Props, TopicFormState>{
    constructor(props: Props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
        this.state = {
            id: this.props.topic?.id || '',
            name: this.props.topic?.name || '',
            description: this.props.topic?.description || '',
        }
    }

    handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    handleSumbmit(saveTopic: Function, eventId: string){
        saveTopic(eventId, {
            id: this.state.id,
            name: this.state.name,
            weigth: 1,
            description: this.state.description
        });
    }

    render(){
        
        const {modalState, cancelOperation, eventId, saveTopic, modalType} = this.props;
        return (
            <Modal
                title="Save Topic"
                isOpened={modalState.opened && modalState.type==modalType}
                cancelOperation={cancelOperation}>
                <Card>
                    <div>
                        <Label>
                            Name
                            <input className={Classes.INPUT} onChange={this.handleNameChange} value={this.state.name}/>
                        </Label>
                        <Label>
                            Description
                            <input className={Classes.INPUT} onChange={this.handleDescriptionChange} value={this.state.description}/>
                        </Label>
                        <Button intent="primary" onClick={()=>{this.handleSumbmit(saveTopic, eventId)}}>Save</Button>
                    </div>
                </Card>
            </Modal>
        )
    }
}

const mapStateToPropsNew = (state: AppState) => ({
    modalState: state.modal,
    eventId: state.events.selectedEvent.id,
    modalType: MODALS.NEW_TOPIC
});

const mapDispatchToPropsNew = (dispatch: Function) => ({
    cancelOperation: () => dispatch(cancelOperation()),
    saveTopic: (eventId: string, topic: Omit<Topic,'id'>) => dispatch(saveTopic(eventId, topic))

});


export const NewTopic =  connect(mapStateToPropsNew, mapDispatchToPropsNew)(TopicForm);


class UpdateTopicForm extends Component<Props, TopicFormState>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        return <TopicForm {...this.props} key={this.props.topic?.id || '0'} />;
    }
}

const mapStateToPropsUpdate = (state: AppState) => ({
    ...mapStateToPropsNew(state),
    topic: getSelectedTopic(state),
    modalType: MODALS.UPDATE_TOPIC
});

const mapDispatchToPropsUpdate = (dispatch: Function) => ({
    ...mapDispatchToPropsNew(dispatch),
    saveTopic: (eventId: string, topic: Topic) => dispatch(updateTopic(eventId, topic))
});

export const UpdateTopic = connect(mapStateToPropsUpdate, mapDispatchToPropsUpdate)(UpdateTopicForm);
