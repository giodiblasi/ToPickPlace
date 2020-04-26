import React, { Component } from "react";
import { EventMap } from "../../store/types";
import { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE } from "./mapBoardLayout";
import { Button } from "@blueprintjs/core";
import { SAVE_MAP, printLabel } from "../../labels/events";
type Props = {
    map: EventMap
    saveMap: (map: EventMap) => void
}
type State = {
    map: EventMap
}

export default class MapBoard extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = { map: { ...this.props.map, availableSeats: [...this.props.map.availableSeats] } }
    }

    drawTable() {
        var map = this.state.map;
        var rows = [];
        for (let i = 0; i < map.heigth; i++) {
            var columns = [];
            for (let c = 0; c < map.width; c++) {
                const currentIndex = (i * map.width) + c;
                const currentValue = map.availableSeats[currentIndex];
                columns.push((
                    <td className={currentValue == 1 ? SEAT_AVAILABLE_STYLE : SEAT_BLOCKED_STYLE}
                        key={currentIndex}
                        onClick={() => {
                            map.availableSeats[currentIndex] = (currentValue == 1) ? 0 : 1;
                            this.forceUpdate();
                        }}>
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
                            onClick={()=>this.props.saveMap(this.state.map)}>{printLabel(SAVE_MAP)}</Button>
                    <style jsx>{mapBoardLayout}</style>
                </div>
            )
            : null;
    }
}