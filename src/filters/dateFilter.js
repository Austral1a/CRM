export default function dateFilter(value, format = 'date') {
    let options = {};

    if ( format.includes('time') ) {
        options.hour =  'numeric'
        options.minute =  'numeric'
        options.second =  'numeric'
    }

    if( format.includes('historyDate')) {
        options.year =  'numeric'
        options.month =  'numeric'
        options.day = '2-digit'
    }
    
    if ( format.includes('date') ) {
        options.weekday =  'long'
        options.year =  'numeric'
        options.month =  'long'
        options.day =  'numeric'
    };
    return Intl.DateTimeFormat('ru-RU', options).format(value);
}