import React, { Component } from 'react';
import {FormGroup,Checkbox,ControlLabel, FormControl} from 'react-bootstrap';

export default class PracticeOptionsForm extends Component {

    state = {
        operatorControl : {
            add: true,
            minus: true,
            multiply:true,
            divide:true
        },
        negativeControl: true,
        timeControl: 'No limit'
    }
  render() {
      let {operatorControl, negativeControl} = this.state;
      let durationValues = [1,2,3,4,5];
    return (
      <form>
        <h3>Customize your practice..</h3>
        <FormGroup controlId="Operators">
            <ControlLabel>Operators</ControlLabel>{" "}
            <Checkbox checked={operatorControl.add} onChange={() => {this.handleOperatorControl("add")}} inline>+</Checkbox> 
            <Checkbox checked={operatorControl.minus} onChange={() => {this.handleOperatorControl("minus")}} inline>-</Checkbox>
            <Checkbox checked={operatorControl.multiply} onChange={() => {this.handleOperatorControl("multiply")}} inline>*</Checkbox>
            <Checkbox checked={operatorControl.divide} onChange={() => {this.handleOperatorControl("divide")}} inline>/</Checkbox>
        </FormGroup>
        <FormGroup controlId="Negative">
            <ControlLabel>Include Negative No.s</ControlLabel>{" "}
            <Checkbox checked={negativeControl} onChange={this.handleNegativeControl} inline>.</Checkbox> 
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Duration</ControlLabel>
          <FormControl inline componentClass="select" placeholder={this.state.timeControl}>
            <option value="No limit">No limit</option>
            {durationValues.map((item, index) => 
              <option value={item}>{item}</option>
            )}
          </FormControl>
        </FormGroup>
      </form>
    )
  }

  handleOperatorControl = (operator) => {
    let operatorControl = this.state.operatorControl;
    operatorControl[operator] = !operatorControl[operator];
    this.setState({operatorControl});
  }

  handleNegativeControl = () => {
    this.setState({negativeControl:!this.state.negativeControl});
  }
}
