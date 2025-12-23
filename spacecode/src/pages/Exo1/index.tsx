import React from "react";

import "./styles.css";

import Tablet from "../../compenents/Tablet";


type State = {}
type Props = {}

export default class Exo1 extends React.Component<Props, State> {


    render(){
        return(
            <main>
                
                <Tablet />

                {/* <h1>Exo1</h1>

                <div className = "content">

                    <div className = "instructions">
                        <h2>Instructions :</h2>
                        <p>
                            Voici le premier exercice.
                        </p>
                    </div>


                    <div className = "work-space">

                        <div className="first-panel">

                            <textarea id="zone-code" className="zone">
                                <table>
                                    <tr>
                                    <th>Nom</th>
                                    <th>Age</th>
                                    <th>Pays</th>
                                    </tr>
                                    <tr>
                                    <td>Jean</td>
                                    <td>25</td>
                                    <td>France</td>
                                    </tr>
                                    <tr>
                                    <td>Marie</td>
                                    <td>30</td>
                                    <td>Canada</td>
                                    </tr>
                                </table> 
                            </textarea>
                                
                        </div>

                        <div className="first-panel">
                            <div id="zone-affichage" className="zone">
                            </div>
                        </div>
                    </div>

                </div>

                <footer>
                    <h3><a href="/"> Retour a l'acceuil</a></h3>
                </footer> */}
            </main>

        )
    }
}