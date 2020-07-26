import { Select, ItemRenderer, ItemListPredicate, IItemRendererProps } from "@blueprintjs/select"
import { MenuItem } from "@blueprintjs/core";

type SelectableItem = {
    id: string | number
    display: string
}

const ItemSelect = Select.ofType<SelectableItem>();

type Props = {
    items: Array<SelectableItem>,
    onSelect: (itemId: string | number) => void,
    create?: (eventName: string) => void
}

const filterEvents: ItemListPredicate<SelectableItem> =
    (query, events) => events.filter(event => event.display.toLowerCase().includes(query.toLowerCase()));


const renderItem = (item: SelectableItem, { handleClick }: IItemRendererProps) => {
    return (
        <div key={item.id + ' itemId'}>
            <div onClick={handleClick}>{item.display}</div>
        </div>
    )
}

const renderNewEvent = (
    query: string,
    active: boolean,
    create: (eventName:string)=>void
) => {
    return (
        <MenuItem
            icon="add"
            text={`Create "${query}"`}
            active={active}
            onClick={() => {
                create(query)
            }}
            shouldDismissPopover={true}
        />
    )
}

const ListSearch: React.FunctionComponent<Props> = ({
    onSelect,
    children,
    items,
    create }) => {
    return (
        create
            ? <ItemSelect
                items={items}
                itemRenderer={renderItem}
                filterable={true}
                createNewItemRenderer={(query, active)=>renderNewEvent(query,active, create)}
                createNewItemFromQuery={(value)=>({display:value, id:''})}
                itemListPredicate={filterEvents}
                onItemSelect={(item) => onSelect(item.id)}>
                {children}
            </ItemSelect>
            : <ItemSelect
                items={items}
                itemRenderer={renderItem}
                filterable={true}
                itemListPredicate={filterEvents}
                onItemSelect={(item) => onSelect(item.id)}>
                {children}
            </ItemSelect>
    );
};


export default ListSearch;

