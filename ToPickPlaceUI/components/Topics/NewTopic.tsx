import React, { Component, ChangeEvent, FormEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes } from "@blueprintjs/core";
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
    weigth: number
}

class NewTopic extends Component<Props, NewTopicState>{
    constructor(props: Props){
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleWeigthChange = this.handleWeigthChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
    }

    handleWeigthChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({weigth: parseInt(event.target.value)});
    }

    handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    handleSumbmit(event: FormEvent<HTMLFormElement>, eventId: string){
        saveTopic(eventId, {
            weight: this.state.weigth,
            description: this.state.description
        });
        event.preventDefault();
    }

    render(){
        const {modalState, cancelOperation, eventId, saveTopic} = this.props;
        return (
            <Modal
                cancelOperation={() => cancelOperation()}
                submitOperation={() => { }}
                submitLabel="Save Topic"
                isOpened={modalState.opened && modalState.type==MODALS.NEW_TOPIC}>
                <form onSubmit={(sumbitEvent)=>this.handleSumbmit(sumbitEvent, eventId)}>
                    <Label>
                        Name
                        <input className={Classes.INPUT} onChange={this.handleDescriptionChange}/>
                    </Label>
                    <Label>
                        Surname
                        <input className={Classes.INPUT} type="number" onChange={this.handleWeigthChange}/>
                    </Label>
                    <input type="submit" value="Submit" />
                </form>
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