import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ServiceCard from "./ServiceCard/ServiceCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  if (productItems.length === 0) {
    return <h1 className="not-found">Service Not Found !!</h1>;
  }
  return (
    <Row className="justify-content-center">
      {productItems.map((productItem) => {
        return (
          <ServiceCard
            key={productItem._id}
            title={null}
            productItem={productItem}          />
        );
      })}
    </Row>
  );
};
export default memo(ShopList);
