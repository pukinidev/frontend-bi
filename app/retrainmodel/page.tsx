"use client";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
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
  const [modelData, setModelData] = useState<ModelMetricsInterface | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log("modelData", modelData);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const receivedFile = event.target.files;
    setFile(receivedFile ? receivedFile[0] : null);
  };

  const handleFileSubmit = async () => {
    if (file) {
      setIsLoading(true); // Start loading state
      const formData = new FormData();
      formData.append("file", file);
      try {
        const url = "https://fastapi-967824586620.us-central1.run.app/retrain";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data: ModelMetricsInterface = await response.json();
        setModelData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
        El reentrenamiento de un modelo de clasificación de ODS (Objetivos de
        Desarrollo Sostenible) implica ajustar el modelo original utilizando
        nuevos datos que reflejan patrones o información reciente. Para ello, se
        toman los nuevos datos y se aplican técnicas de aprendizaje supervisado
        para ajustar el modelo a las tendencias y características más actuales
        de los textos relacionados con los ODS. Esto permite que el modelo
        mantenga su relevancia y precisión en la clasificación a medida que
        cambian o evolucionan los datos.
      </Typography>

      <Stack alignContent={"center"} alignItems={"center"} flexWrap={"wrap"}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{
            color: "white",
            marginBottom: "1rem",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Subiendo..." : "Subir archivo"}
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            marginBottom: "1rem",
          }}
          onClick={handleFileSubmit}
          disabled={!file || isLoading}
        >
          Reentrenar
        </Button>

        {isLoading ? (
          <Stack p={2}>
            <CircularProgress />
          </Stack>
        ) : modelData != null ? (
          <Stack
            spacing={8}
            direction={"row"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Stack
              spacing={2}
              direction={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">
                {(modelData.precision * 100).toString().substring(0, 6)}%
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                Precision
              </Typography>
            </Stack>

            <Stack
              spacing={2}
              direction={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">
                {(modelData.recall * 100).toString().substring(0, 6)}%
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                Recall
              </Typography>
            </Stack>

            <Stack
              spacing={2}
              direction={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">
                {(modelData.accuracy * 100).toString().substring(0, 6)}%
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                Accuracy
              </Typography>
            </Stack>

            <Stack
              spacing={2}
              direction={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">
                {(modelData.f1_score * 100).toString().substring(0, 6)}%
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                F1 Score
              </Typography>
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </>
  );
}
