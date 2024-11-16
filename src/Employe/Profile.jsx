import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PersonIcon from '@mui/icons-material/Person';
import Form from 'react-bootstrap/Form';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Col from 'react-bootstrap/Col';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { State, City } from 'country-state-city'
import { FaFilePdf } from "react-icons/fa";
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Profile({ emp_id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lgShow, setLgShow] = useState(false);


  let [data, setdata] = useState([])

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  /////
  let [profile, setprofile] = useState({
    emp_id: "",
    aadhar_no: "",
    alternate_mobile_no: "",
    photo: "",
    city: "",
    state: "",
    work_experience: "",
    documentes: ""
  })
  async function viewProfile(emp_id) {
    let res = await axios.get(`http://localhost:5000/employe/viewprofile/${emp_id}`)
    console.log(res.data)
    setdata(res.data)
    setLgShow(true)
  }

  async function addprofile() {
    let formData = new FormData()

    formData.append("emp_id", emp_id)
    formData.append("aadhar_no", profile.aadhar_no)
    formData.append("alternate_mobile_no", profile.alternate_mobile_no)
    formData.append("photo", profile.photo)
    formData.append("city", profile.city)
    formData.append("state", profile.state)
    formData.append("work_experience", profile.work_experience)
    formData.append("documentes", profile.documentes)

    // let res =await axios.post("http://localhost:5000/employe/addprofile",profile)
    // let final=await res.json()
    let option = {
      method: "POST",
      body: formData
    }
    console.log(formData)
    let res = await fetch("http://localhost:5000/employe/addprofile", option)
    let final = await res.json()
    console.log(final)

    console.log(res)
    handleClose1()
  }
  //////////////////////////////....................state city
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
      < PersonIcon onClick={() => { viewProfile(emp_id) }}></PersonIcon>
      <ControlPointIcon onClick={() => { handleShow1() }}></ControlPointIcon>

      {/* {data.map((e) => {
        return (
          <Modal show={show} style={{ zIndex: "1500" }} onHide={handleClose}>
            <Modal.Header closeButton>
              <div style={{ height: "80px", width: "80px", borderRadius: "50%", backgroundColor: "red", marginLeft: "45%" }}>
                <img style={{ height: "100%", width: "100%", borderRadius: "50%", objectFit: "cover", backgroundSize: "cover", backgroundPosition: "center" }} src={`http://localhost:5000/Public/image/` + e.photo} alt={`${e.name}`}></img>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Employe ID:  {e.emp_id} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Employe Nmae: {e.name} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Aadhar no: {e.aadhar_no} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Mobile no.:  {e.mobile_no},{e.alternate_mobile_no}  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>City: {e.city} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>State: {e.state} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Work Experience: {e.work_experience} </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 'bold' }}>Documentes: {e.documentes} </Form.Label>
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
      })} */}

      {data.map((e) => {
        return (
      
<Modal
        style={{zIndex:"1500"}}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header style={{textAlign:"center",color:"#AD7E53",border: "none"}} closeButton>
        {e.name}'s Profile
        </Modal.Header>
        <Modal.Body>
        <div style={{height:"80vh",display:"flex"}}>
                 
                  <div style={{width:"50%",height:"100%",backgroundColor:"#FFFFFF"}}>
                    <div style={{width:"100%",height:"40%",backgroundColor:"#FFFFFF",position:"relative"}}>
                      <p style={{color:"#AD7E53",textAlign:"center",fontSize:"32px",position:"absolute",top:"35%",left:"10%",textTransform:'uppercase'}}><b>{e.name}</b></p>
                      <p  style={{color:"#AD7E53",textAlign:"center",fontSize:"15px",position:"absolute",top:"55%",left:"20%"}}>gautamgavande2436@gmail.com</p>
                    </div>
                    <div style={{width:"100%",height:"60%",backgroundColor:"#C9702A",borderTopLeftRadius:"50%",borderTopRightRadius:"50%",position:"relative"}}>
                      {/* <div style={{height:"20%",width:"70%",backgroundColor:"white",position:"absolute",top:"20%",left:"15%",borderBottomLeftRadius:"50px",borderTopRightRadius:"50px"}}>
                      </div> */}
  
                      <h1 style={{textAlign:"center",position:"absolute",top:"30%",left:"25%",color:"rgb(219, 190, 166)",fontSize:"35px"}}>Contact us:</h1>
                      <p style={{textAlign:"center",position:"absolute",top:"50%",left:"34%",color:"rgb(219, 190, 166)",fontSize:"20px"}} >9173789548</p>
                      <p style={{textAlign:"center",position:"absolute",top:"60%",left:"34%",color:"rgb(219, 190, 166)",fontSize:"20px"}}>Bhopal (M.P)</p>
                      <p style={{textAlign:"center",position:"absolute",top:"70%",left:"10%",color:"rgb(219, 190, 166)",fontSize:"20px"}}><i>gautamgavande2436</i>@gmail.com</p>
                      <CallIcon style={{position:"absolute",top:"80%",left:"30%",color:"rgb(219, 190, 166)",fontSize:"2.5vh"}}></CallIcon>
                      <HomeIcon style={{position:"absolute",top:"80%",left:"40%",color:"rgb(219, 190, 166)",fontSize:"2.5vh"}}></HomeIcon>
                      <EmailIcon style={{position:"absolute",top:"80%",left:"50%",color:"rgb(219, 190, 166)",fontSize:"2.5vh"}}></EmailIcon>
                      <YouTubeIcon style={{position:"absolute",top:"80%",left:"60%",color:"rgb(219, 190, 166)",fontSize:"2.5vh"}}></YouTubeIcon>
                    </div>
                  </div>
                  <div style={{width:"50%",height:"100%",background:"#FFFFFF"}}>
                    <div  style={{width:"100%",height:"60%",backgroundColor:"#C9702A",borderBottomLeftRadius:"50%",borderBottomRightRadius:"50%",position:"relative"}}>
                      <div style={{height:"60%",width:"60%",backgroundColor:"#459F93",top:"40%",left:"50%",transform:"Translate(-50%,-50%)",position:"absolute",borderBottomLeftRadius:"50%",borderBottomRightRadius:"50%",borderTopLeftRadius:"50%",borderTopRightRadius:"50%"}}>
                      <img style={{height:"100%",width:"100%",backgroundSize:"cover",backgroundPosition:"center",borderBottomLeftRadius:"50%",borderBottomRightRadius:"50%",borderTopLeftRadius:"50%",borderTopRightRadius:"50%",objectFit:"cover"}} src="https://plus.unsplash.com/premium_photo-1712029680474-57b0c1e186fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D" alt="" />
                      </div>
                      <p style={{textAlign:"center",position:"absolute",top:"77%",left:"33%",color:"white",fontSize:"20px"}} >Employe id:{e.emp_id}</p>

                    </div>
                    <div style={{width:"100%",height:"40%",backgroundColor:"#FFFFFF",position:"relative"}}>
                    <p style={{color:"#AD7E53",fontSize:"32px",position:"absolute",top:"10%",left:"5%"}}><b>Teacher</b></p>
                    <p style={{color:"#AD7E53",fontSize:"28px",position:"absolute",top:"27%",left:"7%"}}>Profile</p>
                    <div style={{height:"45%",width:"2%",backgroundColor:"#AD7E53",position:"absolute",top:"13%",left:"45%"}}></div>
                    <p style={{color:"#AD7E53",fontSize:"20px",position:"absolute",top:"16%",left:"50%"}}>Five Year of work experience</p>
                    <p style={{color:"#AD7E53",fontSize:"15px",position:"absolute",top:"45%",left:"50%"}}>Documents  <FaFilePdf style={{marginLeft:"2px"}}/></p>
                    <p style={{color:"#AD7E53",fontSize:"20px",position:"absolute",top:"70%",left:"5%"}}><b>"Knowledge is your SUPER power..."</b></p>

                   
                    </div>
                  </div>
        </div>
        </Modal.Body>
      </Modal>
      )
    })}


      {/* //  {add profile} */}

      <Modal show={show1} style={{ zIndex: "1500" }} onHide={handleClose1}>
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
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, aadhar_no: e.target.value }) }} placeholder="Last name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Alternate no.</Form.Label>
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, alternate_mobile_no: e.target.value }) }} placeholder="Last name" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" onChange={(e) => { setprofile({ ...profile, photo: e.target.files[0] }) }} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
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
                {/* <Form.Control type="text" value={profile.state} onChange={handleStateChange} placeholder="State" /> */}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Work Experience</Form.Label>
                <Form.Control type="text" onChange={(e) => { setprofile({ ...profile, work_experience: e.target.value }) }} placeholder="State" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Documentes</Form.Label>
                <Form.Control type="file" onChange={(e) => { setprofile({ ...profile, documentes: e.target.files[0] }) }} />
              </Form.Group>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { addprofile() }}>
            Add Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile