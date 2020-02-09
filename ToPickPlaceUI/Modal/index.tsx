import React from "react";
import { Dialog } from "@blueprintjs/core";

type Props = {
    isOpened: boolean,
    cancelOperation: ()=>void,
    submitOperation: ()=>void,
    submitLabel: String
}

export default class Modal extends React.Component<Props>{
    render() {
        const { isOpened, submitLabel, cancelOperation, submitOperation } = this.props;
        return isOpened
            ? <Dialog isOpen={isOpened}>
                {this.props.children}
                <button onClick ={ ()=>submitOperation()}>{submitLabel}</button>
                <button onClick ={ ()=>cancelOperation()}>Cancel</button>
                </Dialog>
            : null;
    }
}