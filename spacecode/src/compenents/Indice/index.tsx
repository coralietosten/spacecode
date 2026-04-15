import React from "react";

import "./style.css";
import { loadIndicesByExo } from "../../services/service-api";

type Props = {

}
type State = {
    id_exo : number;
    indice : string;
    visible : boolean
}

export default class Indice extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
            id_exo : 0,//props.id_exo;
            indice : "",
            visible : false
        }
    }

    afficheIndice = () => {
        loadIndicesByExo(1).then(data =>{
            console.log(data);
            this.setState ({
                id_exo : 1,
                indice : data.instruction,
                visible : true
            });
        })
        console.log(this.state.indice);
    }

    fermerIndice = () => {
        this.setState({
            visible : false
        })
    }

    render() {
        return(
            <div>
                <button onClick = {this.afficheIndice}><span>Aide</span><img src="/assets/aideIcon.svg"></img></button>

                {/*fenetre affichant l'indice*/}
                {this.state.visible && (
                    <div className = "overlay" >
                        <div className = "fenetre">
                        <h3>Indice</h3>
                        <p>{this.state.indice}</p>

                        <button onClick={this.fermerIndice}>
                            Fermer
                        </button>
                        </div>
                    </div>
                    )}
            </div>
        )
    }
    

}