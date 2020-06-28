import { Component } from "react";
import { Topic, Attendee } from "../../store/types";

type Props = {
    topic: Topic | undefined
    attendees: Array<Attendee>
}

export class TopicDetail extends Component<Props>{
    render(){
        const {topic, attendees} = this.props;
        if(!topic) return null;
        else{
           return <div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                {attendees
                    .filter(attendee=>attendee.topics?.includes(topic.id))
                    .map((attendee,i)=><div key={i}> {`${attendee.name} ${attendee.surname}`}</div> )}
            </div>
        }
    }
}