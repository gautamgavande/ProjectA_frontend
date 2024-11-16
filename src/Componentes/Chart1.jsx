// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';

// const customPalette = ['#F49F3F','#57C086','#F49F3F','#57C086', '#F49F3F','#57C086','#FFBB28', '#FFBB28', '#FFBB28','#FFBB28'];
// const defaultSeries = [
//   { id: '1', data: [4, 5, 1, 2, 3, 3, 2], area: true, stack: '1' },
//   { id: '2', data: [7, 4, 6, 7, 2, 3, 5], area: true, stack: '1' },
//   { id: '3', data: [6, 4, 1, 2, 6, 3, 3], area: true, stack: '1' },
//   { id: '4', data: [4, 7, 6, 1, 2, 7, 7], area: true, stack: '1' },
//   { id: '5', data: [2, 2, 1, 7, 1, 5, 3], area: true, stack: '1' },
//   { id: '6', data: [6, 6, 1, 6, 7, 1, 1], area: true, stack: '1' },
//   { id: '7', data: [7, 6, 1, 6, 4, 4, 6], area: true, stack: '1' },
//   { id: '8', data: [4, 3, 1, 6, 6, 3, 5], area: true, stack: '1' },
//   { id: '9', data: [7, 6, 2, 7, 4, 2, 7], area: true, stack: '1' },
// ].map((item, index) => ({
//   ...item,
//   color:  customPalette[index],
// }));

// export default function LineAnimation() {
//   const [series, setSeries] = React.useState(defaultSeries);
//   const [nbSeries, setNbSeries] = React.useState(1);
//   const [skipAnimation, setSkipAnimation] = React.useState(false);

//   return (
    
//     <div
//       style={{
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <div>
//         <LineChart
//           xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
//           series={[
//             ...series.slice(0, Math.min(nbSeries, 8)),
//             ...series.slice(8, 10),
//           ]}
//           skipAnimation={skipAnimation}
//           height={450}
//         />
//       </div>  
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LineChart } from '@mui/x-charts/LineChart';

// const customPalette = ['#F49F3F','#57C086','#F49F3F','#57C086', '#F49F3F','#57C086','#FFBB28', '#FFBB28', '#FFBB28','#FFBB28'];

// const LineAnimation = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/students-per-batch')
//       .then(response => {
//         const data = response.data.map((item, index) => ({
//           id: item.batch_id,
//           data: [item.student_count],
//           area: true,
//           stack: '1',
//           color: customPalette[index % customPalette.length],
//         }));
//         setChartData(data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
//       <LineChart
//         xAxis={[{ data: [1] }]}
//         series={chartData}
//         height={450}
//       />
//     </div>
//   );
// };

// export default LineAnimation;

