import { AppRouter } from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";

function App() {
  return (

    <div className="main-container">

        <AppProvider>
          <AppRouter />
        </AppProvider>

      <div className="footer"></div>

    </div>

  );
}

export default App;
