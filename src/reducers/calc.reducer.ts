import { CalcState } from './../states/calc.state';
import { on, createReducer } from "@ngrx/store";
import * as CalcActions from "../actions/calc.action";

const initialState: CalcState = {
  display: '0',
  current: '',
  previous: '',
  operator: '',
};

export const calcReducer = createReducer(
  initialState,
  on(CalcActions.addDigit, (state, {digit})=>{
    let temp;
    if (state.current.includes('.') && digit === '.') {
      temp = state.current;
    }
    else {
      temp = state.current + digit;
    }
    return {...state, current:temp, display:temp }
  }),
  on(CalcActions.addOperator, (state, {operator})=>{
    let temp = calculate(state.previous, state.operator, state.current);
    return {...state, previous:temp, display:temp, operator:operator, current:''}
  }),
  on(CalcActions.calculate, (state)=>{
    let temp = calculate(state.previous, state.operator, state.current);
    return {...state, previous:temp, display:temp, current:'', operator:''}
  }),
  on(CalcActions.reset, (state)=>{
    return {display:'0', current: '', previous: '', operator: ''}
  }),
  on(CalcActions.deleteInput, (state)=>{
    return {display:'0', current: '', previous:state.previous, operator:state.operator}
  })
)

function calculate(previous:string, operator:string, current:string) {
  if(!previous)
    return current;
  else if(!current)
    return previous;
  let result:number = 0;
  switch (operator) {
    case '+':
      result = parseFloat(previous) + parseFloat(current);
      break;
    case '-':
      result = parseFloat(previous) - parseFloat(current);
      break;
    case 'x':
      result = parseFloat(previous) * parseFloat(current);
      break;
    case ':':
      result = parseFloat(previous) / parseFloat(current);
      break;
    default:
      break;
  }
  let finalResult = result.toString().slice(0, 12);
  if (finalResult === 'NaN') {
    return 'Syntax Error';
  }
  else {
    return finalResult;
  }
}
