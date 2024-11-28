import React from "react";
import { Button } from "acertinity-ui"; // Adjust the import path based on the library structure

function App() {
  return (
    <div>
      <h1>Testing Acertinity UI</h1>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  );
}

export default App;
