import React from "react";
import "./Joke.css";

class JokeClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jokes: []}
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    
 }
//  { vote, votes, text, id }
upVote =()=> {
    this.props.vote(this.props.id, +1)
 }

downVote =()=> {
    this.props.vote(this.props.id, -1)
}


//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }
render() {
    return (
    <div className="Joke">
    <div className="Joke-votearea">
      <button onClick={this.upVote}>
        <i className="fas fa-thumbs-up" />
      </button>

      <button onClick={this.downVote}>
        <i className="fas fa-thumbs-down" />
      </button>

      {this.props.votes}
    </div>

    <div className="Joke-text">{this.props.text}</div>
  </div>
  )};
}

export default JokeClassBased;
