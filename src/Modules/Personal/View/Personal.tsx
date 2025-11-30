import CustomSection from "../../../components/CustomSection";

const Personal: React.FC = () => {
  return (
    <CustomSection className="personal">
      <div className="container">
        <div className="row">
          <div className="top">
            <h2 className="title">Order personalized</h2>
            <p className="info">
              The works shown below are examples of custom creations
            </p>
          </div>
        </div>
      </div>

      {/* <section className="description-section"></section> */}
    </CustomSection>
  );
};

export default Personal;
