import React from "react";

function DimensionDrawer({ preview, name }) {
  return (
    <div>
      {"Dimension"}
      <img
        src={preview}
        alt={name}
        style={{ margin: "0 auto", display: "block", maxWidth: "100%" }}
      />
    </div>
  );
}

export default DimensionDrawer;
