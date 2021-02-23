import { ThunkAction } from 'redux-thunk';
import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from '../constants';
import { IState, IAsyncAction, IReturnPromise } from '../ducks';
import { notification } from 'antd';
import { get } from 'lodash';

const thunkCreator = <C extends string, T>(
    actionType: C,
    service: (dispatch?: IThunkAction<C, T>) => T,
    meta: any
): IThunkAction<C, T> => {
    return async (dispatch) => {
        dispatch({
            type: actionType,
            status: TYPE_FETCHING,
        });
        try {
            const res = await service(dispatch);
            dispatch({
                type: actionType,
                status: TYPE_FETCHED,
                payload: res as T,
            });
            return { payload: res as T };
        } catch (e) {
            dispatch({
                type: actionType,
                status: TYPE_ERROR,
                payload: e.response
                    ? e.response.data.error
                        ? e.response.data.messages
                        : e.response.data
                    : (e as Error),
            });
            // Notification handler
            if (!meta || (meta && meta.error !== false)) {
                notification.error({
                    message: get(e, 'response.data.messages',e.message),
                });
            }

            return { error: e as Error };
        }
    };
};

type IThunkReturn<T> =
    | { payload: T; error?: never }
    | { payload?: never; error: Error };
type IThunkAction<C, T> = ThunkAction<
    Promise<IThunkReturn<T>>,
    IState,
    null,
    IAsyncAction<C, T>
>;
type IThunk = {
    [k in string]: {
        type: string;
        service: (...args: any[]) => any;
        meta?: any;
    };
};
type IThunkActions<T extends IThunk> = {
    [k in keyof T]: (
        ...args: Parameters<T[k]['service']>
    ) => IThunkAction<
        T[k]['type'],
        IReturnPromise<ReturnType<T[k]['service']>>
    >;
};
function thunkFactory<T extends IThunk>(actions: T): IThunkActions<T> {
    return Object.keys(actions).reduce<Partial<IThunkActions<T>>>(
        (a, e: keyof typeof actions) => {
            const t = actions[e];
            return {
                ...a,
                [e]: (...args) =>
                    thunkCreator(t.type, () => t.service(...args), t.meta),
            };
        },
        {}
    ) as IThunkActions<T>;
}

export default thunkFactory;
