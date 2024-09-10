import MainSearch from "./pages/main-search/components/MainSearch";
import Map from "./pages/main-search/components/Map";
import { SearchProvider } from "./pages/main-search/contexts/SearchContext";


function App() {
  return (
    <div className="app">
      <SearchProvider>
        <Map></Map>
        <MainSearch></MainSearch>
      </SearchProvider>
    </div>
  );
}

export default App;
