export default function dateFilter(value) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return Intl.DateTimeFormat('ru-RU', options).format(value);
}