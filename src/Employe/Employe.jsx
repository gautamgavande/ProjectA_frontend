import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Switch from '@mui/material/Switch';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import  moment  from 'moment'
import Navbar from 'react-bootstrap/Navbar';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Employe() {
  /////pagination/////////
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rowsPerPage = 8;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event,newpage) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setPage(newpage);
  };
  ///for searching............../////////////
  let [searchEmploye,setsearchEmploye]=useState("")

////
  let [data, setdata] = useState([])
  let [employe, setemploye] = useState({
    emp_id: "",
    name: "",
    email: "",
    password: "",
    mobile_no: "",
    address: "",
    date_of_join: "",
    gender: "",
    status: "",

  })

  //for update employee
  let [newemploye, setnewemploye] = useState({
    emp_id: "",
    name: "",
    email: "",
    password: "",
    mobile_no: "",
    address: "",
    date_of_join: "",
    gender: "",
    status: "",

  })

  //////role show
  let [role, setrole] = useState([])
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  ///for role asigne
  let [roledata, setroledata] = useState({
    emp_id: "",
    role_id: ""
  })

  let [roles,setroles]=useState([])
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
/// update employe
const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  ////show employe data
  async function getdata() {
    try {
      let data = await fetch("http://localhost:5000/api/emp")
      let res = await data.json()
      console.log(res)
      setdata(res)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    getdata()
  }, [])

  ////add employe 
  const adddata = async () => {
    
    let res = await axios.post("http://localhost:5000/api/insertemp", employe)
    console.log(res)
    getdata()
    handleClose()
  }
  // for delete emplye
  async function deleteemploy(emp_id){
    let res= await axios.delete(`http://localhost:5000/api/removeemp/${emp_id}`)
    console.log(res)
    getdata()

  }
  /// for active user
  async function active(id) {
    try {
      let data = await axios.patch(`http://localhost:5000/api/activeuser/${id}`)
      console.log(data)
      getdata()
      toast("Wow so easy !")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  ////doing deactive user
  async function deactive(id) {
    let data = await axios.patch(`http://localhost:5000/api/deactiveuser/${id}`)
    console.log(data)
    getdata()
    toast.success("✔ You are changed status succesfully",{
      position: "top-center",
      autoClose: 5000,
      //  transition: "Slide",
       closeOnClick: true,
    })
  }
  //// for show role of employe
  async function getrole(emp_id) {
    try{
      let data = await axios.get(`http://localhost:5000/api/emp_role/${emp_id}`)
      setrole(data.data)
      handleShow1()
    }catch(error){
      console.log(error)
    }
  }
 //for getting role 
 async function rolesdata() {
  let data = await fetch("http://localhost:5000/roleapi/role")
  let res = await data.json()
  console.log(res)
 setroles(res)
}
useEffect(() => {
  rolesdata()
}, [])
  ////////////////// for asigne role for employe
  
  function fillempid(emp_id) {
      setroledata({
        ...roledata,
        emp_id:emp_id
      })
    handleShow2()
    
  }
  async function addroleasigne(){
    console.log(roledata)
    let data = await axios.post("http://localhost:5000/roleasignapi/addrole", roledata)
    console.log(data)
    handleClose2()

  }
  //////////////revoke
  async function removerole(emp_id,role_id){
    let res=await axios.delete(`http://localhost:5000/roleasignapi/removerole/${emp_id}/${role_id}`)
    console.log(res)
        handleClose1()

  }
 function updateemp(id,name,email,password,mobile,address,date,gender,status){
  console.log(password)
  setnewemploye({
    ...newemploye,
    emp_id: id,
    name: name,
    email: email,
    password:password,
    mobile_no: mobile,
    address: address,
    date_of_join: moment(date).format('YYYY-MM-DD'),
    gender: gender,
    status: status,
  })
  
  handleShow3()
 }
 async function updateemploye(emp_id){
  let res= await axios.put(`http://localhost:5000/api/updateemp/${emp_id}`,newemploye)
  console.log(res)
  handleClose3()
  getdata()
 }
 
  return (
    <>
       <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
      <Button variant="primary" onClick={handleShow}>
        Add Employe
      </Button>   
      </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchEmploye}
              onChange={e=>setsearchEmploye(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button >Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
    
      <br></br>
      {/* <h3 style={{textAlign:"center"}}>All Employes</h3> */}
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Empid</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no.</th>
            <th>Address</th>
            <th>Date of joining</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Role</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        {
          data
          .filter((ele)=>{
            return(
              ele.name.toLowerCase().includes(searchEmploye.toLowerCase())
            )
          })
          .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
          .map((e) => {
            return (
              <tbody>
                <tr key={e.emp_id}>
                  <td>{e.emp_id}</td>
                  <td>{e.name}</td>
                  <td >{e.email}</td>
                  <td>{e.mobile_no}</td>
                  <td>{e.address}</td>
                  <td>{moment(e.date_of_join).format('YYYY-MM-DD')}</td>
                  <td>{e.gender}</td>
                  <td>{e.status === "Deactive" ? (
                    <Switch sx={{
                      '& .MuiSwitch-track': {
                        backgroundColor: 'red'
                      }
                    }} style={{color:"red"}} color="warning"  onClick={() => { active(e.emp_id) }}></Switch>) : (<Switch defaultChecked color='success'  onClick={() => { deactive(e.emp_id) }}></Switch>)} </td>

                  <td><FaEye onClick={() => { getrole(e.emp_id) }} /> <MdEdit onClick={() => { fillempid(e.emp_id)  }} /></td>

                  <td><Profile emp_id={e.emp_id}></Profile><UpdateProfile  emp_id={e.emp_id}></UpdateProfile></td>

                  <td><MdEdit onClick={()=>{updateemp(e.emp_id,e.name,e.email,e.password,e.mobile_no,e.address,e.date_of_join,e.gender,e.status)}}></MdEdit><DeleteIcon fontSize='m' onClick={()=>{deleteemploy(e.emp_id)}} ></DeleteIcon></td>
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
{/* /////add employe */}
      <Modal style={{ zIndex: "1500" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Empid</Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, emp_id: e.target.value })} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, name: e.target.value })} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setemploye({ ...employe, email: e.target.value })} type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, password: e.target.value })} type='password' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Address</Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, address: e.target.value })} placeholder="Enter Address" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Mobile no. </Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, mobile_no: e.target.value })} placeholder='Enter Mobile no.' />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Date of joining</Form.Label>
                <Form.Control onChange={(e) => setemploye({ ...employe, date_of_join: e.target.value })} type='date' />
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select onChange={(e) => setemploye({ ...employe, gender: e.target.value })} defaultValue="Choose...">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select onChange={(e) => setemploye({ ...employe, status: e.target.value })} defaultValue="Choose...">
                  <option>Active</option>
                  <option>Deactive</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { adddata() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* /// update employe */}

      <Modal style={{ zIndex: "1500" }} show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Empid</Form.Label>
                <Form.Control readOnly value={newemploye.emp_id} onChange={(e)=>setnewemploye({...newemploye,emp_id: e.target.value})} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control value={newemploye.name} onChange={(e)=>setnewemploye({...newemploye,name: e.target.value})} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control value={newemploye.email} onChange={(e)=>setnewemploye({...newemploye,email: e.target.value})}  type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control value={newemploye.password} onChange={(e)=>setnewemploye({...newemploye,password: e.target.value})} type='text' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Address</Form.Label>
                <Form.Control value={newemploye.address}  onChange={(e)=>setnewemploye({...newemploye,address: e.target.value})}  placeholder="Enter Address" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Mobile no. </Form.Label>
                <Form.Control value={newemploye.mobile_no} onChange={(e)=>setnewemploye({...newemploye,mobile_no: e.target.value})} placeholder='Enter Mobile no.' />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Date of joining</Form.Label>
                <Form.Control value={newemploye.date_of_join} onChange={(e)=>setnewemploye({...newemploye,date_of_join: e.target.value})} type='date' />
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={newemploye.gender} onChange={(e)=>setnewemploye({...newemploye,gender: e.target.value})} defaultValue="Choose...">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select value={newemploye.status} onChange={(e)=>setnewemploye({...newemploye,status: e.target.value})} defaultValue="Choose...">
                  <option>Active</option>
                  <option>Deactive</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { updateemploye(newemploye.emp_id) }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* for role show */}


      <Modal style={{ zIndex: "1500", textAlign: "center"}} show={show1} onHide={handleClose1}>

        <Modal.Title >Employe's roles</Modal.Title>

        <Modal.Body>
          {(role.length > 0) ?
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Emp_id</th>
                  <th>Role</th>
                  <th>Role id</th>
                  <th>Action</th>
                </tr>
              </thead>
              {
                role.map((e) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{e.emp_id}</td>
                        <td>{e.name}</td>
                        <td>{e.role_id}</td>
                        <td><Button onClick={()=>{removerole(e.emp_id,e.role_id)}}>Revoke</Button></td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </Table> : <p>Not provide  any role</p>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* // for role asigne */}

      <Modal style={{ zIndex: "1500" }} show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Emp id</Form.Label>
              <Form.Control readOnly value={roledata.emp_id} size="sm" type="text" placeholder="emp Id" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>role name</Form.Label>
              <Form.Select onChange={(e)=>{setroledata({...roledata,role_id:e.target.value})}} size="sm">
                {
                  roles.map((e)=>{
                    return(
                    <option value={e.role_id}>{e.name}</option>
                    )
                  })
                }  
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{addroleasigne()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Employe