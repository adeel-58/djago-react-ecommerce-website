import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <p>The page you are looking for does not exist.</p>
          <Button as={Link} to="/" variant="primary">
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
