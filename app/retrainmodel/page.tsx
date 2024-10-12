"use client";
import { MenuItem, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ModelContainer from "../components/pagecomponents/Model/predictdata/ModelContainer";
import CircularProgress from "@mui/material/CircularProgress";


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
  const [modelData, setModelData] = useState<
    ModelMetricsInterface[] | null
  >(null);

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
          "https://fastapi-967824586620.us-central1.run.app/retrain";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data: ModelMetricsInterface[] = await response.json();
        setModelData(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No file selected");
    }
  };


  return (
    <>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Reentrenar el modelo
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Suba un archivo con datos para reentrenar el modelo
      </Typography>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        sx={{
          color: "white",
          marginBottom: "1rem",
        }}
        onClick={handleFileSubmit}
      >
        Suba un archivo
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>

      {modelData == null ?
      <CircularProgress /> :
        (
        <Stack>
        <Typography variant="h3" color="primary" fontWeight="bold">
            Resultados
        </Typography>
        <Stack spacing={2} direction={"column"}>
            <Typography variant="h4" color="primary" fontWeight="bold">
            Precision
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
            Recall
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
            F1
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
            Accuracy
            </Typography>
        </Stack>

        </Stack>
        )
    }
    </>
    );
}
