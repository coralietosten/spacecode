

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    name: string
    id: string
    value: any
    setvalue: (value: any) => void
}

export default class inputText extends React.Component<Props, State> {


    render() {

        return (
            <div className="input_text">
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <input type="text"
                    name={this.props.id}
                    id={this.props.id}
                    value={this.props.value}
                    onChange={(e) => this.props.setvalue(e)} />
            </div>
        )
    }
}
