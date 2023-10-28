import "./App.css";
import "@fontsource/be-vietnam-pro";
import "../src/asset/css/style.css";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralRoute } from "./routes/GeneralRoute";
import SiteRoute from "./routes/Route";
import toast, { Toaster } from "react-hot-toast";
import { setAlert } from "./slices/AlertSlice";
import { loadUser } from "./slices/AuthSlice";

function App() {
  const { refresh, logged } = useSelector((state) => state.authReducer);
  const { msg } = useSelector((state) => state.alertReducer);

  const notify = (msg) => {
    switch (msg.type) {
      case "success":
        toast.success(msg.content);
        break;
      case "error":
        toast.error(msg.content);
        break;
    }
  };
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(loadUser());
  }, [refresh]);
  useLayoutEffect(() => {
    if (Object.keys(msg).length !== 0) {
      notify(msg);
      dispatch(setAlert({}));
    }
  }, [msg]);
  const routes = logged ? <SiteRoute /> : <GeneralRoute />;
  return (
    <div>
      {routes}
      <Toaster />
    </div>
  );
}

export default App;
