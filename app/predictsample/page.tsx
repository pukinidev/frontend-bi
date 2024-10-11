"use client";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import InsightsIcon from '@mui/icons-material/Insights';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState, FormEvent } from "react";
import { FormControl, FormLabel } from '@mui/material';
import { Lobster } from "next/font/google";







export default function PredictSample() {

  const [inputText, setInputText] = useState("");

  const handlePhraseSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(inputText)
    console.log("Se envio la frase")
    setInputText("")
};

function handleClick() {
  console.log("El Boton VIVE");
}


/*   const onSubmit = (d) => alert(JSON.stringify(d, null, 2)); */

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Predecir una muestra :D
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por favor introduzca las frases que desea predecir. Cada frase debe estrar entre comillas. Cada frase debe ser separada por un punto y coma.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
      "frase 1";"frase 2";"frase 3"
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
      "Salud y bienestar";"Colegios y educación";"Igualdad y mujeres  "
      </Typography>

    <form onSubmit={handlePhraseSubmit}>
    <TextField label="frase" onChange={e => setInputText(e.target.value)} multiline maxRows={4} fullWidth />

    <Button
        variant="contained"
        startIcon={<InsightsIcon />}
        type="submit"
        sx={{
          color: "white",
          marginBottom: "1rem",
        }}
      >
        Predecir frases
      </Button>
    </form>





    </div>
  );
}
