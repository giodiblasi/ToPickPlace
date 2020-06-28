import React from "react";
import { Dialog } from "@blueprintjs/core";

type Props = {
    isOpened: boolean
    title: string,
    cancelOperation: Function
    
}

export default class Modal extends React.Component<Props>{
    render() {
        const { isOpened, title,cancelOperation } = this.props;

        return isOpened
            ? <Dialog
                title={title}
                isOpen={isOpened}
                onClose={()=>cancelOperation()}>
                {this.props.children}
                </Dialog>
            : null;
    }
    
}