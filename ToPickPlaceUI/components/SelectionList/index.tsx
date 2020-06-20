import * as React from 'react';
import { Select, ItemRenderer, ItemListPredicate } from "@blueprintjs/select";
import { EventSummary } from '../../store/types';


const EventSelect = Select.ofType<EventSummary>();

type Props = {
    eventsSummary: Array<EventSummary>,
    onSelect: (eventId:string)=>void,
    renderEvent: ItemRenderer<EventSummary>
}

const filterEvents:ItemListPredicate<EventSummary> =
    (query, events) => events.filter(event => event.name.toLowerCase().includes(query.toLowerCase()));

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