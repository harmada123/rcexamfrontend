import React, { useState, useEffect } from 'react'
import '../css/login.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { login } from '../api/auth';
import Spinner from 'react-bootstrap/Spinner'
const Login = (props) => {

  const { closeLogin, isLogin } = props;
  const [user, setUsername] = useState();
  const [password, setPassword] = useState();
  const [spinnerLoad, setSpinnerLoad] = useState(false);

  const [errorUser, setErrorUser] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
  })


  const errorHandlerUser = () => {
    if(user === undefined) {
      return setErrorUser(true)
    }
    return setErrorUser(false)
  }

  const onLogin = async () => {
    const payload = {
      user,
      password,
    } 

    errorHandlerUser()
    const result = await login(payload);
    setSpinnerLoad(true)
    if (result.status === 200) {
      setUnauthorized(false)
      return setTimeout(() => {
        setSpinnerLoad(false)
        const { token } = result.data
        localStorage.setItem('token', token)
        closeLogin(false)
        isLogin(true)
        window.location.reload(); //intentionally to reload localStorage
      },2000)
    }

    setSpinnerLoad(false)
    return setUnauthorized(true)
  }

  const Toast = () => {
    return (
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
    )
  }


  return (
    <Modal.Dialog >
      <Modal.Header 
        closeButton
        onHide={()=> closeLogin(false)}
      >
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          errorUser &&  
          <Form.Text className="text-danger">
            Please enter a valid username
          </Form.Text> 
        }
        <InputGroup className="mb-3">
          
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
              onChange={(e) => { setUsername(e.target.value) }}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
          <Form.Control 
            onChange={(e) => { setPassword(e.target.value) }}
            type="password" 
            placeholder="Password" 
          />
        </InputGroup>
        {
          unauthorized &&  
          <Form.Text className="text-danger">
            Email or Password is incorrect.
          </Form.Text> 
        }
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={()=> closeLogin(false)}
        >
          Close
        </Button>
        {
          !spinnerLoad ? 
          <Button 
            onClick={()=> onLogin()}
            variant="primary"
          >
            Login
          </Button>
          :
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        }
        

        
      </Modal.Footer>
    </Modal.Dialog>
  )
}
export default Login