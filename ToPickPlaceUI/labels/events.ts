export const EVENTS = "Events"
export const APP_TITLE= "App_Title"
export const SAVE_MAP= "Save_Map"
const labels:{[index:string]: string}= {
    [EVENTS]: 'Events',
    [APP_TITLE]: 'ToPickPlace',
    [SAVE_MAP]: 'Save Map'
}

export const printLabel = (labelCode: string): string => labels[labelCode] || 'NOT FOUND'; 