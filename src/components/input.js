import React, { PureComponent } from 'react';
import styled from 'styled-components'

const Inp = styled.input`
  width: 300px;
  height: 50px;
 
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  
  margin-right: 10px;
  margin-bottom: 5px;

  text-align: center;
  font-size: 15px;

  border: ${props => props.error ? "1px solid red" : "1px solid black"};
`
const Section = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;

  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column

`
const Btn = styled.button`
  margin-top: 20px;
  margin-bottom: 10px;
  padding-top:5px;
  padding-bottom: 5px;

  border: 0px;

  font-size: 25px;
  width: 130px;
  
  background: #111111;
  
  color: white;
  
  cursor: pointer;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Checkboxtitle = styled.div`
  cursor: pointer;
`

class Input extends React.Component {
	constructor(props) {
    super(props);

    this.handlInp = this.handlInp.bind(this)
  }
  handlInp(e) {
    if(e.keyCode === 13){
      this.props.handlSub()
    }
  }
  render() {
    return (
      <Section>
      <Inp type="text" value={this.props.value} error={this.props.error} onChange={this.props.onChange} onKeyDown={this.handlInp} placeholder="Enter Your Github Accout Name" />
      <InputContainer>
	<div>
	  <InputContainer>
	    <input name="" type="checkbox" value="" onChange={ (e) => this.props.onClick('showforked',e)} checked={this.props.checked.showforked} /> <Checkboxtitle onClick={(e) => this.props.onClick('showforked',e)}>show forked</Checkboxtitle>
	  </InputContainer>
	</div>
	</InputContainer>
	<Button onClick={this.props.handlSub}></Button>
	<InputContainer>
	  <input name="" type="checkbox" value="" onChange={ (e) => this.props.onClick('remember',e)} checked={this.props.checked.remember} /> <Checkboxtitle onClick={ (e) => this.props.onClick('remember',e)}>Remember me</Checkboxtitle>
	</InputContainer>
      </Section>
    );
  }
};

class Button extends PureComponent{
  render() {
    return (
      <Btn type="submit" onClick={this.props.onClick}>Submit</Btn>
    )
  }
}

export default Input;
