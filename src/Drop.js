import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

function Drop(props) {
  const onDrop = React.useCallback(props.onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <span>Drop the files here ...</span>
      ) : (
        <span>Drag 'n' drop some files here, or click to select files</span>
      )}
    </Dropzone>
  );
}

const Dropzone = styled.div`
  padding: 0 0;
  height: calc(100vh - 100px);
  text-align: center;
  vertical-align: middle;
  border: 2px dotted gray;
  background: red;
  &.active {
    border-color: lime;
  }
  &.reject {
    border-color: red;
  }
`;

Dropzone.defaultProps = {
  activeClassName: "active",
  rejectClassName: "reject"
};

export default Drop;
