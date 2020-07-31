import React, { Component } from "react";
import { EventMap, Solution, Attendee, Topic } from "../../store/types";
import { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE, SEAT_SELECTED_TOPIC } from "./mapBoardLayout";
import { Button } from "@blueprintjs/core";
import { printLabel, GET_SOLUTION } from "../../labels/events";

type Props = {
    map: EventMap,
    solution: Solution,
    attendee: Array<Attendee>,
    getSolution: () => void,
    selectedTopic?: Topic
}

type State = {
    map: EventMap
}

const AVAILABLE_SEAT = 1;

export default class SolutionBoard extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
    }

    getSeatStyle(value: number, attendee:Attendee|undefined, selectedTopic: Topic|undefined){
        if(attendee && selectedTopic && attendee.topics?.includes(selectedTopic.id)){
            return SEAT_SELECTED_TOPIC;
        }
        return value == AVAILABLE_SEAT ? SEAT_AVAILABLE_STYLE : SEAT_BLOCKED_STYLE;
    }

    drawTable() {
        var map = this.props.map;
        var rows = [];
        var currentAvailableSeat = -1;
        for (let i = 0; i < map.heigth; i++) {
            var columns = [];
            for (let c = 0; c < map.width; c++) {
                
                const currentIndex = (i * map.width) + c;
                const currentValue = map.availableSeats[currentIndex];
                let attendee = undefined;
                
                if(currentValue == AVAILABLE_SEAT){ 
                    currentAvailableSeat++;
                    const attendeeId = this.props.solution.seats[currentAvailableSeat];
                    attendee = this.props.attendee.find(x=>x.id==attendeeId);
                }
                
                columns.push((
                    <td className={this.getSeatStyle(currentValue, attendee, this.props.selectedTopic)}
                        key={currentIndex}>
                            {attendee?.name}
                    </td>))
            }
            rows.push((
                <tr key={`row${i}`}>
                    {columns}
                </tr>
            ))
        }
        return rows;
    }

    render() {
        return (typeof (window) != 'undefined')
            ? (
                <div>
                    <table>
                        <tbody>
                            {this.drawTable()}
                        </tbody>
                    </table>
                    <Button
                        intent = "primary"
                        onClick={() => this.props.getSolution()}>{printLabel(GET_SOLUTION)}
                    </Button>
                    <style jsx>{mapBoardLayout}</style>
                </div>
            )
            : null;
    }
}