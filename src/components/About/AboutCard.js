import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Vidit Naik </span>
            from <span className="purple">Riverside, California.</span>
            <br />
            I am currently pursuing a Master of Science in Computer Science at the University of California, Riverside.
            <br />
            I have previously completed a B.Tech in Computer Science and Engineering from Vellore Institute of Technology, Chennai.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Exploring Web Technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build innovative solutions that create an impact!"{" "}
          </p>
          <footer className="blockquote-footer">Vidit Naik</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
