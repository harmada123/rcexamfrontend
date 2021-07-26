import React, { useState, useEffect }from 'react';
import '../css/login.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { categories } from '../api/category';
import { updateAds, deleteTheAds, getAdsById } from '../api/ads';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from 'react-router';
import {  useParams } from "react-router-dom";
import { useAlert } from 'react-alert'


const EditAds = () => {
  const history = useHistory()
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadAds()
  },[])

  const alert = useAlert()

  const loadAds = async () => {
    const ads = await getAdsById(id);
    const { data } =  ads
    setTitle(data.title)
    setDescription(data.description)
    setCategory(data.category)
  }
  
  const submitEditedAds = async () => {
    const payload = {
      id,
      title,
      description,
      category,
    }

    if(title === undefined || description === undefined || category === undefined) {
      return setError(true)
    }

    const ads = await updateAds(payload)

    if(ads.status) {
      setShow(true)
      setError(false)
      setTimeout(() =>{ 
        setShow(false)
      },3000)
    }
  }

  const deleteAds = async () => {
    const payload = {
      id,
      title,
      description,
      category,
    }
    const result = await deleteTheAds(payload);

    if(result.status === 200) {
      console.log(result)
      alert.error(result.data.message)
    }
    return history.push('/')

  }

  return (
    <Modal.Dialog >
      <Modal.Header 
      >
        <Modal.Title>Edit Ads</Modal.Title>
        <Button 
          variant="danger"
          onClick={()=> deleteAds()}
        >
          Delete
        </Button>
      </Modal.Header>
      <Modal.Body>
      <Alert show={show} variant="success">
        <Alert.Heading>Great</Alert.Heading>
        <p>
          Your ad is sucessfully edited.
        </p>
        <hr />
      </Alert>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            defaultValue={title}
            placeholder="Enter Title" 
            onChange={(e)=> setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            defaultValue={description}
            placeholder="Enter Text" 
            onChange={(e)=> setDescription(e.target.value)}
          />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="Select A Category">
          <Form.Select 
            defaultValue={category}
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
          onClick={()=> history.push('/')}
        >
          Back
        </Button>
        
        <Button 
          variant="primary"
          onClick={()=> submitEditedAds()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default EditAds;