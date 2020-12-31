import React from 'react';
import axios from 'axios';
import JokeClassBased from './JokeClassBased'
import "./JokeList.css";

class JokeListClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jokes: []};
    this.vote = this.vote.bind(this)
    this.fetchJokes = this.fetchJokes.bind(this)
    this.clearJokes = this.clearJokes.bind(this)
 }
    //   things that the class-based component did
      /*1- get jokes if there are no jokes */

      async fetchJokes() {
      const numJokesToGet = 10;
        console.log('fetchJokesclicked')
      let j = this.state.jokes;
      let seenJokes = new Set(j.map(j => j.id));
      try {
        while (j.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        // setJokes(j);
        this.setState({ j});
      } catch (e) {
        console.log(e);
      }
    };

    componentDidMount() {
      this.fetchJokes();
     };
    
    
  
    async componentDidUpdate(prevProps) {
      // if we received a new joke, we need to fetch its data
      if (prevProps.joke !== this.props.joke) {

        let j = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
        this.setState({ jokes: j});
        this.fetchJokes()
      }
    };
    
  /*2- TODO empty joke list and then  get jokes */
  clearJokes() {
    this.setState({jokes: []})
  }
  async componentWillUnmount(prevProps) {
      this.clearJokes();
            }

      /*3- change vote for this id by delta (+1 or -1) */
    vote(id, delta) {

          console.log(this.state)
          // let jokes = [...this.state.jokes]//why is this.state undefined here?
          // const jokes = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));
          // this.setState({jokes})
          this.setState((currentState) => {
            const jokes = currentState.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));
            return {jokes};
          });
    }
    
    /* render: either loading spinner or list of sorted jokes. */

render() {
const sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
                    if (sortedJokes) {
                     return (<div>
                      <h1>HI THESE ARE CLASS BASED</h1>
                   <div className="JokeList">
                      <button className="JokeList-getmore" onClick={ this.fetchJokes}> 
                        Get New Jokes
                      </button>
                      <button className="JokeList-getmore" onClick={ this.clearJokes}> 
                        Clear Jokes
                      </button>
                      {sortedJokes.map(j => (
                        <JokeClassBased text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                      ))}
                    </div>
                    </div>)
                    }                     
           };
          }

    
            
          
  export default JokeListClassBased;