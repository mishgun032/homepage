import React, { PureComponent } from 'react';
import styled from 'styled-components'

const Head = styled.header`
  width: 100vw;
  height: 300px;
  display: flex;
  background: #111111;
  justify-content: center;
  flex-direction: column;
  color: white;
  align-items: center;
`
const Img = styled.img`
  border-radius: 100%
`
const Title = styled.h1`
  color: ${props => props.error ? "red" : "white"}
`

class Header extends PureComponent{
  render() {
    return (
      <Head>
	<a href={this.props.url} target="_blank" rel="noreferrer"><Img alt="Avatar" src={this.props.avatar} /></a>
	<Title error={this.props.error}>{this.props.text}</Title>
      </Head>
    );
  }
};


export default Header;
