import React from "react";

import "./styles.css";


import Star from "../../compenents/Star";

import gsap from "gsap";
import SmallScreen from "../../compenents/SmallScreen";
import FormLogin from "../../compenents/FormLogin";
import FormRegister from "../../compenents/FormRegister";
import Form from "../../compenents/Form";




export default class Connection extends React.Component {

  render() {


    return (
      <SmallScreen>
        <Form>
          <FormLogin/>
        </Form>
      </SmallScreen>
    );
  }
}