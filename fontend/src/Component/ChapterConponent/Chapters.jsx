import "./Chapter.css";

const Chapter = ({ itemChapter }) => {
  return (
    <>
      <div className="chapter-box">
        <div className="chapter-top d-flex flex-column justify-content-center text-center">
          <div className="chapter-title" style={{ marginBottom: 10 }}>
            <h3>{itemChapter?.title}</h3>
          </div>
          <div className="chapter-name" style={{ marginBottom: 10 }}>
            <h6>{itemChapter?.nameChapter}</h6>
          </div>
          <div className="btn-nav">
            <button>prew</button>
            <button className="m-3">list</button>
            <button>next</button>
          </div>
        </div>
        <div className="chapter-body">
          <p dangerouslySetInnerHTML={{ __html: itemChapter?.body }}></p>
        </div>
      </div>
    </>
  );
};

export default Chapter;
