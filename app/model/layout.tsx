import { Box } from "@mui/system";
import { Container } from "@mui/material";

export default function ModelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "3rem",
        }}
      >
        <section>{children}</section>
      </Container>
    </Box>
  );
}
