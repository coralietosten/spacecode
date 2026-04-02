import React from "react";

import "./styles.css";


import Star from "../../compenents/Star";

import SmallScreen from "../../compenents/SmallScreen";
import InputText from "../../compenents/inputText";
import { useNavigate } from "react-router-dom";


type Props = {
};


export default function Connection(props: Props) {

  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const navigate = useNavigate();


  const cancel_button = () => {
      navigate(-1);
  };

  const valid_button = () => {
      navigate("/base");
  };

  return (
    <SmallScreen>
      <div className="form">

        <div>
          <InputText name="email" id="email" value={email} setvalue={setemail}/>
          <InputText name="mots de passe" id="password" value={password} setvalue={setpassword} />
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