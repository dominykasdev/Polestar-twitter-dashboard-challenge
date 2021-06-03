import React from 'react';
import { getUserTweets } from './api/connect';
import List from './components/list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [], username: '', noTweetsFound: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value, tweets: [], noTweetsFound: false });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.username) {
      const response = await getUserTweets(this.state.username);
      const json = await response.json();
      this.processData(json);
    } else {
      alert("Username cannot be empty!");
    }
  }

  processData(json){
    if(json.error){
        alert(json.error);
      }
      else if (json.meta.result_count > 0){
        this.setState({ tweets: json.data, noTweetsFound: false  });
      } else {
        this.setState({ noTweetsFound: true  });
      }
  }

  render() {
    if (this.state.tweets.length) {
      return (
        <div>
          <p>Click the button to get tweets from your favourite twitter user.</p>
          <form onSubmit={this.handleSubmit}>
            <label>Username: </label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="e.g. SoVeryBritish"></input>
            <button type="submit" value="Submit">Search tweets</button>
          </form>
          <List tweets={this.state.tweets} username={this.state.username} />
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username: </label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="e.g. SoVeryBritish"></input>
            <button type="submit" value="Submit">Search tweets</button>
          </form>
          {this.state.noTweetsFound && <p>The user <b>{this.state.username}</b> has no tweets!</p>}
        </div>
      );
    }

  }
}

export default App;
