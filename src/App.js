import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch(params) {
    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Não foi possivel localizar o CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP" value={input} onChange={e => setInput(e.target.value)}></input>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"></FiSearch>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="infoCep">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
