import MainSearch from "./pages/main-search/components/MainSearch";
import Map from "./pages/main-search/components/Map";
import { SearchCriteriaProvider } from "./pages/main-search/contexts/SearchCriteriaContext";


function App() {
  return (
    <div className="app">
      <SearchCriteriaProvider>
        <Map></Map>
        <MainSearch>
        </MainSearch>
      </SearchCriteriaProvider>
    </div>
  );
}

export default App;
