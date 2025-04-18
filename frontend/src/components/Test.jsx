import React from "react";
import { Button } from "acertinity-ui"; 

function App() {
  return (
    <div>
      <h1>Testing Acertinity UI</h1>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  );
}

export default App;
