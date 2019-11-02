import * as React from 'react';
import { EventSummary } from '../../store/events/types';
import { MouseEventHandler } from 'react';

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