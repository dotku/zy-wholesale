import "./App.css";
import { useEffect, useState } from "react";
import TJImage from "./component/TJImage";

function App() {
  const [state, setState] = useState([]);
  const [ifLoading, setIfLoading] = useState(true);
  const [ifError, setIfError] = useState(false);

  useEffect(() => {
    fetch("https://japanese-products.deno.dev/")
      .then((rsp) => rsp.json())
      .then((rsp) => {
        setState(rsp);
        setIfError(false);
      })
      .catch((e) => {
        console.error(e);
        setIfError(true);
      })
      .finally(() => {
        setIfLoading(false);
      });
  }, []);

  const products = (
    <div className="">
      {state?.rows && !ifError ? (
        state.rows.map(({ id, titleEn, titleJp }, idx) => (
          <div className="container py-3" key={idx}>
            <div className="card shadow">
              <TJImage
                id={id}
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
        <div className="alert container bg-warning text-dark">
          Something Goes Wrong, please contact administrator:{" "}
          <a href="mailto:info@zyinternationaltrade.com" className="text-dark">
            info@zyinternationaltrade.com
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="bg-light text-danger w-100">
          <h1 className="my-3 text-center text-weight-bold">ZY</h1>
        </div>
      </header>
      <div className="bg-black text-dark text-center py-1">
        <small style={{ color: "#999" }}>
          A US Based Japanese Product Distributor.
        </small>
      </div>
      <div className="hero bg-danger text-light">
        <div className="container hero py-5 h3 font-weight-light text-center">
          <p>
            Wecurrently promote special program for US market Asian Cosmetics
            products. Contact us now for more content for special deal and
            promte program.
          </p>
          <div className="cta text-center">
            <a
              href="mailto:info@zyinternationaltrade.com"
              className="btn btn-outline-light mt-3"
            >
              Contact US
            </a>
          </div>
        </div>
      </div>
      {ifLoading ? <div className="container">Loading...</div> : products}
      <div className="footer py-3 container bg-secondary mt-3 text-light">
        <small>Copyrights &copy; 2023, ZY International Trade Inc.</small>
      </div>
    </div>
  );
}

export default App;
