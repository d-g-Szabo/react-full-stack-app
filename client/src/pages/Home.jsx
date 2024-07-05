// This is the first page the user will see - the root
// It can be the same as App.js

//Routing help!
// I wrapped my App in main.jsx with browser router
// I will build myroutes in the root component(App.js or Home.js)

// Routes should wrap your Route
// Route has two attributes --> path, for your params, and element, for the component you want to renred in that path
// For user navigation, separately, you will have Link components
// The Link component has an attribute called to="" to specify the params we are navigating to
export default function Home() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to my blog</p>
    </section>
  );
}
