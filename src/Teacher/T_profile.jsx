import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { State, City } from 'country-state-city'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function T_profile({tpprofileid,closefunction}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [tprofile,settprofile]=useState({
    teacher_id:"",
    aadhar_no:"",
    experience:"",
    date_of_join:"",
    photo:"",
    documentes:"",
    city:"",
    state :"",
    age:"",
    teacher_rank:""

  })
/////////////////////city state////////////
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);

useEffect(() => {
  const getAllStates = async () => {
    try {
      const states = await State.getStatesOfCountry('IN'); // 'IN' is the country code for India
      setStates(states);
    } catch (err) {
      console.log(err);
    }
  };

  getAllStates();
}, []);

const handleStateChange = (e) => {
  const selectedState = e.target.value;
  settprofile({ ...tprofile, state: selectedState });

  if (selectedState) {
    const countryCode = 'IN';
    try {
      const stateCities = City.getCitiesOfState(countryCode, selectedState);
      setCities(stateCities);
    } catch (err) {
      console.log(err);
    }
  } else {
    setCities([]);
  }
};
async function addprofile() {
  let formData = new FormData()

  formData.append("teacher_id", tpprofileid)
  formData.append("aadhar_no",tprofile.aadhar_no)
  formData.append("experience", tprofile.experience)
  formData.append("photo", tprofile.photo)
  formData.append("city", tprofile.city)
  formData.append("state", tprofile.state)
  formData.append("date_of_join", tprofile.date_of_join)
  formData.append("documentes", tprofile.documentes)
  formData.append("age", tprofile.age)
  formData.append("teacher_rank", tprofile.teacher_rank)

  let res =await axios.post("http://localhost:5000/teacherprofile/addtprofile",formData)
  console.log(res.data)
  if(res.data.affectedRows >0){
    handleClose()
    closefunction()
  }else{
    alert("data not submitted")
  }
 
}
  return (
    <>
     <Button variant="primary" onClick={handleShow}>
       Add Tacher Profile
      </Button>
     <Modal style={{zIndex:"1600"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Teacher id</Form.Label>
                <Form.Control readOnly value={tpprofileid} type="text" placeholder="Employe id" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Aadhar no.</Form.Label>
                <Form.Control type="text" onChange={(e) => { settprofile({ ...tprofile,aadhar_no: e.target.value }) }} placeholder="Last name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Experience</Form.Label>
                <Form.Control type="text" onChange={(e) => { settprofile({ ...tprofile, experience: e.target.value }) }} placeholder="Last name" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" onChange={(e) => { settprofile({ ...tprofile,age: e.target.value }) }} placeholder="State" />
              </Form.Group>
              
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <select
                  className='form-select'
                  id='inputState'
                  value={tprofile.state}
                  onChange={handleStateChange}>

                  <option value="">Select state</option>
                  {states.map((item, index) => (
                    <option key={index} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* <Form.Control type="text" value={profile.state} onChange={handleStateChange} placeholder="State" /> */}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <select
                                        className="form-select"
                                        id="inputCity"
                                        value={tprofile.city}
                                        onChange={(e) => settprofile({ ...tprofile, city: e.target.value })}
                                    >
                                        <option value="">Select city</option>
                                        {cities.map((item, index) => (
                                            <option key={index} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                {/* <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, city: e.target.value }) }} placeholder="City" /> */}
              </Form.Group>
            
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Date of  joinning</Form.Label>
                <Form.Control type="date" onChange={(e) => { settprofile({ ...tprofile, date_of_join: e.target.value }) }} placeholder="State" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="text" onChange={(e) => { settprofile({ ...tprofile,teacher_rank: e.target.value }) }} placeholder="State" />
              </Form.Group>
             
            </Row>
            <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" onChange={(e) => { settprofile({ ...tprofile, photo: e.target.files[0] }) }} />
              </Form.Group>
              
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Documentes</Form.Label>
                <Form.Control type="file" onChange={(e) => { settprofile({ ...tprofile, documentes: e.target.files[0] }) }} />
              </Form.Group>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{addprofile()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default T_profile