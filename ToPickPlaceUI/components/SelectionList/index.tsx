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
            <style jsx>{`
                .listTitle{
                    background: aqua;
                }
            `}</style>
        </div>
    
    );
};

export default SelectionList;