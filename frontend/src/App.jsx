import { useEffect, useState } from "react";
import axios from "axios";
import Rephrase from "./Rephrase";

function App() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/hello")
      .then(res => setMsg(res.data.message))
      .catch(console.error);
  }, []);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">AI Writing Assistant</h1>
      <p>{msg || "Loading..."}</p>
      <Rephrase />
    </div>
  );
}
export default App;
