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
import { json } from "stream/consumers";







export default function PredictSample() {

  const [inputText, setInputText] = useState("");

  const handlePhraseSubmit = async (event : FormEvent<HTMLFormElement>) => {
    var array_puki = [];
    







    let array1 = inputText.split(";cambio;")
    console.log(array1)
    event.preventDefault()
    console.log("Se envio la frase")
    setInputText("")
    var i;
    //var prueba1 = `[`;
    for(i=0; i<array1.length; i++){
      let dicc_puki: SendDataInterface = {
        Textos_espanol: ""
      };
      dicc_puki[Textos_espanol] = array1[i];
      /* const texto = `{ "Textos_espanol" : "` + array1[i] + `"}`;
      console.log(texto) */
      //prueba1 += texto
      array_puki.push(dicc_puki)
    }
    //prueba1 = prueba1.substring(0, prueba1.length - 1);
    //prueba1 += `]`
    //console.log(prueba1)

    console.log(array_puki)
    const prueba2 = JSON.stringify(array_puki)


    try {
      const url =
        "https://fastapi-967824586620.us-central1.run.app/predict";
      const response = await fetch(url, {
        method: "POST",
        body: prueba2,
      });  
      console.log(response.json())
      //const data: PredictionInterface[] =  response.json(); 
    } catch (error) {
      console.error(error);
    }
};


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
        Por favor introduzca las frases que desea predecir.  Cada frase debe ser separada por ;cambio;.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
      frase 1 ;cambio; frase 2 ;cambio; frase 3
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
      Salud y bienestar ;cambio; Colegios y educación ;cambio; Igualdad y mujeres 
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
