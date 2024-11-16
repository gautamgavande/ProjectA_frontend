import React from 'react'
import Card from 'react-bootstrap/Card';


function Card1({ title, total, backgroundColor, icon }) {

  return (<>
    <Card style={{ width: '18rem', backgroundColor: backgroundColor, color: "white" }}>
      <Card.Body  style={{position:"relative"}}>
        <Card.Title style={{ fontSize: "3vh" }} >Total {title}</Card.Title>
        <Card.Text style={{ position: "absolute", top: "2%",left:"65%",fontSize:"70px" }}>
          {icon}
        </Card.Text>
        <Card.Text style={{ fontSize: "50px" }} >
          {total + 200}
        </Card.Text>
        <Card.Subtitle style={{ color: "white" }} className="mb-2">85% {title} incrise every year</Card.Subtitle>
      </Card.Body>
    </Card>
  </>
  )
}

export default Card1