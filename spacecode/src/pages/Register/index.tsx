import React from "react";

import "./styles.css";



import SmallScreen from "../../compenents/SmallScreen";
import { useNavigate } from "react-router-dom";
import InputText from "../../compenents/inputText";


type Props = {
};

export default function Register(props: Props) {


  const [peseudo, setpeseudo] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [password_confirmation, setpassword_confirmation] = React.useState("");
  

  const navigate = useNavigate();


  const cancel_button = () => {
    navigate(-1);
  };

  const valid_button = () => {
    navigate("/introduction");
  };

  return (
    <SmallScreen>

      <div className="form">
        <h1 className="top_message">
          {"Bienvenue dans l'examen pour devenir sauveur d'étoile. avant de commencer, j'ai quelques questions pour vous"}
        </h1>
        <div>
          <InputText name="pseudo" id="pseudo" value={peseudo} setvalue={setpeseudo}/>
          <InputText name="email" id="email" value={email} setvalue={setemail}/>
          <InputText name="mots de passe" id="password" value={password} setvalue={setpassword}/>
          <InputText name="confirmation de mots de passe" id="password_confirmation" value={password_confirmation} setvalue={setpassword_confirmation}/>
        </div>

        <div className="form_button">
          <button className="transparent_button" onClick={valid_button}>Valider</button>
          <button className="cancel_button" onClick={cancel_button}>
            Retour
          </button>
        </div>
      </div>
    </SmallScreen>
  );
}