import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { LuCopy } from "react-icons/lu";
import { FiZap } from "react-icons/fi";
import "./style2.css";

const UniqueToken = () => {
  const [token, setToken] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    toast.dismiss();

    setToken(uuidv4());

    toast.success(`Token has been generated successfully!`);
  };

  useEffect(() => {
    setToken(uuidv4());
  }, []);

  const copyToClipboard = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.dismiss();
        toast.success("Copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy:", err);
      });
  };
  return (
    <>
      <div className="animated-body-bg"></div>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }} className="p-3">
            <Card className="text-center shadow rounded">
              <Card.Header className="bg-dark">
                <h1 className="tool-title">
                  UUID
                  <br />
                  Token Generator
                </h1>
              </Card.Header>
              <Card.Body className="py-4">
                <Form onSubmit={formSubmitHandler}>
                  <Row className="mt-3 mb-5">
                    <Col md={12}>
                      <span className="token-item">{token ?? ""}</span>
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-3">
                    <Col>
                      <Button
                        type="submit"
                        variant="dark"
                        size="lg"
                        className="w-100 glow-button-btn1"
                      >
                        <FiZap /> Generate
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        size="lg"
                        variant="dark"
                        className="w-100 glow-button-btn2"
                        onClick={() => copyToClipboard(token)}
                      >
                        <LuCopy /> Copy
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer className="py-3 bg-dark text-center">
                <div className="dev-name">By: Arindam Roy</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UniqueToken;
