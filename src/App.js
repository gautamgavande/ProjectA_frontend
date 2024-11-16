import './App.css';
import Dashboard from './Dashbord/Dashbord';
import Main from './Componentes/Main'
import { Route, Routes } from 'react-router-dom';
import Role from './Role/Role';
import Employe from './Employe/Employe';
import Courses from './Courses/Courses';
import Teacher from './Teacher/Teacher';
import Student from './Student/Student';
import Example from './Try1'
// import Login from './Login/Login';


function App() {

  return (
    <>

        <Routes>
          {/* <Route path='/' element={<Login></Login>}></Route> */}
          <Route path='/' element={<Dashboard></Dashboard>}>
            <Route path='/' element={<Main></Main>}></Route>
            <Route path='/employe' element={<Employe></Employe>}></Route>
            <Route path='/role' element={<Role></Role>}></Route>
            <Route path='/course' element={<Courses></Courses>}></Route>
            <Route path='/teacher' element={<Teacher></Teacher>}></Route>
            <Route path='/student' element={<Student></Student>}></Route>
            <Route path='/try' element={<Example></Example>}></Route>
            </Route>
        </Routes>
    </>
  );
}

export default App;

// import './App.css';
// import Dashboard from './Dashbord/Dashbord';
// import Main from './Componentes/Main'
// import { Route, Routes } from 'react-router-dom';
// import Role from './Role/Role';
// import Employe from './Employe/Employe';
// import Courses from './Courses/Courses';
// import Teacher from './Teacher/Teacher';
// import Student from './Student/Student';
// import Example from './Try1'
// import Login from './Login/Login';


// function App() {

//   return (
//     <>
//         <Routes>
//           <Route path='/' element={<Login />}></Route>
//           <Route path='/dash' element={<Dashboard />}>
//             <Route path='main' element={<Main />}></Route>
//             <Route path='employe' element={<Employe />}></Route>
//             <Route path='role' element={<Role />}></Route>
//             <Route path='course' element={<Courses />}></Route>
//             <Route path='teacher' element={<Teacher />}></Route>
//             <Route path='student' element={<Student />}></Route>
//             <Route path='try' element={<Example />}></Route>
//           </Route>
//         </Routes>
//     </>
//   );
// }

// export default App;

