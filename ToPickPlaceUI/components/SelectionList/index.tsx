import * as React from 'react';

type Props = {
    title: string
}
const SelectionList: React.FunctionComponent<Props> = ({title, children}) => {
    return (
        <div>
            <div className="listTitle">{title}</div>
            <div>
                {children}
            </div>
        </div>
    
    );
};

export default SelectionList;