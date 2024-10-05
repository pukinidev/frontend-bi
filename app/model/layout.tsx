import { Container } from "@mui/material";

export default function ModelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          paddingTop: 10,
          flexDirection: "column",
          paddingBottom: "3rem",
        }}
      >
        <section>{children}</section>
      </Container>
  );
}
