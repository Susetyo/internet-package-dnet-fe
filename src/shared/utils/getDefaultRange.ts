export function getDefaultDateRange() {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    return {
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10),
    };
}
