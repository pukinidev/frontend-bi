"use client";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function PredictData() {
  const [file, setFile] = useState<File | null>(null);
  const [predictionData, setPredictionData] = useState<[] | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const recievedFile = event.target.files;
    setFile(recievedFile ? recievedFile[0] : null);
  };

  const handleFileSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      try {
        const url =
          "https://fastapi-967824586620.us-central1.run.app/predict_from_excel";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setPredictionData(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No file selected");
    }
  };
  
  // Modify to pass if xlsx or csv file
  const downloadPrediction = async () => {
    if (predictionData) {
      const url =
        "https://fastapi-967824586620.us-central1.run.app/download-file/?format=xlsx";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(predictionData),
      });
      const data = await response.blob();
      const urlBlob = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = "prediction.xlsx";
      a.click();
    }
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Predecir un conjunto de datos
      </Typography>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        sx={{
          color: "white",
        }}
      >
        Suba un archivo
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      <Button
        onClick={handleFileSubmit}
        variant="contained"
        sx={{
          color: "white",
          marginLeft: "1rem",
        }}
      >
        Predecir
      </Button>
      <Button
        onClick={downloadPrediction}
        variant="contained"
        sx={{
          color: "white",
          marginLeft: "1rem",
        }}
      >
        Descargar Prediccion
      </Button>
      <Typography
        variant="body1"
        sx={{
          marginTop: "1rem",
        }}
      ></Typography>
    </div>
  );
}
