import { createAction, props } from "@ngrx/store";

export const addDigit = createAction('[Calc] AddDigit', props<{digit:string}>());
export const addOperator = createAction('[Calc] AddOperator', props<{operator:string}>());
export const calculate = createAction('[Calc] Calculate');

export const reset = createAction('[Calc] Reset');
export const deleteInput = createAction('[Calc] DeleteInput');
