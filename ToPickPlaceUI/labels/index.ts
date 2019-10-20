export const EVENTS = "events";
export const APP_TITLE = "title";
export const SELECT_EVENT = "selectEvent";

const labels = {
    [EVENTS]: 'Events',
    [APP_TITLE]: 'ToPickPlace',
    [SELECT_EVENT]: 'Select an event...'
}

export const printLabel = (labelCode: string): string =>
    labels[labelCode] || 'NOT FOUND'; 