import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios'
import TablePagination from '@mui/material/TablePagination';

function Courses() {
    ///pagination
    const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rowsPerPage = 8;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, newpage) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        setPage(newpage);
    };
    //////

    let [data, setData] = useState([])
    let [course, setcourse] = useState({
        course_id: "",
        course_name: "",
        syllabus: "",
        duration: "",
        fees: "",
        description: ""

    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);



    async function getdata() {
        try {
            let res = await axios.get('http://localhost:5000/course/courses')
            setData(res.data)
        } catch (error) {
            console.log('Error fetching data:', error)
        }
    }
    useEffect(() => {
        getdata()
    }, [])

    /// delete course
    async function deletecourse(course_id) {
        let res = await axios.delete(`http://localhost:5000/course/removecourse/${course_id}`)
        console.log(res)
        getdata()

    }
    //// for add course
    async function addcourse() {
        let formData = new FormData()
        formData.append("course_id", course.course_id)
        formData.append("course_name", course.course_name)
        formData.append("syllabus", course.syllabus)
        formData.append("duration", course.duration)
        formData.append("fees", course.fees)
        formData.append("description", course.description)

        let data = await axios.post(`http://localhost:5000/course/newcourse`, formData)
        console.log(data)
        handleClose1()
        getdata()
    }
    //// for update
    let [updata, setupdata] = useState({
        course_id: "",
        course_name: "",
        syllabus: "",
        duration: "",
        fees: "",
        description: ""
    })

    function update(id, name, syllabus, duration, fees, description) {
        setupdata(
            {
                ...updata,
                course_id: id,
                course_name: name,
                syllabus: syllabus,
                duration: duration,
                fees: fees,
                description: description
            }
        )
        handleShow()
    }
    async function updatecourse(course_id) {
        console.log(updata)
        let formData = new FormData()
        formData.append("course_id", updata.course_id)
        formData.append("course_name", updata.course_name)
        formData.append("duration", updata.duration)
        formData.append("fees", updata.fees)
        formData.append("description", updata.description)
        if (updata.syllabus) {
            formData.append("syllabus", updata.syllabus)
        }

        let data = await axios.put(`http://localhost:5000/course/updatecourse/${course_id}`, formData)
        console.log(data)
        handleClose()
        getdata()
    }
    return (
        <>
            <Navbar className="bg-body-tertiary justify-content-between">
                <Form inline>
                    <Button variant="primary" onClick={() => { handleShow1() }} >
                        Add Courses
                    </Button>
                </Form>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
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
                        <th>Course Id</th>
                        <th>course Name</th>
                        <th>Duration</th>
                        <th>Fees</th>
                        <th>Description</th>
                        <th>Syllabus</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((e) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{e.course_id}</td>
                                        <td>{e.course_name}</td>
                                        <td>{e.duration}</td>
                                        <td>{e.fees}</td>
                                        <td>{e.description}</td>
                                        {/* <td>{<PictureAsPdfIcon ></PictureAsPdfIcon>}</td> */}
                                        <td><a target='_blank' href={e.syllabus}><PictureAsPdfIcon ></PictureAsPdfIcon></a></td>
                                        <td>{<DeleteIcon onClick={() => { deletecourse(e.course_id) }} ></DeleteIcon>}</td>
                                        <td>{<EditIcon onClick={() => { update(e.course_id, e.course_name, e.syllabus, e.duration, e.fees, e.description) }} ></EditIcon>}</td>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course id</Form.Label>
                            <Form.Control readOnly value={updata.course_id} type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course name</Form.Label>
                            <Form.Control value={updata.course_name} onChange={(e) => { setupdata({ ...updata, course_name: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Syllabus</Form.Label>
                            <Form.Control onChange={(e) => { setupdata({ ...updata, syllabus: e.target.files[0] }) }} type="file" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control value={updata.duration} onChange={(e) => { setupdata({ ...updata, duration: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Fees</Form.Label>
                            <Form.Control value={updata.fees} onChange={(e) => { setupdata({ ...updata, fees: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={updata.description} onChange={(e) => { setupdata({ ...updata, description: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updatecourse(updata.course_id) }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal style={{ zIndex: "1500" }} show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course id</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, course_id: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course name</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, course_name: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Syllabus</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, syllabus: e.target.files[0] }) }} type="file" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, duration: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Fees</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, fees: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => { setcourse({ ...course, description: e.target.value }) }} type="text" placeholder="name@example.com" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { addcourse() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Courses