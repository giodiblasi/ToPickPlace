import { Component } from "react";
import { Attendee, Topic } from "../../store/types";
import { Card, Elevation, Tag, Button } from "@blueprintjs/core";

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
        return <Card interactive={true} elevation={Elevation.TWO}>
            <h5>{attendee.name} {attendee.surname}
                <Button icon="edit" onClick={() => onEdit()}></Button>
                <Button icon="remove" onClick={() => onDelete()}></Button>
            </h5>

            {attendee.bio ? <p>{attendee.bio}</p> : null}
            {attendee.topics
                .map((topic) => (
                    <Tag key={topic.id} round={true}>
                        {topic.name}
                    </Tag>))}
        </Card>
    }
}