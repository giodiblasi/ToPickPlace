import * as React from 'react';
import { MouseEventHandler } from 'react';
import { EventSummary } from '../../store/types/events';

type Props = {
    event: EventSummary,
    onClick: MouseEventHandler<HTMLElement>
}
const EventSummaryBox: React.FunctionComponent<Props> = ({event, onClick}) => {
    return (
        <div>
            <div onClick={onClick}>{event.description}</div>
        </div>
    
    );
};

export default  EventSummaryBox;