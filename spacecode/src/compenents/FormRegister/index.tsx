

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Templat from "../Templat";

import data from "../../compenents/DataBase.json";

import gsap from "gsap";
import SmallScreenEdge from "../SmallScreenEdge";
import InputText from "../inputText";


type State = {
}
type Props = {
};

export default class FormRegister extends React.Component<Props, State> {


    render() {
        return (
            <div>
                <InputText name="pseudo" id="pseudo" />
                <InputText name="email" id="email" />
                <InputText name="mots de passe" id="password" />
                <InputText name="confirmation de mots de passe" id="password_confirmation" />
            </div>
        )
    }
}