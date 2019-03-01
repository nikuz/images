// @flow

export type User = {
    blocked: boolean,
    confirmed: boolean,
    email: string,
    provider: string,
    role: {
        name: string,
        description: string,
        type: string,
    },
    description: string,
    name: string,
    type: string,
    username: string,
}
