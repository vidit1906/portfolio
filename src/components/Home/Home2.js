import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Projects from "../Projects/Projects";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am passionate about software development and have a strong foundation in programming.
              <br />
              <br />I am fluent in languages like
              <i>
                <b className="purple"> Java, Python, R, JavaScript, and C. </b>
              </i>
              <br />
              <br />
              My areas of interest include developing 
              <i>
                <b className="purple">Web Technologies and Products</b> as well as working on 
                <b className="purple"> Data Science and AI solutions.</b>
              </i>
              <br />
              <br />
              I have hands-on experience with technologies such as <b className="purple">React.js, Node.js, and MongoDB</b> and have worked on projects related to 
              <i>
                <b className="purple"> Blockchain, RAG (Retrieval-Augmented Generation), and Prompt Engineering.</b>
              </i>
              <br />
              <br />
              I enjoy applying my skills to build innovative products, especially those involving 
              <i>
                <b className="purple">Machine Learning, Data Analysis,</b>
              </i> and 
              <i>
                <b className="purple">Automation.</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/vidit1906"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/ViditNaik1"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/vidit-naik-9b5bb81a2/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
