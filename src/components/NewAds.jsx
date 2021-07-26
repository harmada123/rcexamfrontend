import React, { useState, useContext }from 'react';
import '../css/login.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { categories } from '../api/category';
import { newAds } from '../api/ads';
import { UserContext } from '../context/UserContext'
import Alert from 'react-bootstrap/Alert'

const NewAds = (props) => {

  const { closeNewAds } = props;
  const [state, ] = useContext(UserContext)

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);



  const submitNewAds = async () => {
    const payload = {
      title,
      description,
      category,
      user_id: state.user.id
    }

    if(title === undefined || description === undefined || category === undefined) {
      return setError(true)
    }

    const ads = await newAds(payload)
    if(ads.status) {
      setShow(true)
      setError(false)
      setTimeout(() =>{ 
        closeNewAds(false)
        setShow(false)

      },3000)
    }
    
  }

  return (
    
    <Modal.Dialog >
      <Modal.Header 
        closeButton
        onHide={() => closeNewAds(false)}
      >
        <Modal.Title>New Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Alert show={show} variant="success">
        <Alert.Heading>Great</Alert.Heading>
        <p>
          Your ad is sucessfully registered.
        </p>
        <hr />
      </Alert>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Title" 
            onChange={(e)=> setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Text" 
            onChange={(e)=> setDescription(e.target.value)}
          />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="Select A Category">
          <Form.Select 
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Floating label select example"
          >
            <option>Open this select menu</option>
            { 
              categories.map(cat => {
              return (
                  <option value={cat.type}>{cat.name}</option>
              )
            })}
          </Form.Select>
        </FloatingLabel>
        {
          error &&  
          <Form.Text className="text-danger justify-content-lg-center mx-auto">
            Please field up all fields
          </Form.Text> 
        }
      </Modal.Body>
      
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={()=> closeNewAds(false)}
        >
          Close
        </Button>
        <Button 
          variant="primary"
          onClick={()=> submitNewAds()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default NewAds
