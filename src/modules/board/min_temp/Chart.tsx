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
  ComposedChart,
  Area,
  AreaChart
} from "recharts";
import CustomizedAxisTick from '../components/CustomizedAxisTick';
import {renderColorfulLegendText} from '../components/Legend';

interface IProps {
    data : any[]
}

const Chart : React.FC<IProps> = ({ data }) => {

    return (
        <ResponsiveContainer height={500} width={'95%'}>
             <AreaChart
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
                    <Area type="monotone" dataKey="normal"  stroke="#98D0FF" fill="#98D0FF" activeDot={{r: 8}} />
                    <Area type="monotone" dataKey="el_nino"  stroke="#fa091d" fill="#e94452"/>
                    <Area type="monotone" dataKey="la_nina"  stroke="#063ef8" fill="#4f6cce"/>
                    <Area type="monotone" dataKey="actual_year"  stroke="#00ff15"  fill="#50e95d"/>
                    <Area type="monotone" dataKey="projection_2050"  stroke="#616161" fill="#81898f"/>
                    <Area type="monotone" dataKey="forecast"  stroke="#f54906" fill="#f54906"/>

                      {/* <Line type="monotone" dataKey="normal"  stroke="#98D0FF" activeDot={{r: 8}} /> */}
                    {/* <Line type="monotone" dataKey="el_nino"  stroke="#e94452" />
                    <Line type="monotone" dataKey="la_nina"  stroke="#4f6cce" />
                    <Line type="monotone" dataKey="actual_year"  stroke="#50e95d"   />
                    <Line type="monotone" dataKey="projection_2050"  stroke="#81898f" /> */}
            </AreaChart>
        </ResponsiveContainer>
        );
    
}

export default Chart
