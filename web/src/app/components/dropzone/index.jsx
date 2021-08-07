import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export function Dropzone({ onUpload, className }) {

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach(handleFileUrl);
    },
    [onUpload]
  );

  function handleFileUrl(file) {
    file.URL = URL.createObjectURL(file);
    onUpload(file);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 999,
  });

  return (
    <div
      id="dropzone-component"
      className={
        !isDragActive
          ? `dropzone ${className}`
          : `dropzone drag-active ${className}`
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faUpload} />
      <p>Arraste um arquivo ou Clique aqui para fazer o upload</p>
    </div>
  );
}
