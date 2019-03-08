// @flow

import { formConstants } from '../constants';
import type { FormFieldValue } from '../types';

const {
    FORM_FIELD_FOCUS,
    FORM_FIELD_BLUR,
    FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    FORM_FIELD_VALUE_CHANGE,
    FORM_FIELD_CLEAR,
} = formConstants;

export const fieldFocus = (
    field: string,
    value?: string | number
) => ({
    type: FORM_FIELD_FOCUS,
    payload: {
        id: field,
        value,
    },
});

export const fieldBlur = (field: string) => ({
    type: FORM_FIELD_BLUR,
    payload: field,
});

export const passwordVisibilityToggle = (field: string, value?: string | number) => ({
    type: FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    payload: {
        id: field,
        value,
    },
});

export const fieldValueChange = (field: string, value: FormFieldValue | FormFieldValue[]) => ({
    type: FORM_FIELD_VALUE_CHANGE,
    payload: {
        field,
        value,
    },
});

export const fieldClear = (field: string) => ({
    type: FORM_FIELD_CLEAR,
    payload: field,
});
