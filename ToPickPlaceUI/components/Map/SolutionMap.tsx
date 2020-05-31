import React, { Component } from "react";
import { EventMap, Solution, Attendee } from "../../store/types";
import { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE } from "./mapBoardLayout";
type Props = {
    map: EventMap,
    solution: Solution,
    attendee: Array<Attendee>
}
type State = {
    map: EventMap
}

export default class SolutionBoard extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
    }

    drawTable() {
        var map = this.props.map;
        var rows = [];
        var currentAvailableSeat = 0;
        for (let i = 0; i < map.heigth; i++) {
            var columns = [];
            for (let c = 0; c < map.width; c++) {
                const currentIndex = (i * map.width) + c;
                const currentValue = map.availableSeats[currentIndex];
                const _this = this;
                columns.push((
                    <td className={currentValue == 1 ? SEAT_AVAILABLE_STYLE : SEAT_BLOCKED_STYLE}
                        key={currentIndex}>
                            {function(){
                                if(currentValue == 1){
                                const id = _this.props.solution.seats[currentAvailableSeat]
                                currentAvailableSeat++;
                                    return _this.props.attendee.find(x=>x.id==id)?.name;
                                }
                                return '';
                            }()}
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
                    <style jsx>{mapBoardLayout}</style>
                </div>
            )
            : null;
    }
}