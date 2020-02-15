import * as React from 'react';
import { MouseEventHandler } from 'react';
import { EventSummary } from '../../store/types';

type Props = {
    event: EventSummary,
    onClick: MouseEventHandler<HTMLElement>
}
const EventSummaryBox: React.FunctionComponent<Props> = ({event, onClick}) => {
    return (
        <div>
            <div onClick={onClick}>{event.name}</div>
        </div>
    
    );
};

export default  EventSummaryBox;