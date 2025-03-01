import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { LuCopy } from "react-icons/lu";
import { FiZap } from "react-icons/fi";
import "./style3.css";

const Uuids = () => {
  const [uuidCount, setUuidCount] = useState(2);
  const [uuids, setUuids] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (uuidCount < 1) {
      toast.error("Something went wrong! Try again");
      setUuidCount(1);
      return;
    }

    if (uuidCount > 25) {
      toast.error("Maximum allowed 25 uuids");
      return;
    }

    generateUUIDs(uuidCount).then((uuids) => {
      setUuids(uuids);
      toast.success(`${uuidCount} - UUID has been generated successfully!`);
    });
  };

  const generateUUIDs = async (uuidCount) => {
    Swal.fire({
      title: "Please wait...",
      html: "System is creating <strong>UUID</strong>",
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let _uuidBox = [];

    for (let i = 0; i < uuidCount; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay
      _uuidBox.push(uuidv4());
    }
    Swal.close();
    return _uuidBox;
  };

  useEffect(() => {
    generateUUIDs(uuidCount).then((uuids) => {
      setUuids(uuids);
    });
  }, []);

  const copyToClipboard = (event, uuid, isAll = false) => {
    toast.dismiss();
    navigator.clipboard
      .writeText(uuid)
      .then(() => {
        if (!isAll) {
          const liElement = event.target.closest("li");
          liElement.classList.add("copied");
          toast.success("Copied!");
          setTimeout(() => liElement.classList.remove("copied"), 2000);
        }
        if (isAll) {
          toast.success("All Copied!");
        }
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
            <div className="text-center mb-3">
              <h1 className="tool-title fw-bold">UUIDs</h1>
              <div className="dev-name">BY: ARINDAM ROY</div>
            </div>
            <Card
              className="text-center shadow rounded"
              style={{ paddingBottom: "0px" }}
            >
              <Card.Body>
                <Form onSubmit={formSubmitHandler}>
                  <Row className="py-3">
                    <Col md={4} sm={4} xs={4}>
                      <Form.Group
                        className="mb-3 text-center"
                        controlId="uuidCount"
                      >
                        <Form.Control
                          type="number"
                          step={1}
                          min={2}
                          max={25}
                          size="lg"
                          placeholder="Count"
                          required
                          value={uuidCount}
                          onChange={(e) => {
                            const value = e.target.value;
                            setUuidCount(value ? parseInt(value, 10) : "");
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} sm={4} xs={4}>
                      <Button
                        type="submit"
                        variant="dark"
                        size="lg"
                        className="w-100 glow-button-btn1"
                      >
                        <FiZap />
                      </Button>
                    </Col>
                    <Col md={4} sm={4} xs={4}>
                      <Button
                        type="button"
                        size="lg"
                        variant="dark"
                        className="w-100 glow-button-btn2"
                        onClick={(e) =>
                          copyToClipboard(e, uuids.join(","), true)
                        }
                      >
                        <LuCopy />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            {uuids.length > 0 && (
              <div className="uuids-item-container">
                <ul>
                  {uuids.map((uuid, index) => (
                    <li key={index}>
                      {uuid}
                      <button onClick={(event) => copyToClipboard(event, uuid)}>
                        <LuCopy size={20} strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Uuids;
