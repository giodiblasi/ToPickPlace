export const EVENTS = "Events"
export const APP_TITLE = "Events"
const labels = {
    [EVENTS]: 'Events',
    [APP_TITLE]: 'ToPickPlace'
}

export const printLabel = (labelCode: string): string => labels[labelCode] || 'NOT FOUND'; 