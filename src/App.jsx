import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [scheme, setScheme] = useState("camelCase");

  async function submit() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("submit", { name, scheme }));
  }

  return (
    <div className="container">
      <h1>Variable Capitalization Utility</h1>

      <form
        className="col"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          id="greet-input"
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <div className="row">
          <div>
            <input
              id="camelCase"
              type="radio"
              name="scheme"
              value="camelCase"
              defaultChecked
              onChange={(e) =>
                e.target.checked ? setScheme(e.target.value) : null
              }
            />
            <label htmlFor="camelCase">camelCase</label>
          </div>

          <div>
            <input
              id="PascalCase"
              type="radio"
              name="scheme"
              value="PascalCase"
              onChange={(e) =>
                e.target.checked ? setScheme(e.currentTarget.value) : null
              }
            />
            <label htmlFor="PascalCase">PascalCase</label>
          </div>

          <div>
            <input
              id="snake_case"
              type="radio"
              name="scheme"
              value="snake_case"
              onChange={(e) =>
                e.target.checked ? setScheme(e.currentTarget.value) : null
              }
            />
            <label htmlFor="snake_case">snake_case</label>
          </div>

          <div>
            <input
              id="kebab-case"
              type="radio"
              name="scheme"
              value="kebab-case"
              onChange={(e) =>
                e.target.checked ? setScheme(e.currentTarget.value) : null
              }
            />
            <label htmlFor="kebab-case">kebab-case</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
