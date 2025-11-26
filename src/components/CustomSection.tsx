import type { FC, ReactNode } from "react";

interface ICustomSection {
  children: ReactNode;
  className?: string;
  hideBg?: boolean;
}

const CustomSection: FC<ICustomSection> = ({ children, className, hideBg }) => {
  return (
    <section className={`section ${className || ""} ${hideBg ? "hide" : ""}`}>
      <div className="row">{children}</div>
    </section>
  );
};

export default CustomSection;
