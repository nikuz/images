// @flow

import { formConstants } from '../constants';
import type {
    FormFieldString,
    FormFieldNumber,
    FormFieldBoolean,
    FormFieldArrayString,
    FormFieldArrayNumber,
    FormFieldArrayBoolean,
} from '../types';

const {
    FORM_FIELD_FOCUS,
    FORM_FIELD_BLUR,
    FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    FORM_FIELD_VALUE_CHANGE,
    FORM_FIELD_CLEAR,
} = formConstants;

export type FormReducerState = {
    [key: string]: (
        FormFieldString
        | FormFieldNumber
        | FormFieldBoolean
        | FormFieldArrayString
        | FormFieldArrayNumber
        | FormFieldArrayBoolean
    ),
}

const initialState: FormReducerState = {};

const getInitialField = (id, value) => ({
    id,
    value: value !== undefined ? value : '',
    passwordVisible: false,
});

export default function formReducer(
    state: FormReducerState = initialState,
    action: Object
) {
    const { type, payload } = action;
    switch (type) {
        case FORM_FIELD_FOCUS: {
            let currentField = state[payload.id];
            if (!currentField) {
                currentField = getInitialField(payload.id, payload.value);
            }
            return {
                ...state,
                [payload.id]: {
                    ...currentField,
                    focused: true,
                },
            };
        }

        case FORM_FIELD_BLUR:
            return {
                ...state,
                [payload]: {
                    ...state[payload],
                    focused: false,
                },
            };

        case FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE: {
            let currentField = state[payload.id];
            if (!currentField) {
                currentField = getInitialField(payload.id, payload.value);
            }
            return {
                ...state,
                [payload.id]: {
                    ...currentField,
                    passwordVisible: !currentField.passwordVisible,
                },
            };
        }

        case FORM_FIELD_VALUE_CHANGE:
            return {
                ...state,
                [payload.field]: {
                    ...state[payload.field],
                    value: payload.value,
                    id: payload.field,
                },
            };

        case FORM_FIELD_CLEAR: {
            const newState = {
                ...state,
            };
            delete newState[payload];
            return newState;
        }

        default:
            return state;
    }
}
