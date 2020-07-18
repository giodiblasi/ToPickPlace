import { Component } from "react";
import { Topic, Attendee } from "../../store/types";
import { Button } from "@blueprintjs/core";

type Props = {
    topic: Topic | undefined
    attendees: Array<Attendee>,
    onEdit: (id: string)=>void,
    onDelete: ()=>void
}

export class TopicDetail extends Component<Props>{
    render(){
        const {topic, attendees, onEdit, onDelete} = this.props;
        if(!topic) return null;
        else{
           return <div>
                <h5>{topic.name}
                <Button icon="edit" onClick={()=>onEdit(topic.id)}></Button>
                <Button icon="remove" onClick={()=>onDelete()}></Button>
                </h5>
                <p>{topic.description}</p>
                {attendees
                    .filter(attendee=>attendee.topics?.includes(topic.id))
                    .map((attendee,i)=><div key={i}> {`${attendee.name} ${attendee.surname}`}</div> )}
            </div>
        }
    }
}