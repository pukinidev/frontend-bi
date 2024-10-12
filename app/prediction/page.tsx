"use client";

import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import PredictDataPage from "../components/pagecomponents/Model/predictdata/PredictionDataPage";
import PredictSamplePage from "../components/pagecomponents/Model/predictsample/PredictionSamplePage";

export default function Prediction() {
  
  const [selectedMode, setSelectedMode] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(event.target.value);
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          aria-labelledby="prediction-mode-label"
          value={selectedMode}
          name="prediction-mode"
          onChange={handleChange}
        >
          <FormControlLabel
            value="archivo"
            control={<Radio />}
            label="Predecir con un archivo CSV/XLSX"
            sx={{ marginBottom: 1 }}
          />
          <FormControlLabel
            value="texto"
            control={<Radio />}
            label="Predecir escribiendo el texto"
            sx={{ marginBottom: 1 }}
          />
        </RadioGroup>
      </FormControl>
    </Box>

    {selectedMode === "archivo" && <PredictDataPage />}
    {selectedMode === "texto" && <PredictSamplePage />}
    </>
  );
}
