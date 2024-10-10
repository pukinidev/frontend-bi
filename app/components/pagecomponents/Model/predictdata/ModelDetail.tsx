import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

export default function ModelDetail({ data }: ModelDetailsProps) {
  if (data == null) {
    return null;
  }
  return (
    <Card
      sx={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary" sx={{
            fontWeight: "bold",
        }}>
          Detalles de la predicción
        </Typography>
        <Typography variant="h6" color="primary">
          Texto:
        </Typography>
        <Typography variant="body1" component="div">
          {data.Texto}
        </Typography>
        <Typography variant="h6" color="primary">
          Predicción:
        </Typography>
        <Image
          src={`/ODS` + data.Prediccion + ".png"}
          alt="ODS 3"
          height={300}
          width={300}
        />
      </CardContent>
    </Card>
  );
}
