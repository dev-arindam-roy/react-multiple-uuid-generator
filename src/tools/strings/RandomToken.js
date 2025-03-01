import React, { useState, useEffect } from "react";
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

const RandomToken = () => {
  const [tokenLength, setTokenLength] = useState(36);
  const [token, setToken] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (tokenLength < 16) {
      toast.error("Minimum length 16");
      return;
    }

    setToken(generateToken(tokenLength));

    toast.success(`Token has been generated successfully!`);
  };

  const generateToken = (length = 36) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  useEffect(() => {
    setToken(generateToken(tokenLength));
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
                  Random
                  <br />
                  Token Generator
                </h1>
              </Card.Header>
              <Card.Body className="py-4">
                <Form onSubmit={formSubmitHandler}>
                  <Row>
                    <Col md={4} sm={4} xs={4}>
                      <Form.Group
                        className="mb-3 text-center"
                        controlId="tokenCharLen"
                      >
                        <Form.Control
                          type="number"
                          step={1}
                          min={16}
                          max={300}
                          size="lg"
                          placeholder="Length"
                          required
                          value={tokenLength}
                          onChange={(e) =>
                            setTokenLength(parseInt(e.target.value, 10))
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                      <Button
                        type="submit"
                        variant="dark"
                        size="lg"
                        className="w-100"
                      >
                        <FiZap /> Generate <FiZap />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              {token !== "" && (
                <Card.Footer className="animated-bg">
                  <span className="token-item">{token}</span>
                </Card.Footer>
              )}
              <Card.Footer className="p-3 bg-dark text-center">
                <Button
                  type="button"
                  size="lg"
                  variant="dark"
                  className="mx-2 glow-button-btn1"
                  onClick={() => copyToClipboard(token)}
                >
                  <LuCopy /> Copy
                </Button>
                <div className="dev-name">By: Arindam Roy</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RandomToken;
