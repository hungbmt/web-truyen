import { Col, Container, Row } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const [showdirectory, setShowdirectory] = useState(false);
  const [showCategory, setShowcategory] = useState(false);
  const [showNavBarRp, setShowNavBarRp] = useState(false);
  const [showNavBarDirectoryRp, setShowNavBarDirectoryRp] = useState(false);
  // show
  const HandelClickdirectory = () => {
    setShowdirectory(!showdirectory);
  };
  const HandleClikShowCategory = () => {
    setShowcategory(!showCategory);
  };

  const HandleSowNavRp = () => {
    setShowNavBarRp(!showNavBarRp);
  };

  const HandleShowdirectoryRp = () => {
    setShowNavBarDirectoryRp(!showNavBarDirectoryRp);
  };
  return (
    <>
      <div className="header-wraper">
        <Container>
          <div className="d-flex align-content-center justify-content-between ">
            <Link to={"/"}>
              <h1>HelloAz</h1>
            </Link>
            <div
              className="d-flex justify-content-between navbar-nav-header xl={0}"
              style={{ margin: "0 0 2px 100px", width: "100%" }}
            >
              <div className="hearder-left">
                <div
                  className="directory-hearder"
                  onClick={HandelClickdirectory}
                >
                  <i class="fa-solid fa-list"></i>
                  <span>Danh Sách</span>
                  <i class="fa-solid fa-caret-down"></i>
                  {showdirectory && (
                    <>
                      <div className="dropdow-hearder-directory">
                        <ul>
                          <Link to={"/"}>
                            <li>Truyện Hot</li>
                          </Link>
                          <Link>
                            <li>Truyện Full</li>
                          </Link>
                          <Link>
                            <li>Truyện mới</li>
                          </Link>
                          <Link>
                            <li>Truyện Hot</li>
                          </Link>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="hearder-category"
                  onClick={HandleClikShowCategory}
                >
                  <i class="fa-solid fa-list"></i>
                  <span>Thể Loại</span>
                  <i class="fa-solid fa-caret-down"></i>
                  {showCategory && (
                    <>
                      <div className="hearder-category-dropdow ">
                        <Row>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>Kiếm Hiệp</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>Tiên Hiệp </Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>Xuyên Không </Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>bách hợp</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>kiếm hiệp</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>xuyên nhanh </Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>hài hước</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>ngôn tình</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>trọng sinh</Link>
                          </Col>
                          <Col className="list-category-hearder" xl={3}>
                            <Link>điền văn</Link>
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="auth-header ">
                <Link to={"/login"}>
                  <span>Login</span>
                </Link>
                <Link to={"/register"} className="ms-2">
                  <span>register</span>
                </Link>
              </div>
            </div>
            <div
              className="navbarRp"
              style={{ display: "none" }}
              onClick={HandleSowNavRp}
            >
              <i class="fa-solid fa-bars icon"></i>
            </div>
            {showNavBarRp && (
              <>
                <div className="dropdow-rp-wraper">
                  <Container>
                    <div
                      className="directory-rp-box"
                      onClick={HandleShowdirectoryRp}
                    >
                      <i class="fa-solid fa-list"></i>
                      <span>Danh Sách</span>
                      <i class="fa-solid fa-caret-down"></i>
                      {showNavBarDirectoryRp && (
                        <>
                          <div className="directory-rp-box-dropdow">
                            <ul>
                              <Link>
                                <li>truyện hot</li>
                              </Link>
                              <Link>
                                <li>truyện full</li>
                              </Link>
                              <Link>
                                <li>truyện mới cập nhật</li>
                              </Link>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="category-rp-box">
                      <i class="fa-solid fa-list"></i>
                      <span>Thể Loại</span>
                      <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div>
                      <Link>
                        <span>Login</span>
                      </Link>
                    </div>
                    <div>
                      <Link>
                        <span>Register</span>
                      </Link>
                    </div>
                  </Container>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
