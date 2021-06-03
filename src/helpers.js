const dateTimeFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: 'medium', timeStyle: 'short' });

export const nullCheck = (data, callback) => !data ? '-' : callback(data);

export const formatDate = (date) => isNaN(Date.parse(date)) ? '-' : nullCheck(date, () => dateTimeFormat.format(new Date(date)));