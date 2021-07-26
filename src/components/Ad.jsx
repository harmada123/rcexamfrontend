import React, { useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { UserContext } from '../context/UserContext';


const Ad = ({ ads, loading }) => {
  const [state,] = useContext(UserContext)
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log('state', state.user)
  return (
    <ul className='list-group mt-4'>
      {ads.map(ad => (
        <Card key={ad.id} className='mt-4'>
          <Card.Header as="h5">{ad.title}</Card.Header>
          <Card.Body>
            <Card.Title>{ad.description}</Card.Title>
            <Card.Text
            >
              {
                typeof state.user === 'undefined'
                  ? `${ad.category}` 
                  :  <Link  to={`/edit/${ad.id}`}>
                      {ad.category}
                    </Link>
              }
            </Card.Text>
            <footer className="blockquote-footer"> 
              {
                typeof ad.creator?.user !== 'undefined' ? <cite>By {ad.creator.user}</cite> : <cite>Anonymous</cite>
              }
              </footer>
          </Card.Body>
        </Card>
      ))}
    </ul>
  );
};

export default Ad;