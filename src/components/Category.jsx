import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { categories } from '../api/category';
const  Category = (props) => {   
  const { cat } = props;


  return (
    <Container className="mt-5 fluid">
      <Row className="justify-content-xl-center justify-content-lg-center justify-content-md-center">
        {
          categories.map(category => (
            <Col lg={2} xl={2} md={2}>   
              <Button 
                  variant="link"
                  onClick={()=> {
                    cat(category.type)
                  }}
              >
                      {category.name}
              </Button>
            </Col>
          ))
        }
      </Row>
    </Container>            
  )
}

export default Category;