import React from "react";
import { ListGroup } from "react-bootstrap";

const AttrList = ({ attrObj, listName }) => {
  let arr2 = [];
  return (
    <>
      <ListGroup key={attrObj.id + 1} className="profile list">
        <ListGroup.Item key={attrObj.id + 2} action variant="dark">
          {listName.split("_").join(" ")}
        </ListGroup.Item>

        {Object.keys(attrObj).map((attr, index) => {
          if (attr != "id" && attrObj[attr]) {
            arr2.push(attr);
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
        {arr2.length === 0 ? (
          <ListGroup.Item variant="light" key={`${attrObj.id + 3}`}>
            none
          </ListGroup.Item>
        ) : null}
      </ListGroup>
    </>
  );
};

export default AttrList;
