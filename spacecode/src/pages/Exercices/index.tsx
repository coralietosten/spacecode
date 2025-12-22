import React from "react";

import "./styles.css";




type State = {}
type Props = {}

export default class Exercices extends React.Component<Props, State> {


    render(){
        return(
            <main>

                <h1>Page exercices</h1>

                exercice

                <ul>
                    <li>
                        <a href="/exercice/1">Exercice 1</a>
                    </li>
                    <li>
                        <a href="/exercice/2">Exercice 2</a>
                    </li>
                    <li>
                        <a href="/exercice/3">Exercice 3</a>
                    </li>
                </ul>


                <footer>
                    <h3><a href="/"> Retour a l'acceuil</a></h3>
                </footer>
            </main>

        )
    }
}