import { Solution } from "../../../api/topickplaceapi/models";

export const GET_SOLUTION = 'GET_SOLUTION';

export type getSolutionAction = {
    type: typeof GET_SOLUTION,
    payload: Solution
};

export type SolutionActionTypes =  getSolutionAction;