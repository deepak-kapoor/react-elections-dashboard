import React, { Component } from 'react';
import 'whatwg-fetch';

export class ResultFirstPreferenceByCandidate extends Component {

  constructor(props) {
    super(props);
    this.state = {votes: {}};
    this.getVotes = this.getVotes.bind(this);
  }

  componentDidMount() {
    this.getVotes();
  }

  getVotes() {
    fetch('https://elec-960cb.firebaseio.com/housefirstprefresults.json')
      .then((response) => {
        return response.json();
      }).then((data) => {
        data.forEach((value, index) => {
        if(value.CandidateID == this.props.candidate.CandidateID) {
          this.setState({votes: value});
          return;
        }
      });

      });
  }


  render() {
    let votes = this.state.votes;


    let ordinaryVotesWidth = ((votes.OrdinaryVotes / votes.TotalVotes) * 100) + '%';
    let postalVotesWidth = ((votes.PostalVotes / votes.TotalVotes) * 100) + '%';
    let prePollVotesWidth = ((votes.PrePollVotes / votes.TotalVotes) * 100) + '%';
    let provisionalVotesWidth = ((votes.ProvisionalVotes / votes.TotalVotes) * 100) + '%';
    let absentVotesWidth = ((votes.AbsentVotes / votes.TotalVotes) * 100) + '%';

    let vote = (
          <div className="votes-bar-container">
            <div bsStyle="default" style={{width: ordinaryVotesWidth}} 
              className="votes-bar bg-success"></div>
            <div style={{width: postalVotesWidth}} 
              className="votes-bar bg-info"></div>
            <div style={{width: prePollVotesWidth}} 
              className="votes-bar bg-warning"></div>
            <div style={{width: provisionalVotesWidth}} 
              className="votes-bar bg-brown"></div>
            <div style={{width: absentVotesWidth}} 
              className="votes-bar bg-danger"></div>
            <div className="votes-bar-text text-primary">{votes.TotalVotes || 0} votes</div>
          </div>);

    
    
    return (
      <div>
        {vote}
      </div>
    );
  }
}

ResultFirstPreferenceByCandidate.propTypes = {
  candidate: React.PropTypes.object

};

export default ResultFirstPreferenceByCandidate;


