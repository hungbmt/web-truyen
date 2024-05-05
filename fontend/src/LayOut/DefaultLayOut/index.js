import { Container } from "react-bootstrap";
import Header from "./Header/Header";

const DefaultLayOut = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default DefaultLayOut;
