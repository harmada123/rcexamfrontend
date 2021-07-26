import React, { useState, useEffect, useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { validateToken  } from '../api/auth';
import { UserContext } from '../context/UserContext';
const NavBar = (props) => {
    
    const { setLogin, newAds, isLogin } = props;
    const [ads, setAds] = useState(newAds);
    const [name, setName ] = useState()
    const [,dispatch] = useContext(UserContext);

    const setNewAds = () => {
      newAds(!ads);
      setAds(!newAds)
    }

    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem('token')
        const payload = {
          token: token
        }
        const validatedUser = await validateToken(payload)
        if(validatedUser.status === 200) {
          dispatch({type: 'SAVE_DATA', payload: validatedUser.data.token })
          return setName(validatedUser.data.token.user.user)
        }
        dispatch({type: 'DELETE_DATA' })
      }
      fetchUser();
    },[isLogin])

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">MyAdsite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              { name && 
                <Button className="" onClick={() => setNewAds()}>New</Button>
              } 
              </Nav>
            <Nav>
              { name && `Hi ${name}!` }
            </Nav>
            <Nav>
              {
                name 
                ? <Button 
                    onClick={() => {
                      localStorage.removeItem('token');

                      dispatch({type: 'DELETE_DATA' })
                      window.location.reload(); 
                    }}
                    variant="link" >Logout
                  </Button> 
                : <Button  variant="link"  onClick={() => setLogin(true)}>Login</Button> 
              }
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;
