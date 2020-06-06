import { Component } from "react";
import { Tabs, Tab } from "@blueprintjs/core";

type Props = {
    drawMapPanel: JSX.Element,
    solutionMapPanel: JSX.Element
}

type State = {
    activeTabId: string
}

export default class MapTabs extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            activeTabId: "drawMapContainer"
        };
    }

    handleChangeTab(newId: string){
        this.setState({activeTabId: newId})
    }

    render(){
        return (
            <Tabs id="mapSwitch" selectedTabId={this.state.activeTabId} onChange={(id:string)=>this.handleChangeTab(id)}>
            <Tab id="drawMapContainer" title="Draw Map" panel={this.props.drawMapPanel}></Tab>
            <Tab id="solutionContainer" title="SolutionMap" panel={this.props.solutionMapPanel}></Tab>
        </Tabs>
        );
    }
}