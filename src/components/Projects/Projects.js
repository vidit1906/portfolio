import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Dataseek: Harnessing Reddit Data with PRAW For Intelligent Search"
              description="Led a team of 5 to develop a search engine utilizing the Reddit API (PRAW) for data collection, with PyLucene and BERT for efficient indexing. Successfully managed over 2.3 million Reddit posts and achieved a rapid indexing speed of 0.54 seconds per document."
              ghLink="https://github.com/vidit1906/dataextraction_praw"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Graph Partitioning - PRRP"
              description="Implemented a clustering algorithm based on graph partitioning with Python, Pandas, and NetworkX, focusing on regionalization with specific cardinality constraints. Improved the run time by 50% compared to the original PRRP algorithm."
              ghLink="https://github.com/sreekar9601/graph-partitioning-prrp"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="InsureSearch: RAG based AI Chatbot"
              description="Implemented Retrieval-Augmented Generation (RAG) to develop a chatbot that answers questions based on health insurance documents. Fine-tuned the Llama3 model with Together AI’s API for optimized response generation."
              ghLink="https://github.com/dhrumilankola/LLama3_Hackathon"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
