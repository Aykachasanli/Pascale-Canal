import React from "react";

interface CustomSectionProps {
  children: React.ReactNode;
  className: string;
}
const CustomSection: React.FC<CustomSectionProps> = ({
  children,
  className,
}) => <section className={className}>{children}</section>;

const WhoAmI: React.FC = () => {
  return (
    <CustomSection className="who-am-i-page">
     <div className="container">
      <div className="row">
         <h2 className="title">Who am I?</h2>
      </div>
     </div>
    </CustomSection>
  );
};

export default WhoAmI;
