import { useState, forwardRef, useImperativeHandle } from "react";
const Togglable = forwardRef((props, ref) => {
  const { label, children } = props;
  const [visible, setVisible] = useState(false);
  const showClass = {
    display: visible ? "" : "none",
  };
  const hideClass = {
    display: visible ? "none" : "",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideClass}>
        <button className="new-blog" onClick={toggleVisibility}>
          {label}
        </button>
      </div>
      <div style={showClass}>{children}</div>
    </div>
  );
});

export default Togglable;
