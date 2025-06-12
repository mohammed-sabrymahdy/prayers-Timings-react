import "./App.css";
import Button from "@mui/material/Button";
import MainContent from "./component/MainContent";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <Container
        style={{
          width: "100vw ",
        }}
        maxWidth="xl"
      >
        <MainContent />
      </Container>
    </>
  );
}

export default App;
