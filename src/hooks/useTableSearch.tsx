import React,  { useState, useRef } from 'react'
import { Button, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

type ISearchProps = {
    record : any;
    val : any;
}

const TableSearch  = () => {
    const [searchText, setSearchText] = useState('');
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchInput = useRef<Input>(null);
    
    const getColumnSearchProps = (dataIndex : string[], RenderJSX : React.FC<ISearchProps> ) => ({
        filterDropdown : (props : any ) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search`}
                    value={props.selectedKeys[0]}
                    onChange={(e) =>
                        props.setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(props.selectedKeys, props.confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() =>
                        handleSearch(props.selectedKeys, props.confirm, dataIndex)
                    }
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(props.clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered :any) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value :any, record : any) => { 
            return onSearch(record, value, dataIndex)
        },
        onFilterDropdownVisibleChange: (visible :any) => {
            if (visible) {
                setTimeout(
                    () => searchInput.current && searchInput.current.select()
                );
            }
        },
        render: (text : string, record : any) => {
            return (
                toggleSearch ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={onHighlight(record, dataIndex)}
                    />
                ) : <RenderJSX val={text} record={record}/>
            )
        }
    });

    const handleSearch = (selectedKeys : any, confirm : any , dataIndex : any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setToggleSearch(true);
    };

    const handleReset = (clearFilters : any) => {
        clearFilters();
        setSearchText('');
        setToggleSearch(false);
    };

    return getColumnSearchProps;
}

export default TableSearch;

const onSearch = (obj :any, value : any , columns : any) =>{
    const data = columns.map((item :any)=>{
        return obj[item] && obj[item] !==null ?  obj[item].toLowerCase().includes(value.toLowerCase()) : []
    });
    return data.includes(true);
}

const onHighlight = (record : any, dataIndex : string[])  => {
    const text = dataIndex.reduce((acc, curr) => {
        const temp = record[curr] ?? '';
        return acc + ' ' + temp;
    } , "")
    return text;
}