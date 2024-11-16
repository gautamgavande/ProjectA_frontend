import * as React from 'react';
import Box from '@mui/material/Box';

import { BarChart } from '@mui/x-charts/BarChart';

export default function BarAnimation() {
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(10);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setSeriesNb(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={450}
        series={series
          .slice(0, seriesNb)
          .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
        skipAnimation={skipAnimation} 
      />
    
    </Box>
  );
}

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
};

const series = [
  {
    label: 'Teacher',
    data: [
      2423, 2210, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188,
      1879, 626, 1635, 2177, 516, 1793, 1598,
    ],
    color: '#57C086'
  },
  {
    label: 'Student',
    data: [
      2362, 2254, 1962, 1336, 586, 1069, 2194, 1629, 2173, 2031, 1757, 862, 2446,
      910, 2430, 2300, 805, 1835, 1684, 2197,
    ],
    color: '#FF8042'
  },
  
].map((s) => ({ ...s, highlightScope }));




// import * as React from 'react';
// import Box from '@mui/material/Box';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function BarAnimation() {
//   const [studentData, setStudentData] = React.useState([]);
//   const [teacherData, setTeacherData] = React.useState([]);
//   const [skipAnimation, setSkipAnimation] = React.useState(false);
//   const [itemNb, setItemNb] = React.useState(10);

//   React.useEffect(() => {
//     axios.get('http://localhost:5000/api/student-status')
//       .then(response => {
//         const data = response.data.map(item => ({
//           label: item.status,
//           data: item.count,
//           color: item.status === 'active' ? '#57C086' : '#FF8042'
//         }));
//         setStudentData(data);
//       })
//       .catch(error => console.error('Error fetching student data:', error));

//     axios.get('http://localhost:5000/api/teacher-status')
//       .then(response => {
//         const data = response.data.map(item => ({
//           label: item.status,
//           data: item.count,
//           color: item.status === 'active' ? '#57C086' : '#FF8042'
//         }));
//         setTeacherData(data);
//       })
//       .catch(error => console.error('Error fetching teacher data:', error));
//   }, []);

//   const series = [
//     {
//       label: 'Students',
//       data: studentData.map(item => item.data).slice(0, itemNb),
//       color: studentData.map(item => item.color).slice(0, itemNb)
//     },
//     {
//       label: 'Teachers',
//       data: teacherData.map(item => item.data).slice(0, itemNb),
//       color: teacherData.map(item => item.color).slice(0, itemNb)
//     }
//   ];

//   return (
//     <Box sx={{ width: '100%' }}>
//       <BarChart
//         height={450}
//         series={series}
//         skipAnimation={skipAnimation}
//         xAxis={[{ categories: Array.from({ length: itemNb }, (_, i) => `Item ${i + 1}`) }]}
//       />
//     </Box>
//   );
// }



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function BarAnimation() {
//   const [studentData, setStudentData] = React.useState([]);
//   const [teacherData, setTeacherData] = React.useState([]);
//   const [skipAnimation, setSkipAnimation] = React.useState(false);
//   const [itemNb, setItemNb] = React.useState(10);

//   React.useEffect(() => {
//     axios.get('http://localhost:5000/api/student-status')
//       .then(response => {
//         const data = response.data.map(item => ({
//           label: item.status,
//           data: item.count,
//           color: item.status === 'active' ? '#57C086' : '#FF8042'
//         }));
//         setStudentData(data);
//       })
//       .catch(error => console.error('Error fetching student data:', error));

//     axios.get('http://localhost:5000/api/teacher-status')
//       .then(response => {
//         const data = response.data.map(item => ({
//           label: item.status,
//           data: item.count,
//           color: item.status === 'active' ? '#57C086' : '#FF8042'
//         }));
//         setTeacherData(data);
//       })
//       .catch(error => console.error('Error fetching teacher data:', error));
//   }, []);

//   const series = [
//     {
//       label: 'Students',
//       data: studentData.length > 0 ? studentData.map(item => item.data).slice(0, itemNb) : [],
//       color: studentData.length > 0 ? studentData.map(item => item.color).slice(0, itemNb) : []
//     },
//     {
//       label: 'Teachers',
//       data: teacherData.length > 0 ? teacherData.map(item => item.data).slice(0, itemNb) : [],
//       color: teacherData.length > 0 ? teacherData.map(item => item.color).slice(0, itemNb) : []
//     }
//   ];

//   return (
//     <Box sx={{ width: '100%' }}>
//       <BarChart
//         height={450}
//         series={series}
//         skipAnimation={skipAnimation}
//         xAxis={[{ categories: Array.from({ length: itemNb }, (_, i) => `Item ${i + 1}`) }]}
//       />
//     </Box>
//   );
// }

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function BarAnimation() {
//   const [studentData, setStudentData] = React.useState([]);
//   const [teacherData, setTeacherData] = React.useState([]);
//   const [skipAnimation, setSkipAnimation] = React.useState(false);

//   React.useEffect(() => {
//     axios.get('http://localhost:5000/api/student-status')
//    .then(response => {
//         if (response.data && Array.isArray(response.data)) {
//           const data = response.data.map(item => ({
//             label: item.status,
//             data: item.count,
//             color: item.status === 'active'? '#57C086' : '#FF8042'
//           }));
//           setStudentData(data);
//         } else {
//           console.error('Unexpected response format for student data:', response.data);
//         }
//       })
//    .catch(error => console.error('Error fetching student data:', error));

//     axios.get('http://localhost:5000/api/teacher-status')
//    .then(response => {
//         if (response.data && Array.isArray(response.data)) {
//           const data = response.data.map(item => ({
//             label: item.status,
//             data: item.count,
//             color: item.status === 'active'? '#57C086' : '#FF8042'
//           }));
//           setTeacherData(data);
//         } else {
//           console.error('Unexpected response format for teacher data:', response.data);
//         }
//       })
//    .catch(error => console.error('Error fetching teacher data:', error));
//   }, []);

//   if (!studentData.length ||!teacherData.length) {
//     return <div>Loading...</div>;
//   }

//   const studentSeries = {
//     label: 'Students',
//     data: studentData.map(item => item.data),
//     color: studentData.map(item => item.color)
//   };

//   const teacherSeries = {
//     label: 'Teachers',
//     data: teacherData.map(item => item.data),
//     color: teacherData.map(item => item.color)
//   };

//   const categories = studentData.map(item => ({ label: item.label }));

//   return (
//     <Box sx={{ width: '100%' }}>
//       <BarChart
//         height={450}
//         series={[studentSeries, teacherSeries]}
//         xAxis={{
//           type: 'band',
//           categories: categories,
//         }}
//         skipAnimation={skipAnimation}
//       />
//     </Box>
//   );
// }