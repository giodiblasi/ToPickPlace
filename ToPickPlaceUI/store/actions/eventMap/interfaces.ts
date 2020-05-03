import { EventMap } from "../../types";

export const UPDATED_MAP = 'UPDATED_MAP';

export type updatedEventMap = {
    type: typeof UPDATED_MAP,
    payload: EventMap
};

export type EventMapActionTypes =  updatedEventMap; 