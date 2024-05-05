import { Col } from "react-bootstrap";
import "./BookHomeUpdata.css";
import { Link } from "react-router-dom";
const BookHomeUpdata = ({ newBook }) => {
  return (
    <>
      {newBook?.map((item, i) => {
        return (
          <div className="new-book-wraper">
            <Col xl={5} lg={5} md={6} sm={6} xs={6}>
              <Link to={`${"/book/" + item.link + "?page=1"}`}>
                <div className="title-home-new">
                  <span className="home-shared">{item.title}</span>
                </div>
              </Link>
            </Col>
            <Col
              xl={3}
              lg={3}
              className="d-md-none d-sm-none d-none d-lg-block"
            >
              <div className="genre-home-new">
                {item.genres.map((data, i) => {
                  return (
                    <>
                      <Link>
                        <span className="home-shared">{data.genre} </span>
                      </Link>
                    </>
                  );
                })}
              </div>
            </Col>
            <Col xl={2} lg={2} md={3} sm={3} xs={3}>
              <div className="chapter-home-new">
                <span className="home-shared">{item.chapters.chapter}</span>
              </div>
            </Col>
            <Col xl={2} lg={2} md={3} sm={3} xs={3}>
              <div className="time-home-new">
                <span className="home-shared">{item.time}</span>
              </div>
            </Col>
          </div>
        );
      })}
    </>
  );
};

export default BookHomeUpdata;
