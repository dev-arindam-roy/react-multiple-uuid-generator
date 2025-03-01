import React, { useState, useEffect } from "react";
import * as Helper from "./Helper";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { LuCopy } from "react-icons/lu";
import { FiZap } from "react-icons/fi";
import "./style.css";

const PasswordCreator = () => {
  const [pwdLength, setPwdLength] = useState(16);
  const [pwdCount, setPwdCount] = useState(4);
  const [pwds, setPwds] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (pwdLength < 8) {
      toast.error("Password length must be at least 8 for security");
      return;
    }
    if (pwdCount < 4) {
      toast.error("Password count must be at least 4");
      return;
    }

    let pwdArr = Array.from({ length: pwdCount }, () =>
      Helper.generateStrongPassword(pwdLength)
    );
    setPwds(pwdArr);
    toast.success(
      `${pwdArr.length} - Passwords has been generated successfully!`
    );
  };

  useEffect(() => {
    let pwdArr = Array.from({ length: pwdCount }, () =>
      Helper.generateStrongPassword(pwdLength)
    );
    setPwds(pwdArr);
  }, []);

  const copyToClipboard = (event, password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        const liElement = event.target.closest("li");
        liElement.classList.add("copied");
        toast.success("Copied!");
        setTimeout(() => liElement.classList.remove("copied"), 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy:", err);
      });
  };
  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }} className='p-3'>
            <Card className="text-center shadow rounded">
              <Card.Header className="bg-dark">
                <h1 className="tool-title">Password Generator</h1>
              </Card.Header>
              <Card.Body className="py-4">
                <Form onSubmit={formSubmitHandler}>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3 text-center"
                        controlId="pwdCharLen"
                      >
                        <Form.Label>Length:</Form.Label>
                        <Form.Control
                          type="number"
                          step={1}
                          min={8}
                          max={30}
                          placeholder="Length"
                          required
                          value={pwdLength}
                          onChange={(e) =>
                            setPwdLength(parseInt(e.target.value, 10))
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3 text-center"
                        controlId="pwdCount"
                      >
                        <Form.Label>How many?:</Form.Label>
                        <Form.Control
                          type="number"
                          step={1}
                          min={4}
                          max={50}
                          placeholder="How many?"
                          required
                          value={pwdCount}
                          onChange={(e) =>
                            setPwdCount(parseInt(e.target.value, 10))
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Button type="submit" variant="dark" size="lg" className="w-100">
                        <FiZap /> Generate <FiZap />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              {pwds.length > 0 && (
                <Card.Footer className="animated-bg">
                  <div className="pwd-item-container">
                    <ul>
                      {pwds.map((pwd, index) => (
                        <li key={index}>
                          {pwd}
                          <button onClick={(event) => copyToClipboard(event, pwd)}>
                            <LuCopy size={20} strokeWidth={1.5} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordCreator;
