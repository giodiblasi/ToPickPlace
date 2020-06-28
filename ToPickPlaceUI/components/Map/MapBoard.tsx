import React, { Component } from "react";
import { EventMap } from "../../store/types";
import { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE, TOP_AREA, MAIN_AREA, LEFT_AREA, RIGHT_AREA, BOTTOM_AREA } from "./mapBoardLayout";
import { Button } from "@blueprintjs/core";
import { SAVE_MAP, printLabel } from "../../labels/events";

type Props = {
    map: EventMap
    saveMap: (map: EventMap) => void
}
type State = {
    map: EventMap
}

enum Side {
    Left,
    Right,
    Bottom,
    Top
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

    addRow(side: Side.Bottom | Side.Top) {
        const newMap = side == Side.Bottom
            ? [...this.state.map.availableSeats].concat(new Array(this.state.map.width).fill(0))
            : new Array(this.state.map.width).fill(0).concat(this.state.map.availableSeats);
        this.setState({
            map: {
                availableSeats: newMap,
                width: this.state.map.width,
                heigth: this.state.map.heigth + 1
            }
        })
    }

    removeRow(side: Side.Bottom | Side.Top) {
        const newMap = side == Side.Bottom
            ? this.state.map.availableSeats.slice(0, -this.state.map.width)
            : this.state.map.availableSeats.slice(this.state.map.width);
        this.setState({
            map: {
                availableSeats: newMap,
                width: this.state.map.width,
                heigth: this.state.map.heigth - 1
            }
        })
    }

    addColumn(side: Side.Left | Side.Right) {
        const { width, heigth, availableSeats } = this.state.map;

        let newMap: Array<0 | 1> = [];
        const updateMap = side == Side.Left
            ? (i: number) => newMap = newMap.concat([0, ...availableSeats.slice(i, i + width)])
            : (i: number) => newMap = newMap.concat([...availableSeats.slice(i, i + width), 0]);

        for (let i = 0; i < heigth * width; i += width) {
            updateMap(i);
        }
        this.setState({
            map: {
                availableSeats: newMap,
                width: this.state.map.width + 1,
                heigth: this.state.map.heigth
            }
        });
    }

    removeColumn(side: Side.Left | Side.Right) {
        const { width, heigth, availableSeats } = this.state.map;

        let newMap: Array<0 | 1> = [];
        const updateMap = side == Side.Left
            ? (i: number) => newMap = newMap.concat(availableSeats.slice(i + 1, i + width))
            : (i: number) => newMap = newMap.concat(availableSeats.slice(i, i + width - 1));

        for (let i = 0; i < heigth * width; i += width) {
            updateMap(i);
        }
        this.setState({
            map: {
                availableSeats: newMap,
                width: this.state.map.width - 1,
                heigth: this.state.map.heigth
            }
        });
    }

    render() {
        return (typeof (window) != 'undefined')
            ? (
                <div className="map-container">
                    <div className={TOP_AREA}>
                        <div className="item-map">
                            <Button icon="add-row-top" intent="primary" onClick={() => this.addRow(Side.Top)}></Button>
                            <Button icon="remove-row-top" intent="danger" onClick={() => this.removeRow(Side.Top)}></Button>
                        </div>
                    </div>
                    <div className={MAIN_AREA}>
                        <table className="item-map">
                            <tbody>
                                {this.drawTable()}
                            </tbody>
                        </table>
                    </div>
                    <div className={BOTTOM_AREA}>
                        <div className="item-map">
                            <Button icon="add-row-bottom" intent="primary" onClick={() => this.addRow(Side.Bottom)}></Button>
                            <Button icon="remove-row-bottom" intent="danger" onClick={() => this.removeRow(Side.Bottom)}></Button>
                        </div>
                    </div>
                    <div className={LEFT_AREA}>
                        <div className="item-map">
                            <Button icon="add-column-left" intent="primary" onClick={() => this.addColumn(Side.Left)}></Button>
                            <Button icon="remove-column-left" intent="danger" onClick={() => this.removeColumn(Side.Left)}></Button>
                        </div>
                    </div>
                    <div className={RIGHT_AREA}>
                        <div className="item-map">
                            <Button icon="add-column-right"  intent="primary" onClick={() => this.addColumn(Side.Right)}></Button>
                            <Button icon="add-column-left" intent="danger" onClick={() => this.removeColumn(Side.Right)}></Button>
                        </div>
                    </div>
                    <Button
                        intent="primary"
                        onClick={() => this.props.saveMap(this.state.map)}>{printLabel(SAVE_MAP)}
                    </Button>
                    <style jsx>{mapBoardLayout}</style>
                </div>
            )
            : null;
    }
}