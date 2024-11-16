import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PersonIcon from '@mui/icons-material/Person';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { State, City } from 'country-state-city'




function Studentprofile({ student_id }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    let [data, setdata] = useState([])

    let [profile, setprofile] = useState({
      //student_id | aadhar_no    | class    | state | city   | fee_status | photo         | documentes    | subscription
      student_id: "",
      aadhar_no: "",
      class : "",
      state: "",
      city: "",
      fee_status: "",
      photo: "",
      documentes: "",
      subscription: ""
    })

    async function viewstProfile(student_id) {
        let res = await axios.get(`http://localhost:5000/studentprofile/student/${student_id}`)
        console.log(res.data)
        setdata(res.data)
        handleShow()

    }
    ////////////////////

    async function addsprofile() {
      let formData = new FormData()
  
      formData.append("student_id", student_id)
      formData.append("aadhar_no", profile.aadhar_no)
      formData.append("class", profile.alternate_mobile_no)
      formData.append("state", profile.photo)
      formData.append("city", profile.city)
      formData.append("fee_status", profile.state)
      formData.append("photo", profile.work_experience)
      formData.append("documentes", profile.documentes)
      formData.append("subscription", profile.documentes)
  
      let option = {
        method: "POST",
        body: formData
      }
      console.log(formData)
      let res = await fetch("http://localhost:5000/studentprofile/addprofile", option)
      let final = await res.json()
      console.log(final)
  
      console.log(res)
      handleClose1()
    }
    ///
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
    setprofile({ ...profile, state: selectedState });

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
    return (
        <>
                < PersonIcon  onClick={()=>{viewstProfile(student_id)}}></PersonIcon>
                <ControlPointIcon  onClick={()=>{handleShow1()}}></ControlPointIcon>

                {data.map((e) => {
        return (
                <Modal show={show} style={{ zIndex: "1500" }} onHide={handleClose}>
            <Modal.Header closeButton>
              <div style={{ height: "80px", width: "80px", borderRadius: "50%", backgroundColor: "red", marginLeft: "45%" }}>
              <img style={{ height: "100%", width: "100%", borderRadius: "50%", objectFit: "cover", backgroundSize: "cover", backgroundPosition: "center" }} src={e.photo} alt={`${e.student_name}`}></img>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Student ID: {e.student_id}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Student Nmae:{e.student_name}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Email:{e.email}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Aadhar no.: {e.aadhar_no}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Class:{e.class}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>State: {e.state} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>City:{e.city}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Fee status:{e.fee_status}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>documentes: {e.documentes} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>subscription :{e.subscription}  </Form.Label>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
           )
        })}

        {/* ///add student profile */}

        <Modal show={show1} style={{ zIndex: "1500" }} onHide={handleClose1}>
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
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, aadhar_no: e.target.value }) }} placeholder="Last name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Class</Form.Label>
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, class : e.target.value}) }} placeholder="Last name" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Fee status</Form.Label>
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, photo: e.target.value}) }} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <select
                  className='form-select'
                  id='inputState'
                  value={profile.state}
                  onChange={handleStateChange}>

                  <option value="">Select state</option>
                  {states.map((item, index) => (
                    <option key={index} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <select
                                        className="form-select"
                                        id="inputCity"
                                        value={profile.city}
                                        onChange={(e) => setprofile({ ...profile, city: e.target.value })}
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
            <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" onChange={(e) => { setprofile({ ...profile, photo: e.target.files[0] }) }} />
              </Form.Group>
             
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Documentes</Form.Label>
                <Form.Control type="file" onChange={(e) => { setprofile({ ...profile, documentes: e.target.files[0] }) }} />
              </Form.Group>
            </Row>
            <Row>
            <Form.Group  md="6" controlId="validationCustom04">
                <Form.Label>Subscription</Form.Label>
                <Form.Select onChange={(e) => setprofile({ ...profile, subscription: e.target.value })} defaultValue="Choose...">
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { addsprofile() }}>
            Add Profile
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Studentprofile