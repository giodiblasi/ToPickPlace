import React, { Component, ChangeEvent, FormEvent } from "react";
import Modal from "../../Modal";
import { Label, Classes, MenuItem, Card, FormGroup, InputGroup, Button } from "@blueprintjs/core";
import { MODALS, ModalState, AppState, Attendee, Topic } from "../../store/types";
import { cancelOperation } from "../../store/actions/modal";
import { connect } from "react-redux";
import { saveAttendee } from "../../store/actions/attendees";
import { MultiSelect, ItemRenderer, IItemRendererProps } from "@blueprintjs/select";

type Props = {
    modalState: ModalState,
    cancelOperation: typeof cancelOperation,
    saveAttendee: typeof saveAttendee,
    eventId: string,
    topics: Topic[]
}

type NewAttendeeState = {
    name: string,
    surname: string,
    topics: Topic[]
}

const TopicTagSelect = MultiSelect.ofType<Topic>();

class NewAttendee extends Component<Props, NewAttendeeState>{
    constructor(props: Props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
        this.selectTopic= this.selectTopic.bind(this);
        this.removeTopic= this.removeTopic.bind(this);
        this.state={
            name: '',
            surname:'',
            topics:[]
        }
        
    }

    private selectTopic(topic: Topic) {
        const index = this.state.topics.findIndex(t=>t.id == topic.id);
        if(index==-1)
            this.setState({topics:[...this.state.topics, topic]});
        else{
            this.removeTopic("", index);
        }
    }

    private removeTopic(tag: string, index:number) {
        this.setState({topics: [...this.state.topics.slice(0,index),...this.state.topics.slice(index+1)]});
    }

    private handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    private handleSurnameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({surname: event.target.value});
    }

    private handleSumbmit(saveAttendee: Function, eventId: string){
        saveAttendee(eventId, {
            name: this.state.name,
            surname: this.state.surname,
            topics: this.state.topics.map(t=>t.id)
        });
    }

    private renderTopic: ItemRenderer<Topic> = (topic: Topic, renderProps: IItemRendererProps)=>{
        const {modifiers, handleClick} = renderProps;
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
                icon={this.state.topics.find(t=>t.id == topic.id) ? "tick" : "blank"}
            />
        );
    };

    

    render(){
        const {modalState, cancelOperation, eventId, saveAttendee, topics} = this.props;
        return (
            <Modal
                title="New Attendee"
                isOpened={modalState.opened && modalState.type==MODALS.NEW_ATTENDEE}
                cancelOperation = {cancelOperation}>
                
                <Card>
                    <div>
                        <Label>
                            Name
                            <input className={Classes.INPUT} onChange={this.handleNameChange}/>
                        </Label>
                        <Label>
                            Surname
                            <input className={Classes.INPUT} onChange={this.handleSurnameChange}/>
                        </Label>
                        <TopicTagSelect
                            items={topics}
                            itemRenderer={this.renderTopic}
                            tagRenderer = {topic=>topic.name}
                            onItemSelect = {this.selectTopic}
                            selectedItems = {this.state.topics}
                            tagInputProps={{
                                onRemove: this.removeTopic,    
                            }}
                            popoverProps={{position: "left"}}
                        />
                        <br/>
                        <br/>
                        <Button intent="primary" onClick={()=>{this.handleSumbmit(saveAttendee, eventId)}}>Save</Button>
                    </div>
                </Card>
            </Modal>
        )
    }
}


    
const mapStateToProps = (state: AppState) => ({
    modalState: state.modal,
    eventId: state.events.selectedEvent.id,
    topics: state.topics.availables
});

const mapDispatchToProps = (dispatch: Function) => ({
    cancelOperation: () => dispatch(cancelOperation()),
    saveAttendee: (eventId: string, attendee: Omit<Attendee,'id'>) => dispatch(saveAttendee(eventId, attendee))

});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttendee);