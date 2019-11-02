export const EVENTS = "Events"
export const APP_TITLE= "App_Title"
const labels:{[index:string]: string}= {
    [EVENTS]: 'Events',
    [APP_TITLE]: 'ToPickPlace'
}

export const printLabel = (labelCode: string): string => labels[labelCode] || 'NOT FOUND'; 