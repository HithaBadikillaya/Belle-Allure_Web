import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Wrapper = ({ categories }) => {
  // Filter categories to remove duplicates
  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((cat) => cat.title === category.title)
  );

  return (
    <section className="wrapper background">
      <Container>
        <h1>Product Range</h1>
        <Link style={{ textDecoration: "none" }} to={"/shop"}>
          <Row>
            {uniqueCategories.map((val, index) => {
              return (
                <Col
                  md={3}
                  sm={4}
                  xs={9}
                  className="feature"
                  key={index}
                >
                  <div>
                    <img
                      style={{
                        width: "100%",
                        height: "40vh",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={`http://localhost:7000/uploads/category/${val.picture}`}
                      alt={val.title || "category"}
                    />
                  </div>
                  <h3>{val.title}</h3>
                </Col>
              );
            })}
          </Row>
        </Link>
      </Container>
    </section>
  );
};

export default Wrapper;
