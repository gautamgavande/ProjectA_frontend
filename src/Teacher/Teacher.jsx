import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
// import  moment  from 'moment'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from '@mui/material/Alert';
import  moment  from 'moment'
import T_profile from './T_profile';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Teacher() {
  let [data, setdata] = useState([])
  let [alert,setalert]=useState(false)
  let [tpdata,settpdata]=useState([])

  /////////////pagination////////////
const [page, setPage] = React.useState(0);
// const [rowsPerPage, setRowsPerPage] = React.useState(5);
const rowsPerPage = 7;
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event,newpage) => {
  // setRowsPerPage(parseInt(event.target.value, 10));
  setPage(newpage);
};
///////////////////
let [searchteacher,setsearchTeacher]=useState("")

//////////////////////

  let [teacher, setteacher] = useState({
    teacher_id: "",
    teacher_name: "",
    email: "",
    password: "",
    qualification: "",
    status: "",
    gender: "",
    mobile_no: ""
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);


  async function getdata() {
    try {
      let res = await axios.get("http://localhost:5000/teacherapi/teachers")
      console.log(res.data)
      setdata(res.data)
    }
    catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    getdata()
  }, [])
  async function deleteteacher(teacher_id) {
    try {
      let res = await axios.delete(`http://localhost:5000/teacherapi/removeteacher/${teacher_id}`)
      console.log(res)
         getdata()
         setalert(true)
      
      
    } catch (error) {
      console.log(error)
    }

  }
  async function addteacher() {
    try {
      let response = await axios.post("http://localhost:5000/teacherapi/addteacher",teacher)
      console.log(response.data)
      getdata()
      handleClose()
    } catch (error) {
      console.log(error.response.data); // This will contain the error message sent from the backend
      console.log(error.response.status);
      console.log(error.response.headers)
      alert(error.response.data)
    }

  }
  function updateteacher(teacher_id,teacher_name,email,password,qualification,status,gender,mobile_no){
        setteacher({
          ...teacher,
          teacher_id: teacher_id,
          teacher_name:teacher_name,
          email: email,
          password: password,
          qualification: qualification,
          status: status,
          gender: gender,
          mobile_no: mobile_no

        })
        console.log(teacher)
        handleShow1()
    
  }
  async function update(teacher_id){
    try{
          let res= await axios.put(`http://localhost:5000/teacherapi/updateteacher/${teacher_id}`,teacher)
          console.log(res)
          console.log(teacher)
          getdata()
          handleClose1()
    }catch(error){
      alert(error.response.data)
    }
  }
  let [tpname,settpname]=useState("")
  let[tpprofileid,settpprofileid]=useState("")
  async function teacher_profile(teacher_id,tpname){
    try{
        let res= await axios.get(`http://localhost:5000/teacherprofile/tprofile/${teacher_id}`) 
        console.log(res.data)
        settpdata(res.data)
        if(res.data.length){
          settpname(tpname)
          handleShow2()
        }else{
          handleShow3()
          settpprofileid(teacher_id)
        }
        
    }catch(error){
        console.log(error)
    }
}
async function active(id) {
  try {
    let data = await axios.patch(`http://localhost:5000/teacherapi/toggleactive/${id}`)
    console.log(data)
    getdata()
    toast("Wow so easy !")
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

////doing deactive user
async function deactive(id) {
  let data = await axios.patch(`http://localhost:5000/teacherapi//toggledeactive/${id}`)
  console.log(data)
  getdata()
  toast.success("✔ You are changed status succesfully",{
    position: "top-center",
    autoClose: 5000,
    //  transition: "Slide",
     closeOnClick: true,
  })
}
  return (
    <><Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <Button variant="primary" onClick={handleShow}>
          Add Teacher
        </Button>
      </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchteacher}
              onChange={e=>setsearchTeacher(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button >Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
    <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TeacherId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Qualification</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        {
          data
          .filter((ele)=>{
            return(
              ele.teacher_name.toLowerCase().includes(searchteacher.toLowerCase())
            )
          })
          .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
          .map((e) => {
            return (
              <tbody>
                <tr>
                  <td>{e.teacher_id}</td>
                  <td onClick={()=>{teacher_profile(e.teacher_id,e.teacher_name)}}><Link style={{textDecoration:"none",fontWeight:"bold"}} >{e.teacher_name}</Link></td>
                  <td>{e.email}</td>
                  <td>{e.mobile_no}</td>
                  <td>{e.qualification}</td>
                  <td>{e.gender}</td>
                  <td>{e.status === "Deactive" ? (
                    <Switch sx={{
                      '& .MuiSwitch-track': {
                        backgroundColor: 'red'
                      }
                    }} style={{color:"red"}} color="warning"  onClick={() => { active(e.teacher_id) }}></Switch>) : (<Switch defaultChecked color='success'  onClick={() => { deactive(e.teacher_id) }}></Switch>)} </td>
                  <td>{<DeleteIcon onClick={() => {deleteteacher(e.teacher_id)}}></DeleteIcon>}</td>
                  <td>{<EditIcon onClick={()=>{updateteacher(e.teacher_id,e.teacher_name,e.email,e.password,e.qualification,e.status,e.gender,e.mobile_no)}}></EditIcon>}</td>
                </tr>
              </tbody>
            )
          })

        }
      </Table>
      <TablePagination
      rowsPerPageOptions={[8]}
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    <ToastContainer />
      {alert?<Alert severity="success">This is a success Alert.</Alert>:<></>}
      <Modal style={{ zIndex: "1500" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>TeacherId</Form.Label>
                <Form.Control onChange={(e)=>{setteacher({...teacher,teacher_id:e.target.value})}} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e)=>{setteacher({...teacher,teacher_name:e.target.value})}} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e)=>{setteacher({...teacher,email:e.target.value})}} type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e)=>{setteacher({...teacher,password:e.target.value})}} type='password' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Mobile no.</Form.Label>
                <Form.Control onChange={(e)=>{setteacher({...teacher,mobile_no:e.target.value})}} placeholder="Enter Address" />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Qualification</Form.Label>
              <Form.Control onChange={(e)=>{setteacher({...teacher,qualification:e.target.value})}} type='text' placeholder="Enter your qualification" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select  onChange={(e)=>{setteacher({...teacher,gender:e.target.value})}} defaultValue="Choose...">
                <option >Choose...</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select  onChange={(e)=>{setteacher({...teacher,status:e.target.value})}} defaultValue="Choose...">
                  <option >Choose...</option>
                  <option>Deactive</option>
                  <option>Active</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { addteacher() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////update teacher */}
      
      <Modal style={{ zIndex: "1500" }} show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit teacher data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>TeacherId</Form.Label>
                <Form.Control value={teacher.teacher_id} onChange={(e)=>{setteacher({...teacher,teacher_id:e.target.value})}} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control value={teacher.teacher_name} onChange={(e)=>{setteacher({...teacher,teacher_name:e.target.value})}} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control value={teacher.email} onChange={(e)=>{setteacher({...teacher,email:e.target.value})}} type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control value={teacher.password} onChange={(e)=>{setteacher({...teacher,password:e.target.value})}} type='password' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Mobile no.</Form.Label>
                <Form.Control value={teacher.mobile_no} onChange={(e)=>{setteacher({...teacher,mobile_no:e.target.value})}} placeholder="Enter Address" />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Qualification</Form.Label>
              <Form.Control value={teacher.qualification} onChange={(e)=>{setteacher({...teacher,qualification:e.target.value})}} type='text' placeholder="Enter your qualification" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={teacher.gender}  onChange={(e)=>{setteacher({...teacher,gender:e.target.value})}} defaultValue="Choose...">
                <option >Choose...</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select value={teacher.status} onChange={(e)=>{setteacher({...teacher,status:e.target.value})}} defaultValue="Choose...">
                  <option >Choose...</option>
                  <option>Deactive</option>
                  <option>Active</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { update(teacher.teacher_id)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////for t_profile/// */}
     
        {tpdata.map((e)=>{
          return(
            <Modal style={{ zIndex: "1500" }} show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
                    <div style={{ height: "80px", width: "80px", borderRadius: "50%", backgroundColor: "red", marginLeft: "45%" }}>
                      <img style={{ height: "100%", width: "100%", borderRadius: "50%", objectFit: "cover", backgroundSize: "cover", backgroundPosition: "center" }} src={e.photo} alt={`${tpname}`}></img>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Teacher Id: {e.teacher_id} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Teacher Name: {tpname} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Aadhar NO.: {e.aadhar_no} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Experience: {e.experience} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Date of joinning:{moment(e.date_of_join).format('DD-MM-YYYY')}</Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>City: {e.city} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>State: {e.state} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Age: {e.age} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Documentes: {e.documentes} </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontWeight: 'bold' }}>Rank: {e.teacher_rank} </Form.Label>
                      </Form.Group>
                    </Form>      
                  </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose2}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )
        })}

     <Modal style={{ zIndex: "1500"}} show={show3} onHide={handleClose3}>
        
          <Modal.Title  style={{textAlign:"center"}}>Modal heading</Modal.Title>
      
        <Modal.Body  style={{textAlign:"center"}}>
          not available his profile
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose3}>
            Save Changes
          </Button> */}
          <T_profile  tpprofileid={tpprofileid} closefunction={handleClose3} ></T_profile>
        </Modal.Footer>
      </Modal>
      

    </>
  )
}

export default Teacher