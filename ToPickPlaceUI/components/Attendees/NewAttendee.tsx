import React, { Component, ChangeEvent, FormEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes, MenuItem, Card, FormGroup, InputGroup, Button } from "@blueprintjs/core";
import { MODALS, ModalState, AppState, Attendee, Topic } from "../../store/types";
import { cancelOperation } from "../../store/actions/modal";
import { connect } from "react-redux";
import { saveAttendee, updateAttendee } from "../../store/actions/attendees";
import { MultiSelect, ItemRenderer, IItemRendererProps } from "@blueprintjs/select";
import { getSelectedAttendee } from "../../store/selectors/selectAttendee";

type Props = {
    modalState: ModalState,
    cancelOperation: typeof cancelOperation,
    saveAttendee: (eventid: string, attendee: Attendee)=>void,
    eventId: string,
    topics: Topic[],
    attendee?: Attendee,
    modalType: MODALS
}

type NewAttendeeState = {
    id?: string
    name: string,
    surname: string,
    topics: Topic[]
}

const TopicTagSelect = MultiSelect.ofType<Topic>();

class AttendeeForm extends Component<Props, NewAttendeeState>{
    constructor(props: Props) {

        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
        this.removeTopic = this.removeTopic.bind(this);
        this.state = {
            id: props.attendee?.id,
            name: props.attendee?.name || '',
            surname: props.attendee?.surname || '',
            topics: (props.attendee?.topics || []).reduce((result: Topic[], attendeeTopic: string) => {
                const topic = props.topics.find(x => x.id === attendeeTopic);
                return topic
                    ? result.concat(topic)
                    : result;
            }, [])
        }
        

    }

    private selectTopic(topic: Topic) {
        const index = this.state.topics.findIndex(t => t.id == topic.id);
        if (index == -1)
            this.setState({ topics: [...this.state.topics, topic] });
        else {
            this.removeTopic("", index);
        }
    }

    private removeTopic(tag: string, index: number) {
        this.setState({ topics: [...this.state.topics.slice(0, index), ...this.state.topics.slice(index + 1)] });
    }

    private handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    private handleSurnameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ surname: event.target.value });
    }

    private handleSumbmit(saveAttendee: Function, eventId: string) {
        saveAttendee(eventId, {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            topics: this.state.topics.map(t => t.id)
        });
    }

    private renderTopic: ItemRenderer<Topic> = (topic: Topic, renderProps: IItemRendererProps) => {
        const { modifiers, handleClick } = renderProps;
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                key={topic.id}
                onClick={handleClick}
                text={topic.name}
                shouldDismissPopover={false}
                icon={this.state.topics.find(t => t.id == topic.id) ? "tick" : "blank"}
            />
        );
    };



    render() {
        
        const { modalState, cancelOperation, eventId, saveAttendee, topics, modalType, attendee } = this.props;
        return (
            <Modal
                title={"New Attendee"}
                isOpened={modalState.opened && modalState.type == modalType}
                cancelOperation={cancelOperation}>

                <Card>
                    <div>
                        <Label>
                            Name
                            <input className={Classes.INPUT} onChange={this.handleNameChange} value={this.state.name} />
                        </Label>
                        <Label>
                            Surname
                            <input className={Classes.INPUT} onChange={this.handleSurnameChange} value={this.state.surname} />
                        </Label>
                        <TopicTagSelect
                            items={topics}
                            itemRenderer={this.renderTopic}
                            tagRenderer={topic => topic.name}
                            onItemSelect={this.selectTopic}
                            selectedItems={this.state.topics}
                            tagInputProps={{
                                onRemove: this.removeTopic,
                            }}
                            popoverProps={{ position: "left" }}
                        />
                        <br />
                        <br />
                        <Button intent="primary" onClick={() => { this.handleSumbmit(saveAttendee, eventId) }}>Save</Button>
                    </div>
                </Card>
            </Modal>
        )
    }
}




const mapStateToPropsNewAttendee = (state: AppState) => ({
    modalState: state.modal,
    eventId: state.events.selectedEvent.id,
    topics: state.topics.availables,
    modalType: MODALS.NEW_ATTENDEE
});

const mapDispatchToPropsNewAttendee = (dispatch: Function) => ({
    cancelOperation: () => dispatch(cancelOperation()),
    saveAttendee: (eventId: string, attendee: Omit<Attendee, 'id'>) => dispatch(saveAttendee(eventId, attendee))
});



export const NewAttendee = connect(mapStateToPropsNewAttendee, mapDispatchToPropsNewAttendee)(AttendeeForm);

class UpdateAttendeeForm extends Component<Props, NewAttendeeState>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        return <AttendeeForm {...this.props} key={this.props.attendee?.id || '0'} />;
    }
}

const mapStateToPropsUpdateAttendee = (state: AppState) => ({
    ...mapStateToPropsNewAttendee(state),
    attendee: getSelectedAttendee(state),
    modalType: MODALS.UPDATE_ATTENDEE
});

const mapDispatchToPropsUpdateAttendee = (dispatch: Function) => ({
    ...mapDispatchToPropsNewAttendee(dispatch),
    saveAttendee: (eventId: string, attendee:Attendee) => dispatch(updateAttendee(eventId, attendee))
});

export const UpdateAttendee = connect(mapStateToPropsUpdateAttendee, mapDispatchToPropsUpdateAttendee)(UpdateAttendeeForm);