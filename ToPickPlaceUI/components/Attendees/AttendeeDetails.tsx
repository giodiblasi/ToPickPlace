import { Component } from "react";
import { Attendee, Topic } from "../../store/types";
import { Card, Tag, Button } from "@blueprintjs/core";

type Props = {
    attendee: AttendeeDetail,
    onEdit: () => void,
    onDelete: () => void
}

interface AttendeeDetail extends Omit<Attendee, 'topics'> {
    topics: Topic[]
}

export class AttendeeDetails extends Component<Props>{
    render() {
        const { attendee, onEdit, onDelete } = this.props;
        return <Card>
            <h2>{attendee.name} {attendee.surname} <Button icon="edit" onClick={() => onEdit()}></Button></h2>
            {attendee.bio ? <p>{attendee.bio}</p> : <p>No additional info</p>}
            <h4>Topics</h4>
            {attendee.topics
                .map((topic) => (
                    <Tag key={topic.id} round={true}>
                        {topic.name}
                    </Tag>))}
            <br/>
            <Button icon="trash" intent="danger" onClick={() => onDelete()}></Button>
        </Card>
    }
}