// @flow

export type FormFieldValue = string | number | boolean;

type FormField = {
    id: string,
    focused?: boolean,
    passwordVisible?: boolean,
};

export type FormFieldString = FormField & {
    value: string,
};

export type FormFieldNumber = FormField & {
    value: number,
    min?: number,
    max?: number,
    step?: number,
};

export type FormFieldBoolean = FormField & {
    value: boolean,
};

export type FormFieldArrayString = FormField & {
    value: string[],
};

export type FormFieldArrayNumber = FormField & {
    value: number[],
};

export type FormFieldArrayBoolean = FormField & {
    value: boolean[],
};

export type FormRadioFieldItem = {
    id: string,
    value: FormFieldValue,
};

export type FormSelectorFieldItem = {
    value: string,
    label: FormFieldValue,
};

export type FormFieldChangeData = {
    id: string,
    value: FormFieldValue,
};
