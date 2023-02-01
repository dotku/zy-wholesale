import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("https://japanese-products.deno.dev/")
      .then((rsp) => rsp.json())
      .then((rsp) => setState(rsp));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="my-3">{process.env.REACT_APP_SITE_NAME}</h1>
        <div>
          Contact US:{" "}
          <a href="mailto:info@zyinternationaltrade.com">
            info@zyinternationaltrade.com
          </a>
        </div>
      </header>
      <div className="">
        {state?.rows ? (
          state.rows.map(({ id, titleEn, titleJp }, idx) => (
            <div className="container py-3">
              <div className="card" key={idx}>
                <img
                  className="card-img-top"
                  src={`https://tenso-japan.com/business/rest/product/image?id=${id}`}
                  alt={titleEn}
                />
                <div className="card-body">
                  <h5 className="card-title">{titleEn}</h5>
                  <p className="card-text">{titleJp}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            Something Goes Wrong, please contact administrator
            <a href="mailto:info@zyinternationaltrade.com">
              info@zyinternationaltrade.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
