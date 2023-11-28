import React from 'react';
import {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function AddStudent() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[studentId, setStudentId] = useState('')
    const[name, setName] = useState('')
    const[address, setAddress] = useState('')
    const[phone, setPhone] = useState('')
    const[fax, setFax] = useState('')
    const[email, setEmail] = useState('')
    const[web, setWeb] = useState('')
    const[dateOfAdmission, setDateOfAdmission] = useState('')
    const[dateOfBirth, setDateOfBirth] = useState('')

    const[editaddress, setEditaddress] = useState('')
    const[editphone, setEditphone] = useState('')
    const[editFax, setEditFax] = useState('')
    const[editemail, setEditemail] = useState('')
    const[editweb, setEditweb] = useState('')



    const[data, setData] = useState([]);

        useEffect(()=>{
        getData();
    },[])

    const getData = () => {
        axios.get(`http://localhost:3857/api/Student`)
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleSave =() => {
        const url = `http://localhost:3857/api/Student`
        const data = {
            "studentId" : studentId,
            "name": name,
            "address": address,
            "phone": phone,
            "fax" : fax,
            "email": email,
            "web": web,
            "dateOfAdmission": dateOfAdmission,
            "dateOfBirth": dateOfBirth
        }
        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success('Student has been added');
        })
    }

    const clear = () => {
        setStudentId('');
        setName('');
        setAddress('');
        setPhone('');
        setFax('');
        setEmail('');
        setWeb('');
        setDateOfAdmission('');
        setDateOfBirth('');
    }

  return (
    <div className='aa'>
    <Container className="mt-5 mb-5 empadd_form">  
        <Row className='mb-3 form_row aa'>
            <Col><label>Student Name</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="Enter Student Name"
            value={name} onChange={(e) => setName(e.target.value)}
            />
            </Col>
        </Row>

        <Row className='mb-3 form_row'>
            <Col><label>Student Id</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="Enter Student Id"
            value={studentId} onChange={(e) => setStudentId(e.target.value)}
            />
            </Col>
        </Row>

        <Row className='mb-3 form_row'>
            <Col><label>Address</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="address"
            value={address} onChange={(e) => setAddress(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>Phone</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="phone"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>Fax</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="fax"
            value={fax} onChange={(e) => setFax(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>Email</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>Web</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="web"
            value={web} onChange={(e) => setWeb(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>DateOfAdmission</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="2023-11-28 Use This Format"
            value={dateOfAdmission} onChange={(e) => setDateOfAdmission(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mb-3 form_row'>
            <Col><label>DateOfBirth</label></Col>
            <Col>
            <input type="text" className="form-control" placeholder="2023-11-28 Use This Format"
            value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
            />
            </Col>
        </Row>
        <Row className='mt-5 form_row bb'>
            <Col>
            <center>
            <button className="btn btn-success" onClick={() => handleSave()}>Add Student</button>
            </center>
            </Col>
        </Row>
    </Container>
</div>
  )
}
