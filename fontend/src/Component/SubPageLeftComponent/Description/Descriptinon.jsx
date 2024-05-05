import "./Description.css";
const Description = ({ itemSubpage }) => {
  return (
    <>
      <div className="title-Subpage">
        <h2>Tự Cẩm</h2>
      </div>
      <div className="desc-subpage">
        <div className="text-desc">
          <span
            dangerouslySetInnerHTML={{ __html: itemSubpage?.description }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default Description;
