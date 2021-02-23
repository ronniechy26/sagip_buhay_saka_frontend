import { IUser } from '../models/UserModel';
import { IState, IStatus } from '../ducks';
import { IReducerAction } from '../ducks/UserDuck';
import { get } from 'lodash';

export const render_name  = ( data : any ) : string => {
    if(!data) return 'U';
    const f = data.first_name.split('')[0];
    const l = data.last_name.split('')[0];
    return `${f}${l}`;
} 

export const render_table_name  = ( data : any ) : string => {
    if(!data) return '--';
    const first_name = get(data, 'first_name', "") ??  '';
    const middle_name = get(data, 'middle_name', "") ?? '';
    const last_name = get(data, 'last_name', "")  ?? '';
    return `${first_name} ${middle_name} ${last_name} `;
} 

export const getUserStatus = (
    state: IState,
    action : IReducerAction['type']
): any => state.UserReducer.status


