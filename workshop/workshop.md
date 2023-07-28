# Making a cross-platform desktop app with Tauri

In this workshop, you'll make a lightweight and cross-platform desktop
app using Tauri!

Throughout the workshop I'll use the example of a utility for variable
capitalization - that is, a tool that allows you to input some words and
it'll capitalize them in the scheme of your choice, such as camelCase,
snake_cake, etc. Here's a screenshot of the finished app, which is
available at
https://github.com/polypixeldev/variable-capitalization-utility:

![](/workshop/images/finished.png)

Note that this is just an example - feel free to try making something
new or expand upon it!

## Environment Setup

First, you'll need to set up your development environment. Follow
[https://tauri.app/v1/guides/getting-started/prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
to install everything you need to get started with Tauri.

After that, install NodeJS using the official installer at
[https://nodejs.org/en](https://nodejs.org/en), or install
a version manager such as
[https://github.com/Schniz/fnm](https://github.com/Schniz/fnm).

Now that you're done setting up your development environment, you can
now set up your project! Open your terminal (don't worry if you're not
familiar) and follow these steps:

Go to a directory (folder) of your choice, using the `cd` command (your
terminal might look a little
different):
![](/workshop/images/cd.png)

Now, run the following command:

```bash
npm create tauri-app@latest
```

If you're
prompted to install a package, press enter to continue. You'll now see a
series of prompts about the app you're about to create: choose a name
for your app, then select to use "TypeScript / JavaScript - (pnpm, yarn,
npm)" for your frontend, "npm" as your package manager, React for your
UI template, and JavaScript for your UI
flavor
![](/workshop/images/commands.png)

Tauri has now created a directory for your app with all of the files
you'll need to get started! Run the commands that were just given to
you:

```bash
cd <your app name>
npm install
npm run tauri dev
```

The
last two commands might take a while.

If you see a new window open with text that says "Welcome to Tauri!",
congratulations! You've now set up your development environment and
launched a Tauri app.

![](/workshop/images/tauri-default.png)

Type in your name in the input box and then press enter. It doesn't seem
like it, but a lot happened from when you pressed the "Greet" button to
when the greeting appeared in your app.

Tauri uses a model composed of (at least) two different processes: the
Core process and the WebView process. The Core process is written in the
Rust programming language and acts as the entrypoint for your app; that
is, when you run your app, you start the Core process. The Core process
then starts the WebView process, which is used to render your website.
If your app creates multiple windows, then multiple WebView processes
will be created.

So what happens when you press "Greet"?

1.  First, the frontend/WebView process (the user-facing interface), which is written in TypeScript (a superset of JavaScript) and uses the React web framework, sends a Tauri command to the Core process. This is done with code that looks like this:

```js
await invoke(\"greet\", { name });
```

2.  Then, the Core process receives the command. It finds the function that is associated with the command, and executes it.

3.  Finally, the Core process takes the result of the function, and sends it back to the frontend, where it can be displayed on the website.

While a lot happened, Tauri does an excellent job of abstracting it away
so that it's pretty simple to implement in your app!

Now it's time to start making your app! In this workshop we'll use the
example of a variable capitalization scheme utility - that is, an app
that helps you capitalize names in ways such as camelCase, snake_case,
etc. However, if you would like to build something different, go ahead!

First, here's the default directory structure for a Tauri app -

- **`/public`**: this directory can contain any assets you might use. This includes images and fonts

- **`/src`**: this directory contains the frontend code for your app, written in JavaScript. Since we're using React, it'll have `App.jsx`, `main.jsx`, `App.css`, and `styles.css`. It might also have an assets directory that you can use instead of `/public`

- **`/src-tauri`**: this directory contains all of the backend code for your app, written in Rust. This directory will have some configuration files, but most importantly it has it's own `src` directory, with `main.rs` inside - this file is where you can define all of your commands! `/src-tauri` also has an icons directory and a directory called target - this is where all of the compiled files go, you won't need to worry about it.

We'll begin by working in `/src/App.jsx`. This file is where most of the
UI is.

The first thing we'll do is change up the old UI (user interface) to
suit our app.The UI is written in a web framework called React. In
React, your UI is made up of _components_. Each component is a function.

Each component has two main parts - some JavaScript code at the
beginning, and a special language called JSX at the end, in the return
statement. The JavaScript code at the beginning is where all of the
logic happens. In the return statement, your component can use the
variables defined in the logic part to compose your UI.

JSX looks like HTML, but it has a special feature - anything enclosed
inside curly braces ({ }) is interpreted as JavaScript!

The first change we'll make is to change the title (in the `h1` tags) to
"Variable Capitalization Utility". Then, we'll delete the `div` with all
of the logos and the paragraph under it. We'll also change the `button`
text inside the `form` to "Submit". Your return statement should now look
like this:

```jsx
return (
  <div className="container">
    <h1>Variable Capitalization Utility</h1>

    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        greet();
      }}
    >
      <input
        id="greet-input"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter a name..."
      />
      <button type="submit">Submit</button>
    </form>

    <p>{greetMsg}</p>
  </div>
);
```

Did you notice how the changes appeared in the app as soon as you made
them? Cool!

Now, let's add some stuff to the UI. Specifically, we'll add a group of
radio buttons that will allow you to select which capitalization scheme
you would like to use. Let's add a `div` between the `input` and the `button`.
Inside the `div`, let's add a new `input` element with an id of "camelCase", a
type of "radio", a name of "scheme", and a value of "camelCase". After
the `input`, let's also add a `label` element with an attribute `htmlFor` and
set it to "camelCase", and inside the `label` type in "camelCase". Put the
`input` element and the `label` element inside a new `div`. Now, copy and
paste the `div` we just created and edit the attributes to add more options: "PascalCase",
"snake_case", and "kebab-case".

Also, add an `attribute` called defaultChecked to the camelCase `input`. You
don't need to set a value to it, since it is a boolean - just the text
defaultChecked implies a value of true.

If you were to look at your app now, it probably won't look very good.
Let's do some styling! In the `div` you just created, add a `className`
attribute and set it to "row". Also, change the `className` attribute of
the `form` from "row" to "col".

Your return statement should now look like this:

```jsx
return (
  <div className="container">
    <h1>Variable Capitalization Utility</h1>

    <form
      className="col"
      onSubmit={(e) => {
        e.preventDefault();
        greet();
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
          />
          <label htmlFor="camelCase">camelCase</label>
        </div>

        <div>
          <input
            id="PascalCase"
            type="radio"
            name="scheme"
            value="PascalCase"
          />
          <label htmlFor="PascalCase">PascalCase</label>
        </div>

        <div>
          <input
            id="snake_case"
            type="radio"
            name="scheme"
            value="snake_case"
          />
          <label htmlFor="snake_case">snake_case</label>
        </div>

        <div>
          <input
            id="kebab-case"
            type="radio"
            name="scheme"
            value="kebab-case"
          />
          <label htmlFor="kebab-case">kebab-case</label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>

    <p>{greetMsg}</p>
  </div>
);
```

Now, let's open `/src/styles.css`. Change the justify-content key of the
row class from center to space-evenly. Also, add a new class under that
called col, and set it to have a display of flex, a flex-direction of
column, and a justify-content of center. Finally, find the block for
input and button elements (`input, button`) and insert `[type="text"]`
right after the text "input".

Your `/src/styles.css` should now contain the following blocks:

```css
.row {
  display: flex;
  justify-content: space-evenly;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

```css
input[type="text"],
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}
```

Your app should now look a lot better! Let's finish things up on the
frontend by linking the form data to the invoke function call that I
mentioned before.

First, add a new state variable to the component with the following line
of code:

```js
const [scheme, setScheme] = useState("camelCase");
```

React will call your component function every time a state variable
changes. Therefore, normal variables defined in the function don't
persist for the lifetime of the component.

Now, add a change event handler to each radio input with this code:

```jsx
onChange={(e) =>
  e.target.checked ? setScheme(e.target.value) : null
}

```

This event handler will set the scheme to the value of the radio input
that is currently checked.

The last thing to change is the greet function. Change the name of the
greet function to "submit" as it's no longer being used to greet. Don't
forget to change the name of the function call in the onSubmit event
handler of the form as well!

Inside the submit function, change the invoke function call to invoke
the "submit" command instead of the "greet" command. Also, add the
scheme variable as an argument alongside the name variable.

Your frontend is now done! Your `/src/App.jsx` should now look like this:

```jsx
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
```

Now that we're done with the frontend, let's move to the backend, which
uses Rust instead of JavaScript. Rust is a very different language than
JavaScript, and it's known for being much harder to learn. However, we
won't be doing anything very complex in this example - but feel free to
play around!

For the backend, there's only one file to work in:
`/src-tauri/src/main.rs`

While implementing all of the logic to convert between cases might be
fun, there's a better solution: the convert_case crate (package) on
crates.io! crates.io is the package ecosystem for Rust. To add the
convert_case crate to your app, open your terminal and `cd` into the
`/src-tauri` directory. Then, run this command:

```bash
cargo add convert_case
```

Cargo (the amazing command-line utility for Rust) will then add
convert_case to your app. Then, insert the following line of code to
`/src-tauri/src/main.rs` right under the `#![cfg_attr...` line:

```rust
use convert_case::{Case, Casing};
```

This is basically the equivalent of a JavaScript import in Rust.

Now, change the name of the greet function to submit - don't forget to
change the function reference in the main function as well!

We can now do the change_case logic: inside the submit function, add the
following lines of code:

```rust
 let mut changed_name = name.to_string();


   match scheme {
       "camelCase" => changed_name = name.to_case(Case::Camel),
       "PascalCase" => changed_name = name.to_case(Case::Pascal),
       "snake_case" => changed_name = name.to_case(Case::Snake),
       "kebab-case" => changed_name = name.to_case(Case::Kebab),
       _ => ()
   }

```

The first line simply declares the variable that we'll use to store the
changed name. The match block after that is similar to a switch
statement in JavaScript - it goes through each match branch one by one
to see if it matches the variable provided to it. If so, it'll execute
the code associated with the branch. In our match block, we're checking
to see which scheme the user chose in the frontend and executing the
proper case change based on it.

Finally, all we have to do is return the changed name. In Rust, that's
as simple as putting the variable name at the end of the function! Go
ahead and do that. Your submit function in `/src-tauri/src/main.rs` should now look like this:

```rust
fn submit(name: &str, scheme: &str) -> String {
   let mut changed_name = name.to_string();


   match scheme {
       "camelCase" => changed_name = name.to_case(Case::Camel),
       "PascalCase" => changed_name = name.to_case(Case::Pascal),
       "snake_case" => changed_name = name.to_case(Case::Snake),
       "kebab-case" => changed_name = name.to_case(Case::Kebab),
       _ => ()
   }


   changed_name
}
```

Congratulations! The variable capitalization utility is now fully
functional! Test it out for yourself to see it work.

While this may be the end of the workshop, it doesn't have to be the end
of your app! There's still a lot that you could change and customize.
For example, you could change up the UI to make it look better, or add
more case options. You could even turn this into a full-fledged text
manipulation utility!

I hope this was a good workshop for you! Please give me some feedback on how I could improve it!
