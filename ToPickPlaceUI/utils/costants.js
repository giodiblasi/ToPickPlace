import {runOnServer} from './utils';
export const getApiUrl = () => runOnServer() ? `${process.env.TOPICKPLACE_API_PATH}/api` : '/api';
export const getPlannerUrl = () => runOnServer() ? `${process.env.TOPICKPLACE_PLANNER_PATH}/planner/api` : '/planner/api';