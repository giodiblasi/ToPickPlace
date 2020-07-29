import { Component } from "react";
import { Topic, Attendee } from "../../store/types";
import { Button, Card } from "@blueprintjs/core";

type Props = {
    topic: Topic | undefined
    attendees: Array<Attendee>,
    onEdit: (id: string) => void,
    onDelete: () => void
}


export class TopicDetail extends Component<Props>{
    getDescription(topic: Topic) {
        return !topic || topic.description == ''
            ? 'No Description'
            : topic.description;
    }
    render() {
        const { topic, attendees, onEdit, onDelete } = this.props;
        if (!topic) return null;
        else {
            return <Card>
                <h2>{topic.name}
                    <Button icon="edit" onClick={() => onEdit(topic.id)}></Button>
                </h2>
                <p>{this.getDescription(topic)}</p>
                <h4>Attendees</h4>
                {attendees
                    .filter(attendee => attendee.topics?.includes(topic.id))
                    .map((attendee, i) => <div key={i}> {`${attendee.name} ${attendee.surname}`}</div>)}
                <Button icon="trash" intent="danger" onClick={() => onDelete()}></Button>
            </Card>
        }
    }
}