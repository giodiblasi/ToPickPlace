import * as React from 'react';

type Props = {
    increment: Function,
    text: string
}
const TestButton: React.FunctionComponent<Props> = ({increment, text}) => {
    return (
        <button onClick={()=>increment()}>{text}</button>
    );
};

export default TestButton;