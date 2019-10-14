import * as React from 'react';
import { EventSummary } from '../../store/events/types';

type Props = {
    event: EventSummary,
    onSelect: (eventId:string)=>void
}
const EventSummaryBox: React.FunctionComponent<Props> = ({event, onSelect}) => {
    return (
        <div>
            <div onClick={()=>onSelect(event.id)}>{event.description}</div>
        </div>
    
    );
};

export default  EventSummaryBox;