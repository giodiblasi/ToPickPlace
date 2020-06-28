import { Select, ItemRenderer, ItemListPredicate, IItemRendererProps } from "@blueprintjs/select"
import { MouseEventHandler } from "react";

type SelectableItem = {
    id: string|number
    display: string
}

const ItemSelect = Select.ofType<SelectableItem>();

type Props = {
    items: Array<SelectableItem>,
    onSelect: (itemId:string|number)=>void,
}

const filterEvents:ItemListPredicate<SelectableItem> =
    (query, events) => events.filter(event => event.display.toLowerCase().includes(query.toLowerCase()));


const renderItem = (item:SelectableItem, {handleClick}: IItemRendererProps) => {
    return(
        <div key={item.id+' itemId'}>
            <div onClick={handleClick}>{item.display}</div>
        </div>
    )
}

const ListSearch: React.FunctionComponent<Props> = ({
    onSelect,
    children,
    items}) => {
    return (
        <ItemSelect
            items={items}
            itemRenderer={renderItem}
            filterable={true}
            itemListPredicate={filterEvents}
            onItemSelect={(item)=>onSelect(item.id)}>
               {children}
        </ItemSelect>
    );
};


export default ListSearch;

