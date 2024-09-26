import MainMap from "./pages/main-search/components/MainMap";
import MainSearch from "./pages/main-search/components/MainSearch";
import { SearchProvider } from "./pages/main-search/contexts/SearchContext";


function App() {
  return (
    <div className="app">
      <SearchProvider>
        <MainMap></MainMap>
        <MainSearch></MainSearch>
        <div className="over-right"></div>
      </SearchProvider>
    </div>
  );
}

export default App;
