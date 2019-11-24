import { Component } from "react";
import { Attendee } from "../../store/types";
import { Card, Elevation } from "@blueprintjs/core";

type Props = {
    attendee: Attendee
}

export class AttendeeDetails extends Component<Props>{
    render(){
        const {attendee} = this.props;
        return  <Card interactive={true} elevation={Elevation.TWO}>
                    <h5>{attendee.name} {attendee.surname}</h5>
                    {attendee.bio ? <p>{attendee.bio}</p> : null}
                </Card>
    }
}