import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import CustomizedAxisTick from '../components/CustomizedAxisTick';
import {renderColorfulLegendText} from '../components/Legend';

interface IProps {
    data : any[]
}

const Chart : React.FC<IProps> = ({ data }) => {

    return (
        <ResponsiveContainer height={500} width={'95%'}>
             <LineChart
                data={data}
                margin={{ top: 20, right: 0, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" height={60} tick={<CustomizedAxisTick/>}  />
                <YAxis />
                <Tooltip />
                <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"  
                    iconSize={24}
                    iconType="rect"
                    formatter={renderColorfulLegendText} 
                />
                <Line type="monotone" dataKey="normal"  stroke="#98D0FF" activeDot={{r: 8}} />
                <Line type="monotone" dataKey="actual"  stroke="#50e95d"   />
                <Line type="monotone" dataKey="forecast"  stroke="#81898f" />
            </LineChart>
        </ResponsiveContainer>
        );
    
}

export default Chart
