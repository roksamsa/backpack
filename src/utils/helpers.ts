export const isObjectEmpty = (data: any): boolean => {
    return Object.keys(data).length === 0;
};

export const isDataEmpty = (data: any): boolean => {
    return !data || isObjectEmpty(data);
};

