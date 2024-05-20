export function get_datetime_chile(): Date {
    var date = new Date();
    var offset = 0 // -date.getTimezoneOffset();
    var chile_date = new Date(date.getTime() + offset * 60 * 1000);
    return chile_date;
}
