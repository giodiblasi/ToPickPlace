import React, { Component, ChangeEvent, FormEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes } from "@blueprintjs/core";
import { MODALS, ModalState, AppState, Attendee } from "../../store/types";
import { cancelOperation } from "../../store/actions/modal";
import { connect } from "react-redux";
import { saveAttendee } from "../../store/actions/attendees";

type Props = {
    modalState: ModalState,
    cancelOperation: typeof cancelOperation,
    saveAttendee: typeof saveAttendee,
    eventId: string
}

type NewAttendeeState = {
    name: string,
    surname: string
}

class NewAttendee extends Component<Props, NewAttendeeState>{
    constructor(props: Props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
    }

    handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    handleSurnameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({surname: event.target.value});
    }

    handleSumbmit(saveAttendee: Function, event: FormEvent<HTMLFormElement>, eventId: string){
        saveAttendee(eventId, {
            name: this.state.name,
            surname: this.state.surname
        });
        event.preventDefault();
    }

    render(){
        const {modalState, cancelOperation, eventId, saveAttendee} = this.props;
        return (
            <Modal
                cancelOperation={() => cancelOperation()}
                submitOperation={() => { }}
                submitLabel="Save Attendee"
                isOpened={modalState.opened && modalState.type==MODALS.NEW_ATTENDEE}>
                <form onSubmit={(sumbitEvent)=>this.handleSumbmit(saveAttendee, sumbitEvent, eventId)}>
                    <Label>
                        Name
                        <input className={Classes.INPUT} onChange={this.handleNameChange}/>
                    </Label>
                    <Label>
                        Surname
                        <input className={Classes.INPUT} onChange={this.handleSurnameChange}/>
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
    saveAttendee: (eventId: string, attendee: Omit<Attendee,'id'>) => dispatch(saveAttendee(eventId, attendee))

});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttendee);