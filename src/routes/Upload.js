import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import "./styles/Upload.css";

const Upload = () => {
  const [baseImage, setBaseImage] = useState("");
  const [baseData, setBaseData] = useState([]);
  const [showDetect, setShowDetect] = useState(false);

  const navigate = useNavigate();

  const theme = createMuiTheme({
    overrides: {
      MuiDropzoneArea: {
        root: {
          width: "30vw",
          height: "30vh",
        },
      },
      MuiDropzoneSnackbar: {
        errorAlert: {
          backgroundColor: "#FAA",
          color: "#000",
        },
        successAlert: {
          backgroundColor: "#AFA",
          color: "#000",
        },
      },
    },
  });

  const uploadImage = async (e) => {
    const file = e[0];
    const base64 = await convertBase64(file);
    console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataBase64 = reader.result;
        setBaseImage(dataBase64);
      };
    });
  };

  const uploadBase = async () => {
    const config = {
      headers: {
        Authorization:
          "ApiKey cdb29f355cb4059995e05420dc8d963f657898bf3a5f2f5e7a88c58279f5e4a0a1c4c4cf874594b42e413fc45c425425ac",
      },
    };
    const url = "https://nvision.nipa.cloud/api/v1/object-detection";

    const data = {
      raw_data: baseImage.split(",")[1],
      configurations: [
        {
          parameter: "OutputCroppedImage",
          value: "false",
        },
        {
          parameter: "ConfidenceThreshold",
          value: "0.1",
        },
      ],
    };

    await axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data.detected_objects);
        setBaseData(res.data.detected_objects);
        setShowDetect(!showDetect)
      })
      .catch((err) => console.log(err));
  };

  const detectImg = () => {
    const confirmed = window.confirm("Go to Detect picture?");

    if (confirmed) {
      navigate("/detect", { state: { img: baseImage, Data: baseData } });
    }
  };

  return (
    <div className="container-upload">
      <div className="upload-preview">
        <div className="upload-app">
          <MuiThemeProvider theme={theme}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(e) => {
                uploadImage(e);
              }}
              showPreviewsInDropzone={false}
            />
          </MuiThemeProvider>
          <Button
            onClick={uploadBase}
            variant="contained"
            color="default"
            size="large"
            startIcon={<CloudUploadIcon />}
          >
            upload
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => window.location.reload(false)}
          >
            Delete
          </Button>

          {showDetect === true ? (
            <Button onClick={detectImg} variant="contained" color="primary">
              Detect
            </Button>
          ) : null}
        </div>
        {baseImage ? <img src={baseImage}></img> : null}
      </div>
    </div>
  );
};

export default Upload;
