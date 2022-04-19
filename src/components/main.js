import React, {PureComponent, useState} from 'react';
import {MainContainer, RepoContainer, RepoHeader, CommitMessage, CommitInfo, Commit, Reponumber, Commitshowmore, CloneInp, CloneBody, Btn, Info} from './main.jsx'

//<RepoCommits url={repo.commits_url} />
class Main extends PureComponent {

  render() {
    if(Object.keys(this.props.repos[0]).length < 5) {
      return <div></div>
    }
    return (
      <MainContainer>
	<Reponumber>Found {this.props.showforked ?  `${this.props.repos.length} ${this.props.repos.length > 1 ? " repos" : " repo"}` : count(this.props.repos)} </Reponumber>
      {
	this.props.repos.map( repo => {
	  if ( this.props.showforked ?  true : repo.fork !== true){//show either all repos or only those that you didn't forked
	    const url = `https://api.github.com/repos/${this.props.nickname}/${repo.name}/commits`;
	    return (
	      <RepoContainer key={repo.id}>
		<RepoHead  repo={repo} />
		<RepoCommit url={url} />
	      </RepoContainer>
	    )
	  }
	})
      }
      </MainContainer>
    );
  }
}

function count(arr){
  let x=0;
  for(let key in arr){
    if(arr[key].fork !== true){
      x++
    }
  }
  return x > 1 ? `${x} repos` : `${x} repo`;
}
function RepoHead(props) {
  return (
    <RepoHeader>
    <CloneRepo ssh={props.repo.ssh_url} https={props.repo.clone_url}></CloneRepo>
    <a href={props.repo.html_url}>{props.repo.name}</a>
    <Info>
    </Info>
    </RepoHeader>
  )
}

function CloneRepo(props) {
  const [copy, setCopy] = useState(props.ssh)

  return (
    <CloneBody>
      <Btn onClick={() => setCopy(copy===props.ssh ? props.https : props.ssh) }>{copy===props.ssh ? "https" : "ssh"}?</Btn>
     <CloneInp className='clone' readOnly value={copy} spellcheck="false"/>
    </CloneBody>
  )

}

function RepoCommit (prop){

  const [st, setSt] = useState({
    go: true,
    commits: [],
    more: []
  })

  if(st.go){
    setSt({go: false, commits: []})
    fetch(prop.url,  {
      headers : { 
	'Content-Type': 'application/json',
	'Accept': 'application/json'
      }
    })
      .then(response => {
	if (response.ok) {
	  return response.json()
	}else {
	  console.log(new Error('could not load commit history'))
	  return new Error('cant load the commit history')
	}
      })
      .then( commits => {
	if(commits.length >0){
	  setSt({
	    go: false,
	    //zapomni ato zabudish
	    commits: commits.length > 3 ? commits.splice(0,3) : commits,
	    more: commits
	  })
	}else {
	  setSt({
	    go: false,
	    //zapomni ato zabudish
	    commits: [{commit : {message: 'could not load the commits for this repo',author : {login: ''},date:''},sha:'1'}],
	    more: []
	  })
	  
	}
      }, error => {
	setSt({
	  go: false,
	  //zapomni ato zabudish
	  commits: [{commits : {message: 'could not load the commits for this repo'}}],
	  more: []
	})
	console.log('err')
      })
  }

  function handlClick() {
    if(st.commits.length===3){
      setSt( prev => ({
	go: false,
	//zapomni ato zabudish
	commits: prev.commits.concat(prev.more) ,
	more: prev.more
      }))
    }else if(st.commits.length){
      setSt( prev => ({
	go: false,
	//zapomni ato zabudish
	commits: prev.commits.slice(0,3),
	more: prev.more
      }))
      
    }

  }
  function showmore(){
    if(st.commits.length===3){
      return 'show more ▼'
    } else if (st.commits.length > 3) {
      return 'show less ▲'
    }
	}
  return (
    <Commit>
    {
      st.commits.map( com => {
	return (
	  <div key={com.sha}>
	    <CommitMessage>
	      {com.commit.message}
	      <CommitInfo>
		<div>
		  By: {com.author ? com.author.login : com.commit.author.name}
		</div>
		<div>
		  Date: {com.commit.author.date ? com.commit.author.date.slice(0, 10) : ''}
		</div>
	      </CommitInfo>
	    </CommitMessage>
	  </div>
	)
      })
    }
    <Commitshowmore onClick={handlClick}>{ showmore() }</Commitshowmore>
    
    </Commit>
  )
}

export default Main;
