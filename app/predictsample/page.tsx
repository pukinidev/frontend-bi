"use client";
import { Typography, Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import InsightsIcon from "@mui/icons-material/Insights";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import ModelModal from "../components/pagecomponents/Model/predictsample/ModelModal";
import CircularProgress from "@mui/material/CircularProgress";

export default function PredictSample() {
  const [inputText, setInputText] = useState("");
  const [bodyData, setBodyData] = useState<SendDataInterface[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePhrase = () => {
    if (!inputText || inputText.trim() === "") {
      setError("Por favor introduzca por lo menos una frase");
      return;
    }

    const array_puki: SendDataInterface[] = [];
    const array1 = inputText.split("\n");

    for (let i = 0; i < array1.length; i++) {
      const phrase = array1[i].trim();
      if (phrase) {
        const dicc_puki: SendDataInterface = {
          Textos_espanol: phrase,
        };
        array_puki.push(dicc_puki);
      }
    }

    console.log(array_puki);
    setBodyData(array_puki);
    setError("");
  };

  const submitData = async () => {
    setLoading(true);
    try {
      const url = "https://fastapi-967824586620.us-central1.run.app/predict";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data: PredictionInterface[] = await response.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const cleanData = () => {
    setInputText("");
    setBodyData(null);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Predecir una muestra
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por favor introduzca las frases que desea predecir. Cada frase debe ir
        en una nueva línea.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Salud y bienestar <br />
        Colegios y educación <br />
        Igualdad y mujeres
      </Typography>

      <Grid2
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        {bodyData ? (
          <>
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                fontWeight: "bold",
                padding: "0.5rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                border: "1px solid #ddd",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1rem", color: "#ED8B00" }}>
                Cantidad de frases a enviar:
              </span>{" "}
              {bodyData.length}
            </Typography>
            <Button
              variant="contained"
              startIcon={<InfoIcon />}
              sx={{
                color: "white",
                marginBottom: "1rem",
              }}
              onClick={handleOpen}
            >
              Consultar frases
            </Button>
            <ModelModal open={open} handleClose={handleClose} data={bodyData} />
            <Button
              variant="contained"
              startIcon={<InsightsIcon />}
              sx={{
                color: "white",
                marginBottom: "1rem",
              }}
              onClick={submitData}
            >
              Predecir frases
            </Button>
            {loading && (
              <>
                <CircularProgress />
                <Typography>Enviando datos...</Typography>{" "}
              </>
            )}
            <Button
              variant="contained"
              startIcon={<CleaningServicesIcon />}
              sx={{
                color: "white",
              }}
              onClick={cleanData}
            >
              Reiniciar
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Frases"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              multiline
              fullWidth
              rows={10}
              error={!!error}
              helperText={error}
            />

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                color: "white",
                marginTop: "1rem",
              }}
              onClick={handleChangePhrase}
            >
              Guardar Frases
            </Button>
          </>
        )}
      </Grid2>
    </>
  );
}
