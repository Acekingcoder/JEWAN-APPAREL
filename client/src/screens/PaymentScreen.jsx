// import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import CheckoutSteps from "../components/CheckoutSteps";

// function PaymentMethodScreen() {
//   const [selectedMethod, setSelectedMethod] = useState(null);

// const dispatch = useDispatch();
// const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const handleMethodSelection = (method) => {
//     setSelectedMethod(method);
//   };

//   useEffect(() => {
//     if (!shippingAddress) {
//       navigate("/shipping");
//     }
//   }, [shippingAddress, navigate]);

//   const handleContinue = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(selectedMethod));
//     navigate("/placeorder");
//   };

//   return (
//     <Container>
//       <CheckoutSteps step1 step2 step3 />
//       <Row className="mt-4">
//         <Col>
//           <h2>Payment Method</h2>
//           <Form>
//             {["Paypal", "CreditCard"].map(
//               (method) => (
//                 <Form.Check
//                   type="radio"
//                   key={method}
//                   label={method}
//                   id={method}
//                   checked={selectedMethod === method}
//                   onChange={() => handleMethodSelection(method)}
//                 />
//               ),
//               []
//             )}
//           </Form>
//           <Link to="/placeorder">
//             <Button
//               variant="primary"
//               className="mt-3"
//               onClick={handleContinue}
//               disabled={!selectedMethod}
//             >
//               Continue
//             </Button>
//           </Link>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default PaymentMethodScreen;

import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [payment, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
