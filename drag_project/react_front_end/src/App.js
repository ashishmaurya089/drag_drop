import FormPage from "./Components/FormPage/FormPage";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider className="m-5" backend={HTML5Backend}>
      <FormPage />
    </DndProvider>
  );
}

export default App;
