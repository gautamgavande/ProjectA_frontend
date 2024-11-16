import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function UpdateStudent({student_id}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [profile, setprofile] = useState({
    aadhar_no: "",
    class: "",
    state: "",
    city: "",
    fee_status: "",
    photo: "",
    documentes: "",
    subscription:""
})

  async function viewProfile(student_id) {
    try{
    let res = await axios.get(`http://localhost:5000/studentprofile/getstudent/${student_id}`)
    console.log(res.data)//[{}]
    const profileData = res.data[0];
    //student_id | aadhar_no    | class    | state | city   | fee_status | photo    | documentes  | subscription
    if (profileData) {
        setprofile({
            ...profile,
            aadhar_no: profileData.aadhar_no || "",
            class: profileData.class || "",
            state: profileData.state || "",
            city: profileData.city || "",
            fee_status: profileData.fee_status || "",
            photo: profileData.photo || "",
            documentes: profileData.documentes || "",
            subscription: profileData.subscription || "",

        });
    } else {
        // Handle the case where profileData is undefined
        console.log("Profile data not found for student_id:",student_id );
    }
} catch (error) {
    console.log(error);
}

}
useEffect(() => {
  viewProfile(student_id)
},[student_id])
async function updateprofile(student_id){
  let formData=new FormData()
 
  formData.append("aadhar_no", profile.aadhar_no)
  formData.append("class", profile.class)
  formData.append("state", profile.state)
  formData.append("city", profile.city)
  formData.append("fee_status", profile.fee_status)

  if(profile.photo){
      formData.append("photo",profile.photo)
  }
  if(profile.documentes){
      formData.append("documentes", profile.documentes)
  }
  formData.append("subscription", profile.subscription)
    try{
      let res =await axios.put(`http://localhost:5000/employe/updateprofile/${student_id}`,formData)
      console.log(res)
      handleClose()
    }catch(error){
      console.log(error)
    }
}
  return (<>
      <MdEdit  onClick={()=>{handleShow()}}/>

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
                                            <Form.Control readOnly value={student_id} type="text" placeholder="Employe id" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Aadhar no.</Form.Label>
                                            <Form.Control value={profile.aadhar_no }  onChange={(e) => {setprofile({ ...profile, aadhar_no: e.target.value })}} type="text" placeholder="Last name" />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Class</Form.Label>
                                            <Form.Control value={profile.class} onChange={(e) => { setprofile({ ...profile, class: e.target.value }) }}  type="text" placeholder="Last name" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control value={profile.state}   type="text" onChange={(e) => { setprofile({ ...profile, state: e.target.value }) }}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control value={profile.city}  type="text" placeholder="State" onChange={(e) => setprofile({ ...profile, city: e.target.value })}/>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" >
                                            <Form.Label>Fee status</Form.Label>
                                            <Form.Control value={profile.fee_status}  type="text" placeholder="State" onChange={(e) => setprofile({ ...profile, fee_status: e.target.value })} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>Subscription</Form.Label>
                                            <Form.Control value={profile.subscription} onChange={(e) => { setprofile({ ...profile, subscription:e.target.value }) }} type="text" placeholder="State" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Photo</Form.Label>
                                            <Form.Control  type="file" onChange={(e) => { setprofile({ ...profile, photo:e.target.files[0] }) }}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Documentes</Form.Label>
                                            <Form.Control  type="file" onChange={(e) => { setprofile({ ...profile,documentes:e.target.files[0] }) }}/>
                                        </Form.Group>
                                    </Row>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { updateprofile(student_id) }}>
                                    Add Profile
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    
                {/* )
            })} */}


  </>
    

  )
}

export default UpdateStudent