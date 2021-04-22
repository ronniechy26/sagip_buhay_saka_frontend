import { months } from "../../constants";
import { IDashboardRainfall } from "../../models/DashboardModel";

export const ModifyData = (param :  Array<IDashboardRainfall>  = []) =>{
    const normal = param.find(x => x.data_input === 'Normal Data');
    const el_nino = param.find(x => x.data_input === 'El Nino');
    const la_nina = param.find(x => x.data_input === 'La Nina');
    const actual_year = param.find(x => x.data_input === 'Actual Year');
    const projection = param.find(x => x.data_input === '2050 Projection');

    const data = months.map((item, index) =>{
        return{
            id: index,
            month: item.text,
            normal: normal ? convertStringToInt(normal[item.text.toLocaleLowerCase()]) : 0,
            el_nino: el_nino ? convertStringToInt(el_nino[item.text.toLocaleLowerCase()] ): 0,
            la_nina: la_nina ? convertStringToInt(la_nina[item.text.toLocaleLowerCase()]) : 0,
            actual_year: actual_year ? convertStringToInt(actual_year[item.text.toLocaleLowerCase()]) : 0,
            projection_2050: projection ? convertStringToInt(projection[item.text.toLocaleLowerCase()]) : 0,
        }
    })

    return data;
}

const convertStringToInt = (number : string) : number => {
    return parseInt(number);
}   