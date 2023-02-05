import GlobalStyles from "./components/GlobalStyles";
import data from "./data.json";
import MainBody from "./components/MainBody";

function App() {
  return (
    <>
      <GlobalStyles />
      <MainBody data={data} />
    </>
  );
}

export default App;
