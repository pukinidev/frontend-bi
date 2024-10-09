interface PredictionInterface {
  "3": number;
  "4": number;
  "5": number;
  Texto: string;
  Prediccion: string;
}

interface ModelTableProps {
  data: PredictionInterface[] | null;
}
