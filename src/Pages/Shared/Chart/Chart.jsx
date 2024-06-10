
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = ({data}) => {
     const chartData = data.map(item => ({
          name: item.categoryName,
          pv: item.totalYesVote,
          uv: item.totalNoVote,
        }));
      
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
};

export default Chart;