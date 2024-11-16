import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Role() {
    let [data, setdata] = useState([])
    let [role, setrole] = useState({
        role_id: "",
        name: "",
        description: ""
    })

    let [newrole, setnewrole] = useState({
        role_id: "",
        name: "",
        description: ""
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    async function getdata() {
        let data = await fetch("http://localhost:5000/roleapi/role")
        let res = await data.json()
        console.log(res)
        setdata(res)
    }
    useEffect(() => {
        getdata()
    }, [])

    async function adddata() {
        let api = "http://localhost:5000/roleapi/addrole"
        let option = {
            method: "POST",
            body: JSON.stringify(role),
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        let res = await fetch(api, option)
        let final = await res.json()
        console.log(final)
        getdata()
        handleClose()

    }
    async function deleteRole(role_id) {
        try {
            let api = await axios.delete(`http://localhost:5000/roleapi/removerole/${role_id}`)
            console.log(api.data)
            getdata()
        } catch (error) {
            console.error(error)
        }
    }

    function update(id, name, discription) {
        setnewrole({
            ...newrole,
            role_id: id,
            name: name,
            description: discription
        })
        handleShow1()
    }
    async function updateRole(role_id) {
        try {
            console.log(newrole)
            let res = await axios.put(`http://localhost:5000/roleapi/updaterole/${role_id}`, newrole)
            console.log(res.data)
            getdata()
            handleClose1()
        } catch (error) {
            console.error(error)

        }
    }
    return (
        <>
            <Navbar className="bg-body-tertiary justify-content-between">
                <Form inline>
                    <Button variant="primary" onClick={handleShow}>
                        Add Role
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Roleid</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    data.map((e) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{e.role_id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>{<DeleteIcon onClick={() => { deleteRole(e.role_id) }}></DeleteIcon>}</td>
                                    <td>{<EditIcon onClick={() => { update(e.role_id, e.name, e.description) }}></EditIcon>}</td>
                                </tr>
                            </tbody>
                        )
                    })

                }
            </Table>


            <Modal style={{ zIndex: '1500' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Role id</Form.Label>
                            <Form.Control onChange={(e) => setrole({ ...role, role_id: e.target.value })} size="sm" type="text" placeholder="Role id" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setrole({ ...role, name: e.target.value })} size="sm" type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => setrole({ ...role, description: e.target.value })} size="sm" type="text" placeholder="Description" />
                        </Form.Group>

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
            {/* ///update role */}
            <Modal style={{ zIndex: '1500' }} show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Role id</Form.Label>
                            <Form.Control readOnly value={newrole.role_id} size="sm" type="text" placeholder="Role id" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={newrole.name} onChange={(e) => setnewrole({ ...newrole, name: e.target.value })} size="sm" type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={newrole.description} onChange={(e) => setnewrole({ ...newrole, description: e.target.value })} size="sm" type="text" placeholder="Description" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updateRole(newrole.role_id) }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Role