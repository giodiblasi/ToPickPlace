import * as React from 'react';
import { Select, ItemRenderer } from "@blueprintjs/select";
import { EventSummary } from '../../store/events/types';

const EventSelect = Select.ofType<EventSummary>();

type Props = {
    eventsSummary: Array<EventSummary>,
    onSelect: (eventId:string)=>void,
    renderEvent: ItemRenderer<EventSummary>
}
const SelectionList: React.FunctionComponent<Props> = ({
    onSelect,
    children,
    eventsSummary,
    renderEvent}) => {
    return (
        <EventSelect
            items={eventsSummary}
            itemRenderer={renderEvent}
            filterable={false}
            onItemSelect={(item)=>onSelect(item.id)}>
               {children}
    </EventSelect>
    );
};

export default SelectionList;