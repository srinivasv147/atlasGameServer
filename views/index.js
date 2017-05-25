var React  = require('react');
var ReactDOM = require('react-dom');
// var fetch = require('whatwg-fetch');
var axios = require('axios');
var App = React.createClass(
    { getInitialState : function(){
      return {opponent : "", user : "", hasPlayed : false};
    },
    handleChange : function(e){
      if(!this.state.hasPlayed){
        this.setState({user : e.target.value});
        // console.log(fetch);
      }
    },
    handleSubmit : function(e){
      this.setState({hasPlayed : true})
      console.log("handling submit");
      var url = "/play";
      // console.log(url);
      var self = this;
      axios.post(url,{
        place : this.state.user
      }).then(
        function(data){self.setState({
          opponent : data.data.place,
          hasPlayed : false
        })}
      );
    },
    render : function(){return (<div id="game">welcome to atlas
      <div id="opponent-plays">
        <h2> Opponent played </h2>
        <h1> {this.state.opponent} </h1>
      </div>
      <div id="user-input">
        <form>
          enter your place:
          <input autoComplete="off" type="text" name="place" onChange={this.handleChange} />
          <input type="button" value="Go!" onClick ={this.handleSubmit} />
        </form>
      </div>
      <div id="user-plays">
        <h2> You are playing </h2>
        <h1> {this.state.user} </h1>
      </div>
    </div>);}});
ReactDOM.render(<App />,document.getElementById('app'));
