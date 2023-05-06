import * as ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Couldn't find root element");

ReactDOM.createRoot(rootElement).render(<App />);
