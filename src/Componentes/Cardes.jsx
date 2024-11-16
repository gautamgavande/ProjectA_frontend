import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom';
import Card1 from './Card'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { MdOutlineMenuBook } from "react-icons/md";





function Cardes() {
  const navigate = useNavigate()
  let [totalemploye,setemploye]=useState("")
  let [totalteacher,setteacher]=useState("")
  let [totalstudent,setstudent]=useState("")
  let [totalcourse,setcourse]=useState("")
  async function employe(){
    try{
      let res= await axios.get("http://localhost:5000/api/totalemp") 
     setemploye(res.data[0].total_employe)
      console.log(res.data[0].total_employe)
    }catch(error){
      console.log(error)
    }
      
  }
  async function teacher(){
    try{
        let res=await axios.get("http://localhost:5000/teacherapi/totalteacher")
        setteacher(res.data[0].total_teacher)
        console.log(res.data[0].total_teacher)
    }catch(error){
      console.log(error)
    }
  }
  async function student(){
    try{
        let res=await axios.get("http://localhost:5000/student/totalstudent")
        setstudent(res.data[0].total_student)
        console.log(res.data[0].total_student)
    }catch(error){
      console.log(error)
    }
  }
  async function course(){
    try{
        let res=await axios.get("http://localhost:5000/course/totalcourse")
        setcourse(res.data[0].total_course)
        console.log(res.data[0].total_course)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    employe()
    teacher()
    student()
    course()
  },[])
  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",alignItems:"center",gap:"10px"}}>
    <Link style={{textDecoration:"none"}} to='/employe'><Card1   title={"Employe"} total={totalemploye}   backgroundColor= "#4DC0F0" icon={<FaUsers />} ></Card1></Link>
    <Link style={{textDecoration:"none"}} to='/teacher'><Card1 title={"Teacher"}  total={totalteacher}   backgroundColor= "#57C086" icon={<GiTeacher />}></Card1></Link>
    <Link style={{textDecoration:"none"}} to='/student'><Card1 title={"Student"}  total={totalstudent}  backgroundColor= "#F49F3F" icon={<PiStudentBold />}></Card1></Link>
    <Link style={{textDecoration:"none"}} to='/course'><Card1 title={"Courses"} total={totalcourse}  backgroundColor= "#F07F86" icon={<MdOutlineMenuBook></MdOutlineMenuBook>}></Card1></Link>
    </div>
    </>
  )
}

export default Cardes