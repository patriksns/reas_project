import React, { Component } from 'react'
import EstateDetails from './EstateDetails'
import PersonalDetails from './PersonalDetails'
import Confirmation from './Confirmation'
import Success from './Success'

export default class Signup extends Component {

  state = {
    step: 1,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    dataNAZ: '',
    estateType: '',
  }

  // krok zpět
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // krok vpřed
  nextStep = (formData) => {
  const { step } = this.state;
  if (formData && formData.EstateType) {
    this.setState({ estateType: formData.EstateType });
  }
  if (formData && formData.dataNAZ) { // kontrola existence a obsahu dataNAZ
    this.setState({ dataNAZ: formData.dataNAZ }); // uložení dataNAZ do stavu
  }
  this.setState({ step: step + 1, ...formData });
}

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  render() {
    const { step, estateType, dataNAZ } = this.state;
    const { email, firstName, lastName, phone, formData } = this.state;
    const values = { email, firstName, lastName, phone, formData, estateType, dataNAZ };
    
    switch(step) {
      case 1: 
        return (
          <EstateDetails 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={{ ...values, estateType, dataNAZ }} // přidání estateType a dataNAZ do values
          />
        )
      case 2: 
        return (
          <PersonalDetails 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 3: 
          return (
            <Confirmation 
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              values={ values }
              dataNAZ={ this.state.dataNAZ }
            />
          )
        case 4: 
          return (
            <Success />
          )
      default: 
    }
  }
}
