import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import FirstForm from "./pages/firstForm/FirstForm";
import SecondForm from "./pages/secondForm/SecondForm";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form1" element={<FirstForm />} />
          <Route path="/form2" element={<SecondForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
