import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./listChapter.css";
const ListChapter = ({ itemSubpage }) => {
  return (
    <>
      <Row>
        {itemSubpage?.chapterLinks?.map((item, ix) => {
          return (
            <>
              <Col xl={6}>
                <Link className="subpage-chapter" to={"/book" + item.link}>
                  {item.namechater}
                </Link>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export default ListChapter;
