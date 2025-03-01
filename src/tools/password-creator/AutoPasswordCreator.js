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
import "./style2.css";

const AutoPasswordCreator = () => {
  const pwdLength = 20;
  const pwdCount = 1;

  const [pwds, setPwds] = useState([]);

  const copyHandler = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.dismiss();
        const element = document.querySelector(".pwd-text");
        if (element) {
          element.classList.add("copied");
          setTimeout(() => element.classList.remove("copied"), 1000);
        }
        toast.success("Copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy:", err);
      });
  };

  const createHandler = () => {
    let pwdArr = Array.from({ length: pwdCount }, () =>
      Helper.generateStrongPassword(pwdLength)
    );
    setPwds(pwdArr);
  };

  useEffect(() => {
    let pwdArr = Array.from({ length: pwdCount }, () =>
      Helper.generateStrongPassword(pwdLength)
    );
    setPwds(pwdArr);
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-5 text-center">
          <Col md={{ span: 6, offset: 3 }} className="p-3">
            <div>
              <h1 className="tool-title fs-1 fs-md-2">
                Strong
                <br />
                Password Generator
              </h1>
              <hr />
            </div>
            <div className="pwd-text mt-5">{pwds[0]}</div>
            <div className="mt-5">
              <Button
                type="button"
                size="lg"
                variant="dark"
                className="glow-button-btn1"
                onClick={createHandler}
              >
                <FiZap style={{ marginTop: "-4px" }} /> Generate
              </Button>
              <Button
                type="button"
                size="lg"
                variant="dark"
                className="mx-2 glow-button-btn2"
                onClick={() => copyHandler(pwds[0])}
              >
                <LuCopy /> Copy
              </Button>
            </div>
            <div className="dev-name">By: Arindam Roy</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AutoPasswordCreator;
