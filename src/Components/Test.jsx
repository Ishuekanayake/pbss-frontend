import React from 'react';
import {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function StudentList({ students }) {

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

    const[editId, setEditId] = useState('')
    const[editstudentId, setEditstudentId] = useState('')
    const[editname, setEditname] = useState('')
    const[editaddress, setEditaddress] = useState('')
    const[editphone, setEditphone] = useState('')
    const[editFax, setEditFax] = useState('')
    const[editemail, setEditemail] = useState('')
    const[editweb, setEditweb] = useState('')
    const[editdateOfAdmission, setEditdateOfAdmission] = useState('')
    const[editdateOfBirth, setEditdateOfBirth] = useState('')



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



    const handleEdit = (id) =>{
      handleShow();
      axios.get(`http://localhost:3857/api/Student/${id}`)
      .then((result) => {
        setEditstudentId(result.data.studentId);
        setEditname(result.data.name);
        setEditaddress(result.data.address);
        setEditphone(result.data.phone);
        setEditFax(result.data.fax);
        setEditemail(result.data.email);
        setEditweb(result.data.web);
        setEditdateOfAdmission(result.data.dateOfAdmission);
        setEditdateOfBirth(result.data.dateOfBirth);
        setEditId(id);
      })
      .catch((error) => {
          console.log(error)
      })
  }

    const handleDelete = (id) =>{
        if(window.confirm("Are you sure to delete this Student") === true){
            axios.delete(`http://localhost:3857/api/Student/${id}`)
            .then((result) => {
                if(result.status === 200)
                {
                    toast.success('Student has been deleted');
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            })
        }
        
    }

    const handleUpdate =(id) => {
      const url = `http://localhost:3857/api/Student/${editId}`;
      const data = {
          "id": editId,
          "studentId": editstudentId,
          "name": editname,
          "address": editaddress,
          "phone": editphone,
          "fax": editFax,
          "email": editemail,
          "web": editweb,
          "dateOfAdmission": editdateOfAdmission,
          "dateOfBirth": editdateOfBirth,
      }

        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Student has been updated');
        }).catch((error) => {
            toast.error(error);
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

        setEditstudentId('');
        setEditname('');
        setEditaddress('');
        setEditphone('');
        setEditFax('');
        setEditemail('');
        setEditweb('');
        setEditdateOfAdmission('');
        setEditdateOfBirth('');
        setEditId('');
    }
    

  return (
    <div>

        <div className="container mt-5">
            <Table bordered hover className="shadow" style={{backgroundColor:'#DDEFC2'}}>
            <thead>
                <tr>
                <th>#</th>
                <th>Student Id</th>
                <th>Name</th>
                <th>Contact Details</th>
                <th>dateOfAdmission</th>
                <th>dateOfBirth</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    data && data.length > 0 ?
                        data.map((item, index) => {
                            return(
                                <tr key={index}>
                                <td>{index+ 1}</td>
                                <td>{item.studentId}</td>
                                <td>{item.name}</td>
                                <td>
                                  <p>address: {item.address}</p>
                                  <p>phone: {item.phone}</p>
                                  <p>fax: {item.fax}</p>
                                  <p>email: {item.email}</p>
                                  <p>web: {item.web}</p>
                                </td>
                                <td>{item.dateOfAdmission}</td>
                                <td>{item.dateOfBirth}</td>
                                <td colSpan={2}>
                                    <center>
                                    <a><FontAwesomeIcon icon={faPen} size="xl" style={{color: "#2a40ea",}} onClick={()=> handleEdit(item.id)}/></a>&nbsp;&nbsp;&nbsp;
                                    <a><FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#e7ea1f",}} onClick={()=> handleDelete(item.id)}/></a>&nbsp;&nbsp;&nbsp;
                                    </center>
                                </td>
                                </tr>
                            )
                        })
                        :
                        'Loading...'
                }
            </tbody>
            </Table>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                   <Row className='mb-5'>
                        <Col><label>editstudentId</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editstudentId"
                        value={editstudentId} onChange={(e) => setEditstudentId(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editname</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editname"
                        value={editname} onChange={(e) => setEditname(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editaddress</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editaddress"
                        value={editaddress} onChange={(e) => setEditaddress(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editphone</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editphone"
                        value={editphone} onChange={(e) => setEditphone(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editFax</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editFax"
                        value={editFax} onChange={(e) => setEditFax(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editemail</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editemail"
                        value={editemail} onChange={(e) => setEditemail(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editweb</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editweb"
                        value={editweb} onChange={(e) => setEditweb(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editdateOfAdmission</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editdateOfAdmission"
                        value={editdateOfAdmission} onChange={(e) => setEditdateOfAdmission(e.target.value)}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col><label>editdateOfBirth</label></Col>
                        <Col>
                        <input type="text" className="form-control" placeholder="editdateOfBirth"
                        value={editdateOfBirth} onChange={(e) => setEditdateOfBirth(e.target.value)}
                        />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
  )
}
