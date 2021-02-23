import React from 'react'
import { DatePicker, Button as AntdButton } from 'antd';
import  moment from 'moment';

const { RangePicker } = DatePicker;

const useTableFilterData = () =>{
    
    const getColumnsFilterDate = (dataColumn : string ) =>({
        filterDropdown: (props : any ) => (
            <div style={{ padding: 8 }}>
                <RangePicker
                    value={props.selectedKeys[0]}
                    onChange={date => {
                        props.setSelectedKeys([date]);
                    }}
                />
                <div style={{marginTop : '8px', display : 'flex', justifyContent : 'space-between'}}>
                    <AntdButton
                        type="primary"
                        onClick={() =>  props.confirm()}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </AntdButton>
                    <AntdButton
                        onClick={() => props.clearFilters()}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </AntdButton>
                </div>
            </div>
        ),
        onFilter: (value :any, record : any ) => {
            const createDate = record[dataColumn] ? moment(record[dataColumn]) : undefined;
            if (!createDate || !Array.isArray(value) || value.length <= 0) {
                return false;
            }
            return createDate.isSameOrAfter(value[0], 'day') && createDate.isSameOrBefore(value[1], 'day')
        },
    })

    return getColumnsFilterDate;
}

export default useTableFilterData;