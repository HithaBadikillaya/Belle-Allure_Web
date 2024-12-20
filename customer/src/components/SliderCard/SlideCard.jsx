import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { Link } from "react-router-dom";

const SlideCard = ({ title, desc, cover }) => {
  return (
    <Container className="box">
      <Row><Col md={6}>
          <img src={cover} alt="#" />
        </Col>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <Link
            style={{ textDecoration: "none" }}
            to={"/shop"}
            className="btn-primary"
          >
            View Products
          </Link>
        </Col>
        
      </Row>
    </Container>
  );
};

export default SlideCard;
