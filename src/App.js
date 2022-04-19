import React from 'react'
import Header from './components/header'
import Input from './components/input'
import Main from './components/main'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checked: {showforked: false, remember: false}, //manages checkboxes
      input: '',
      nickname: localStorage.getItem('nickname')===null ? 'github' : localStorage.getItem('nickname'),
      error: false, //will be set to true if the user will not be found
      repos: [{
	id: 1,
	commits_url: "f",
	owner: {
	  avatar_url: '/logo.png', html_url:"https://github.com" }
      }] 
    }
    this.handlClick = this.handlClick.bind(this)
    this.handlInput= this.handlInput.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
  }
  handlInput(e) {
    this.setState({input: e.target.value})
  }
  handlClick(checkbox, e){
    this.setState( prevState => ({
      checked: {
	...prevState.checked,
	[checkbox]: !prevState.checked[checkbox]
      }
    }))
  }
  handlSubmit() {
    if(this.state.nickname === this.state.input){
      return null;
    }
    const nickname = this.state.input
    const url = `https://api.github.com/users/${nickname}/repos`
    if(this.state.checked.remember){
      localStorage.setItem('input', nickname)
    }
    fetch(url)
      .then( (response) => {
	if(response.ok){
	  this.state.error && this.setState({error: false}) 
	  return response.json()
	}else {
	  console.log(`could not access ${url}`)
	  this.setState( prev => ({
	    error: true,
	    nickname: `${prev.nickname} NOT FOUND`,
	    repos: localStorage.getItem('repos') === null ? prev.repos : localStorage.getItem('repos')
	  }))
	  this.setState( prev => ({error: true, nickname: `${prev.nickname} NOT FOUND`}))
	  return this.state.repos
	}
      })
      .then( repos => {
	this.setState({
	  nickname: nickname,
	  repos: repos
	})
	if(this.state.checked.remember){
	  localStorage.setItem('repos', JSON.stringify(repos))
	}
      }, error => {
	console.log('error')
	this.setState( prev => ({
	  error: true,
	  nickname: `${prev.nickname} NOT FOUND`,
	  repos: localStorage.getItem('repos') === null ? prev.repos : localStorage.getItem('repos')
	}))
      })


  }
  render() {
    if (localStorage.getItem("input") !== null && this.state.repos[0].id===1){
      this.state.input = localStorage.getItem('input')
      this.handlSubmit()
    }
    //zpomni ato zabudish : vsegda astavliai fallback
    return (
      <div className="App">
	<Header text={this.state.nickname} error={this.state.error} avatar={this.state.repos[0].owner.avatar_url} url={this.state.repos[0].owner.html_url} />
	<Input value={this.state.input} onChange={this.handlInput} onClick={this.handlClick} checked={this.state.checked} handlSub={this.handlSubmit} error={this.state.error} />
	<Main nickname={this.state.nickname} showforked={this.state.checked.showforked} repos={this.state.repos} />
      </div>
    );
  }
}


export default App;
