import { Container, Row } from "react-bootstrap";
import "./ChapterPage.css";
import Chapter from "../../Component/ChapterConponent/Chapters";
import { useEffect } from "react";
import { apichapter } from "../../Reducer/apiReques";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChapterPage = () => {
  const itemChapter = useSelector((state) => state.chapterReducer.chapter.item);
  const dispatch = useDispatch();
  const { sub, chapter } = useParams();
  useEffect(() => {
    apichapter(dispatch, sub, chapter);
  }, [chapter, dispatch, sub]);
  return (
    <>
      <div className="chapter-wraper">
        <Container>
          <Row>
            <Chapter itemChapter={itemChapter} />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ChapterPage;
