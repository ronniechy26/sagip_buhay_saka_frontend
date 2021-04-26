import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Bar,
  ComposedChart
} from "recharts";
import CustomizedAxisTick from '../components/CustomizedAxisTick';

interface IProps {
    data : any[]
}

const Chart : React.FC<IProps> = ({ data }) => {
   
    const renderColorfulLegendText = (value, entry) => {
        const { color } = entry;
        return <span style={{ color }}>{`${value.toString().toUpperCase()}` }</span>;
    }

    return (
        <ResponsiveContainer height={500} width={'95%'}>
            <ComposedChart
                data={data}
                margin={{ top: 20, right: 0, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" height={60} tick={<CustomizedAxisTick/>} />
                <YAxis type="number" domain={[0, 'dataMax']} />
                <Tooltip />
                <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"  
                    iconSize={24}
                    iconType="rect"
                    formatter={renderColorfulLegendText} 
                />
                <Bar dataKey="normal" barSize={40} fill="#98D0FF" />
                {/* <Line type="monotone" dataKey="normal"  stroke="#98D0FF" activeDot={{r: 8}} /> */}
                <Line type="monotone" dataKey="el_nino"  stroke="#e94452" />
                <Line type="monotone" dataKey="la_nina"  stroke="#4f6cce" />
                <Line type="monotone" dataKey="actual_year"  stroke="#50e95d"   />
                <Line type="monotone" dataKey="projection_2050"  stroke="#81898f" />
                <Line type="monotone" dataKey="forecast"  stroke="#f54906" />
                Forecast
            </ComposedChart>
        </ResponsiveContainer>
    );
    
}

export default Chart
