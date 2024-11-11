import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";
import { Menu } from "@mui/icons-material";

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
        <Button color="secondary" startIcon={<Menu />} className="new-blog" onClick={toggleVisibility}>
          {label}
        </Button>
      </div>
      <div style={showClass}>{children}</div>
    </div>
  );
});

export default Togglable;
