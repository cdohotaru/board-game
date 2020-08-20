// https://github.com/microsoft/TypeScript/issues/21732
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
    return !Object.keys(obj).length;
};
