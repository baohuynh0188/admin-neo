import { React, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login"
import $ from "jquery";
import { useStateValue } from "./context/StateProvider";
import { ACTION_TYPE } from "./reducers/reducer";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      dispatch({ type: ACTION_TYPE.SIGN_OUT });
    } else {
      dispatch({ type: ACTION_TYPE.SIGN_IN });
    }
  }, []);

  return (
    <>
      {!state.isSignIn ? (
        <Login />
      ) : <Home />}
    </>
  );
}

export default App;
