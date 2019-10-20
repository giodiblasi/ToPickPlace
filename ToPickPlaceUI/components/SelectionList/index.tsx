import * as React from 'react';
import { Select, ItemRenderer } from "@blueprintjs/select";
import { EventSummary } from '../../store/events/types';

const EventSelect = Select.ofType<EventSummary>();

const filterEvents = (query:string, items: Array<EventSummary>): Array<EventSummary> =>
    items.filter(item=>item.description.toLowerCase().includes(query.toLowerCase()))

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
            filterable={true}
            itemListPredicate={filterEvents}
            onItemSelect={(item)=>onSelect(item.id)}>
               {children}
    </EventSelect>
    );
};

export default SelectionList;