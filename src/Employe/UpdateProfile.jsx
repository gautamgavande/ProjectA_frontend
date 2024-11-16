import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateProfile({ emp_id }) {

    // let [data, setdata] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [profile, setprofile] = useState({
        aadhar_no: "",
        alternate_mobile_no: "",
        photo: "",
        city: "",
        state: "",
        work_experience: "",
        documentes: ""
    })

    async function viewProfile(emp_id) {
        try{
        let res = await axios.get(`http://localhost:5000/employe/viewprofile/${emp_id}`)
        console.log(res.data)//[{}]
        const profileData = res.data[0];
       
        if (profileData) {
            setprofile({
                ...profile,
                aadhar_no: profileData.aadhar_no || "",
                alternate_mobile_no: profileData.alternate_mobile_no || "",
                photo: profileData.photo || "",
                city: profileData.city || "",
                state: profileData.state || "",
                work_experience: profileData.work_experience || "",
                documentes: profileData.documentes || ""
            });
        } else {
            // Handle the case where profileData is undefined
            console.log("Profile data not found for emp_id:", emp_id);
        }
    } catch (error) {
        console.log(error);
    }

    }
    useEffect(() => {
        viewProfile(emp_id)
    },[emp_id])
   
    async function updateprofile(emp_id){
        let formData=new FormData()

        formData.append("aadhar_no", profile.aadhar_no)
        formData.append("alternate_mobile_no", profile.alternate_mobile_no)
        if(profile.photo){
            formData.append("photo",profile.photo)
        }
        // formData.append("photo", profile.photo)
        formData.append("city", profile.city)
        formData.append("state", profile.state)
        formData.append("work_experience", profile.work_experience)
        // formData.append("documentes", profile.documentes)
        if(profile.documentes){
            formData.append("documentes", profile.documentes)
        }
          try{
            let res =await axios.put(`http://localhost:5000/employe/updateprofile/${emp_id}`,formData)
            console.log(res)
            handleClose()
            toast.success("✔ profile update succesfully",{
                position: "top-center",
                autoClose: 5000,
                //  transition: "Slide",
                 closeOnClick: true,
              })

          }catch(error){
            console.log(error)
          }
    }
    return (
        <>
            <MdEdit onClick={() => { handleShow() }} />
            <ToastContainer />

            {/* {data.map((e) => {
                return ( */}
                    
                        <Modal show={show} style={{ zIndex: "1500" }} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form >
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Employe id</Form.Label>
                                            <Form.Control readOnly value={emp_id} type="text" placeholder="Employe id" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Aadhar no.</Form.Label>
                                            <Form.Control value={profile.aadhar_no}  onChange={(e) => {setprofile({ ...profile, aadhar_no: e.target.value })}} type="text" placeholder="Last name" />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Alternate no.</Form.Label>
                                            <Form.Control value={profile.alternate_mobile_no} onChange={(e) => { setprofile({ ...profile, alternate_mobile_no: e.target.value }) }}  type="text" placeholder="Last name" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Photo</Form.Label>
                                            <Form.Control   type="file" onChange={(e) => { setprofile({ ...profile, photo: e.target.files[0] }) }}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control value={profile.city}  type="text" placeholder="State" onChange={(e) => setprofile({ ...profile, city: e.target.value })}/>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" >
                                            <Form.Label>State</Form.Label>
                                            <Form.Control value={profile.state}  type="text" placeholder="State" onChange={(e) => setprofile({ ...profile, state: e.target.value })} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>Work Experience</Form.Label>
                                            <Form.Control value={profile.work_experience} onChange={(e) => { setprofile({ ...profile, work_experience: e.target.value }) }} type="text" placeholder="State" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Documentes</Form.Label>
                                            <Form.Control  type="file" onChange={(e) => { setprofile({ ...profile, documentes: e.target.files[0] }) }}/>
                                        </Form.Group>
                                    </Row>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { updateprofile(emp_id) }}>
                                    Add Profile
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    
                {/* )
            })} */}

        </>
    )
}

export default UpdateProfile