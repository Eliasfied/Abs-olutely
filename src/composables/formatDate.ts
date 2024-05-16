export const formatDate = (date: string) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" } as Intl.DateTimeFormatOptions;
    return new Date(date).toLocaleDateString(undefined, options);
};
