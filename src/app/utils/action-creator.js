// @flow

import type { DispatchAPI } from 'redux';

type Options = {
    dispatch: DispatchAPI<*>,
    action: () => Promise<*>,
    wsForward?: boolean,
    requestAction: string,
    requestPayload?: string | number | Object,
    successAction: string,
    failureAction: string,
    successResponseHandler?: () => any,
};

export default (options: Options): Promise<*> => {
    let wsForward = options.wsForward;
    if (wsForward === undefined) {
        wsForward = true;
    }

    options.dispatch({
        type: options.requestAction,
        wsForward,
        payload: options.requestPayload,
    });

    return new Promise((resolve, reject) => options.action().then(
        (response) => {
            let handledResponse;
            if (options.successResponseHandler instanceof Function) {
                handledResponse = options.successResponseHandler(response);
            }
            options.dispatch({
                type: options.successAction,
                wsForward,
                payload: handledResponse || response,
            });
            resolve(handledResponse || response);
        },
        (error) => {
            options.dispatch({
                type: options.failureAction,
                wsForward,
                payload: error,
            });
            reject(error);
        }
    ));
};
