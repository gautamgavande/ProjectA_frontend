import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import Studentprofile from './Studentprofile';
import UpdateStudent from './UpdateStudent';


function Student() {
  let [data, setData] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

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
  ///
  let [searchStudent,setsearchStudent]=useState("")

///////////////////
  let [student, setstudent] = useState({
    student_id: "",
    student_name: "",
    email: "",
    password: "",
    date_of_join: "",
    mobile_no: "",
    gender: "",
    status: ""
  })
  async function getdata() {
    try {
      let res = await axios.get('http://localhost:5000/student/studentes')
      setData(res.data)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }
  useEffect(() => {
    getdata()
  }, [])

  async function deletestudent(student_id) {
    try {
      let res = await axios.delete(`http://localhost:5000/student/removestudent/${student_id}`)
      console.log(res)
      getdata()
    } catch (error) {
      console.log(error)
    }

  }
  async function addstudent() {
    try {
      let res = await axios.post(`http://localhost:5000/student/addnewstudent`, student)
      console.log(res)
      getdata()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  function update(student_id,student_name,email,password,date_of_join,mobile_no,gender,status){
       setstudent({
        ...student,
        student_id:student_id,
        student_name:student_name,
        email:email,
        password:password,
        date_of_join:moment(date_of_join).format('YYYY-MM-DD'),
        mobile_no:mobile_no,
        gender:gender,
        status:status
       })
       handleShow1()
  }
  async function updatestudent(student_id){
    try{
      let res=await axios.patch(`http://localhost:5000/student/updatestudent/${student_id}`,student)
      console.log(res)
      getdata()
      handleClose1()
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between">
        <Form inline>
          <Button variant="primary" onClick={()=>{handleShow()}}>
            Add Student
          </Button>
        </Form>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                value={searchStudent}
                onChange={e=>setsearchStudent(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button >Submit</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      <br></br>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>date of join</th>
            <th>Mobile No</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        {
          data
          .filter((ele)=>{
            return(
              ele.student_name.toLowerCase().includes(searchStudent.toLowerCase())
            )
          })
          .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
          .map((e) => {
            return (
              <tbody>
                <tr>
                  <td>{e.student_id}</td>
                  <td>{e.student_name}</td>
                  <td>{e.email}</td>
                  <td>{moment(e.date_of_join).format('YYYY-MM-DD')}</td>
                  <td>{e.mobile_no}</td>
                  <td>{e.gender}</td>
                  <td><Switch ></Switch></td>
                  <td><Studentprofile student_id={e.student_id} ></Studentprofile  > <UpdateStudent  student_id={e.student_id}></UpdateStudent></td>
                  <td><EditIcon  onClick={()=>{update(e.student_id,e.student_name,e.email,e.password,e.date_of_join,e.mobile_no,e.gender,e.status)}}></EditIcon><DeleteIcon onClick={() => { deletestudent(e.student_id) }}></DeleteIcon></td>
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
      <Modal style={{ zIndex: "1500" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label> Student id</Form.Label>
                <Form.Control onChange={(e) => setstudent({ ...student, student_id: e.target.value })} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Student Name</Form.Label>
                <Form.Control onChange={(e) => setstudent({ ...student, student_name: e.target.value })} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setstudent({ ...student, email: e.target.value })} type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setstudent({ ...student, password: e.target.value })} type='password' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Date of joining</Form.Label>
                <Form.Control onChange={(e) => setstudent({ ...student, date_of_join: e.target.value })} type='date' />
              </Form.Group>
             
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Mobile no. </Form.Label>
                <Form.Control onChange={(e) => setstudent({ ...student, mobile_no: e.target.value })} placeholder='Enter Mobile no.' />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select onChange={(e) => setstudent({ ...student, gender: e.target.value })} defaultValue="Choose...">
                  <option>...Choose</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>

            </Row>
            <Row className="mb-3">
           
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select onChange={(e) => setstudent({ ...student, status: e.target.value })} defaultValue="Choose...">
                  <option>...Choose</option>
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
          <Button variant="primary" onClick={() => { addstudent() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* //// for update */}
      <Modal style={{ zIndex: "1500" }} show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label> Student id</Form.Label>
                <Form.Control readOnly value={student.student_id} onChange={(e) => setstudent({ ...student, student_id: e.target.value })} type="text" placeholder="Enter empid" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Student Name</Form.Label>
                <Form.Control value={student.student_name} onChange={(e) => setstudent({ ...student, student_name: e.target.value })} type="text" placeholder="Enter name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control value={student.email} onChange={(e) => setstudent({ ...student, email: e.target.value })} type='email' placeholder="Enter email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control value={student.password} onChange={(e) => setstudent({ ...student, password: e.target.value })} type='password' placeholder="Enter password" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Date of joining</Form.Label>
                <Form.Control value={moment(student.date_of_join).format('YYYY-MM-DD')} onChange={(e) => setstudent({ ...student, date_of_join: e.target.value })} type='date' />
              </Form.Group>
             
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Mobile no. </Form.Label>
                <Form.Control value={student.mobile_no} onChange={(e) => setstudent({ ...student, mobile_no: e.target.value })} placeholder='Enter Mobile no.' />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={student.gender} onChange={(e) => setstudent({ ...student, gender: e.target.value })} defaultValue="Choose...">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>

            </Row>
            <Row className="mb-3">
           
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select  value={student.status}  onChange={(e) => setstudent({ ...student, status: e.target.value })} defaultValue="Choose...">
                  <option>Active</option>
                  <option>Deactive</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { updatestudent(student.student_id) }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Student