import { useEffect } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Image from "next/image";

const FileInput = (props) => {
  const { name, attachments, setAttachments } = props;
  const { register, unregister, setValue } = useForm();
  const onDrop = useCallback(
    (droppedFiles) => {
      const newFiles =
        (!!attachments?.length && [...attachments].concat(droppedFiles)) ||
        droppedFiles;

      setValue(name, newFiles, { shouldValidate: true });
      setAttachments([...newFiles]);
    },
    [setValue, name, attachments, setAttachments]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    multiple: false,
    maxFiles: 1,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <Box
      {...getRootProps()}
      type="file"
      role="button"
      aria-label="File Upload"
      id={name}
      sx={{ width: "100%", height: "100%" }}
    >
      <input {...props} {...getInputProps()} />
      <Box
        sx={{
          width: "100%",
          border: "1px dashed grey",
          height: "12rem",
          padding: "0.7rem 1rem",
        }}
        className={" " + (isDragActive ? " " : " ")}
      >
        <p style={{ marginBottom: "10px" }}>
          Drop a single file here or click to upload ...
        </p>

        {!!attachments?.length && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            {attachments.map((file) => {
              return (
                <div key={file.name}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    height={50}
                    width={35}
                  />
                </div>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FileInput;
