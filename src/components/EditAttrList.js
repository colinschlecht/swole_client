import React, { useState, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";

const AttrList = ({ attrObj, listName, handleChange }) => {



  const onChange = (attr) => {
    
    const newObj = { ...attrObj };
    newObj[attr] = !newObj[attr];
    handleChange(newObj, listName)
    console.log(newObj)
  };

  return (
    <>
      <ListGroup key={listName} className="profile list">
        <ListGroup.Item key={listName} action variant="dark">
          {listName.split("_").join(" ")}
        </ListGroup.Item>
        <Form.Group controlId="exampleForm.ControlSelect1">
          {Object.keys(attrObj).map((attr, index) => {
            if (attr !== "id") {
              return (
                <>
                  <ListGroup.Item variant="light" key={`${listName}`}>
                    <Form.Check
                      key={`${listName} ${attr}`}
                      type="switch"
                      id={`default-switch ${listName} ${attr}`}
                      label={attr.split("_").join(" ")}
                      value={attrObj[attr]}
                      checked={attrObj[attr]}
                      onChange={() => onChange(attr)}
                    />
                  </ListGroup.Item>
                </>
              );
            }
          })}
        </Form.Group>
      </ListGroup>
    </>
  );
};

export default AttrList;
