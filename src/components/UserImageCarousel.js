import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
var faker = require('faker');
var image = faker.image.avatar()

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://cdn.fakercloud.com/avatars/peter576_128.jpg"}
          alt="First slide"
        />
        <Carousel.Caption>
     
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://cdn.fakercloud.com/avatars/peter576_128.jpg"}
          alt="Second slide"
        />

        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://cdn.fakercloud.com/avatars/peter576_128.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption>
   
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
