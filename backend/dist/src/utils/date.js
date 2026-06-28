import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone to Atlantic Standard Time (AST) which is America/Puerto_Rico or America/Santo_Domingo (UTC-4)
dayjs.tz.setDefault('America/Santo_Domingo');
export const getAstDate = (date) => {
    return dayjs(date).tz('America/Santo_Domingo');
};
export const getAstDateString = (date) => {
    return getAstDate(date).format();
};
