import { isValid, parse } from 'date-fns';

export const isRequired = (value: any) => (value != null && /[^\s]+/.test(value) ? "" : "Required");

export const isValidDate = (value: string | Date) => value instanceof Date || (/^\d{4}-\d{2}-\d{2}$/.test(value) && isValid(parse(value, "yyyy-MM-dd", new Date()))) ? "" : "Date required";

export const minLength = (min: number) => (value: string) => (value.length < min ? `Minimum length is ${min}` : "");