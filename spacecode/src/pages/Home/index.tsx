import React from "react";

import "./styles.css";




type State = {}
type Props = {}

export default class Home extends React.Component<Props, State> {


    render(){
        return(
            <main>
                <h1>
                    Bienvenu sur space code
                </h1>
                <h2><a href="/exercice">aller vers les exercice</a></h2>
            </main>

        )
    }
}