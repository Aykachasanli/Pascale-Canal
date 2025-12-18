import { forwardRef, type ReactNode } from "react";

interface ICustomSection {
  children: ReactNode;
  className?: string;
  hideBg?: boolean;
}


const CustomSection = forwardRef<HTMLElement, ICustomSection>(({ children, className, hideBg }, ref) => {
  return (
    <section ref={ref} className={`section ${className || ""} ${hideBg ? "hide" : ""}`}>
      <div className="row">{children}</div>
    </section>
  );
});

CustomSection.displayName = "CustomSection";

export default CustomSection;
