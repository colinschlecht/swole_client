import React from "react";
import { ListGroup } from "react-bootstrap";

const AttrList = ({ attrObj, listName }) => {
  return (
    <>
      <ListGroup key={attrObj.id + 1} className="profile list">
        <ListGroup.Item key={attrObj.id + 2} action variant="dark">
          {listName.split("_").join(" ")}
        </ListGroup.Item>
        {Object.keys(attrObj).map((attr, index) => {
          if (attr != "id") {
            return (
              <>
                <ListGroup.Item
                  variant="light"
                  key={`${attrObj.id + 2 + index}`}
                >
                  {attr.split("_").join(" ")}
                </ListGroup.Item>{" "}
              </>
            );
          }
        })}
      </ListGroup>
    </>
  );
};

export default AttrList;
