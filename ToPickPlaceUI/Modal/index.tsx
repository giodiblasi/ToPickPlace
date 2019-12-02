import React from "react";
import { MODALS } from "../store/types";
import { Dialog } from "@blueprintjs/core";

type Props = {
    type: MODALS,
    isOpened: boolean,
    openedModal?: MODALS
}
export default class Modal extends React.Component<Props>{
    render(){
        const {type, isOpened, openedModal} = this.props;
        return isOpened && type == openedModal
            ? <Dialog isOpen = {isOpened}>{this.props.children}</Dialog>
            : null;
    }
}