
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFilePdf } from "react-icons/fa";
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';


function Example() {

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Large modal</Button>
     
      <Modal
        style={{zIndex:"1500"}}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header style={{textAlign:"center",color:"#AD7E53",border: "none"}} closeButton>
            Gautam's Profile
        </Modal.Header>
        <Modal.Body>
        <div style={{height:"80vh",display:"flex"}}>
                 
                  <div style={{width:"50%",height:"100%",backgroundColor:"#FFFFFF"}}>
                    <div style={{width:"100%",height:"40%",backgroundColor:"#FFFFFF",position:"relative"}}>
                      <p style={{color:"#AD7E53",textAlign:"center",fontSize:"32px",position:"absolute",top:"35%",left:"10%"}}><b>GAUTAM GAVANDE</b></p>
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
                      <p style={{textAlign:"center",position:"absolute",top:"77%",left:"33%",color:"white",fontSize:"20px"}} >Employe id:001</p>

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
    </>
  );
}

export default Example;