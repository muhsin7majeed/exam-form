import { ChakraProvider, Container } from "@chakra-ui/react";

import { customTheme } from "./helpers/theme";
import "./App.css";
import ExamForm from "./ExamForm";

function App() {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <div className="app">
        <Container maxW="container.lg" borderRadius="10" padding="30px" backgroundColor="white">
          <ExamForm />
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
