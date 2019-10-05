import { NextPage } from 'next';
import TestButton from '../../components/testComponent';

import { AppState } from '../../store'
import { incrementCounter, decrementCounter } from '../../store/counter/actions';
import { CounterActionTypes, CounterState } from '../../store/counter/types';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch<CounterActionTypes>)=>({
  incrementCounter: (quantity: number) => dispatch(incrementCounter(quantity)),
  decrementCounter: (quantity: number) => dispatch(decrementCounter(quantity))
});

const Counter: NextPage<{
  incrementCounter: Function,
  decrementCounter: Function,
  counter: CounterState
 }> = ({ incrementCounter, decrementCounter, counter}) => (
  <div>
    <p>Hello world! - counter: {counter.clicks}</p>
    <TestButton text="Hit" increment = {()=>incrementCounter(2)} ></TestButton>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Counter);