import React, { Component, ChangeEvent, FormEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes, Button, Card } from "@blueprintjs/core";
import { MODALS, ModalState, AppState, Topic } from "../../store/types";
import { cancelOperation } from "../../store/actions/modal";
import { connect } from "react-redux";
import { saveTopic } from "../../store/actions/topics";


type Props = {
    modalState: ModalState,
    cancelOperation: typeof cancelOperation,
    saveTopic: typeof saveTopic,
    eventId: string
}

type NewTopicState = {
    description: string,
    name:string
}

class NewTopic extends Component<Props, NewTopicState>{
    constructor(props: Props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
    }

    handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    handleSumbmit(saveTopic: Function, eventId: string){
        saveTopic(eventId, {
            name: this.state.name,
            weigth: 1,
            description: this.state.description
        });
    }

    render(){
        const {modalState, cancelOperation, eventId, saveTopic} = this.props;
        return (
            <Modal
                title="New Topic"
                isOpened={modalState.opened && modalState.type==MODALS.NEW_TOPIC}
                cancelOperation={cancelOperation}>
                <Card>
                    <div>
                        <Label>
                            Name
                            <input className={Classes.INPUT} onChange={this.handleNameChange}/>
                        </Label>
                        <Label>
                            Description
                            <input className={Classes.INPUT} onChange={this.handleDescriptionChange}/>
                        </Label>
                        <Button intent="primary" onClick={()=>{this.handleSumbmit(saveTopic, eventId)}}>Save</Button>
                    </div>
                </Card>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    modalState: state.modal,
    eventId: state.events.selectedEvent.id
});

const mapDispatchToProps = (dispatch: Function) => ({
    cancelOperation: () => dispatch(cancelOperation()),
    saveTopic: (eventId: string, topic: Omit<Topic,'id'>) => dispatch(saveTopic(eventId, topic))

});

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);