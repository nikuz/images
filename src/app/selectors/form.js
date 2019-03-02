// @flow

import type {
    FormFieldString,
    FormFieldNumber,
    FormFieldBoolean,
    FormFieldArrayString,
    FormFieldArrayNumber,
    FormFieldArrayBoolean,
} from '../types';
import type { StoreState } from '../reducers';

export const getField = (
    state: StoreState,
    fieldId: string
): Object => state.form[fieldId] || {
    id: fieldId,
    focused: false,
};

export const getFieldString = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?string
): FormFieldString => {
    const field = getField(state, fieldId);
    if (field.value === undefined) {
        field.value = defaultValue || '';
    }
    return field;
};

export const getFieldNumber = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?number,
    min?: number,
    max?: number,
    step?: number | (value: number, direction?: string) => number
): FormFieldNumber => {
    const field = getField(state, fieldId);
    if (field.value === undefined) {
        field.value = defaultValue !== undefined ? defaultValue : '';
    }
    field.min = min;
    field.max = max;
    field.step = step;
    return field;
};

export const getFieldBoolean = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?boolean
): FormFieldBoolean => {
    const field = getField(state, fieldId);
    if (field.value === undefined) {
        field.value = defaultValue || false;
    }
    return field;
};

export const getFieldArrayString = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?string[]
): FormFieldArrayString => {
    const field = getField(state, fieldId);
    if (!field.value) {
        field.value = defaultValue || [];
    }
    return field;
};

export const getFieldArrayNumber = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?number[]
): FormFieldArrayNumber => {
    const field = getField(state, fieldId);
    if (!field.value) {
        field.value = defaultValue || [];
    }
    return field;
};

export const getFieldArrayBoolean = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?boolean[]
): FormFieldArrayBoolean => {
    const field = getField(state, fieldId);
    if (!field.value) {
        field.value = defaultValue || [];
    }
    return field;
};
