import { AppRouter } from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";
import { HomeScreen } from "./pages/HomeScreen";

function App() {
  return (
    <div className="main-container">
        <AppProvider>
          <AppRouter />
        </AppProvider>

        {/* <HomeScreen />*/}

      <div className="footer"></div>
    </div>
  );
}

export default App;
