import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Footer = ({ loggedIn }) => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>Belle Allure</h1>
            </div>
            <p>
              "Explore, Select, Shop: Your Ultimate Beauty Companion!"
            </p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Quick links</h2>
            <ul>
              <li>Home</li>
              <li>Menu</li>
              {loggedIn ? (
                <>
                  <li>Logout</li>
                </>
              ) : (
                <>
                  <li>Login</li>
                  <li>Register</li>
                </>
              )}
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
             <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Purchasing </li>
              <li>Returns & Refunds </li>
            </ul> 
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              {/* <li>
                70 Washington Square South, New York, NY 10012, United States{" "}
              </li> */}
              <li>Email: BelleAllure@gmail.com</li>
              {/* <li>Phone: +1 1123 456 780</li> */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
