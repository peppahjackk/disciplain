import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

  render() {
    return (<header >
      <h1> {this.props.title} </h1> </header>)
  }
};

class HourTracker extends React.Component{ 
  
  constructor(props) {
    super(props);
    this.state = { totalHours: 0, totalMins: 0, tempHours: 0, tempMins: 0, notes: '', tempNote: '' }//totalHours: (JSON.parse(localStorage.getItem('hrs') || '0')), totalMins: (JSON.parse(localStorage.getItem('mins') || '0')), notes: (JSON.parse(localStorage.getItem('notes') || 'blank')), tempHours: 0, tempMins: 0 }
  }

  addHour() {
    this.setState((prevState => {
      return { tempHours: prevState.tempHours + 1 };
    }))
  }

  addMins() {
    this.setState((prevState => {
      if (prevState.tempMins >= 40) {
        return {
          tempMins: 0,
          tempHours: prevState.tempHours + 1
        }
      } 
      else {
        return { tempMins: prevState.tempMins + 20 }
      }
    }))
  }
  
  submitSession(e) {
    e.preventDefault();
    
    this.setState((prevState => {
      if (prevState.totalMins + this.state.tempMins > 40) {
        localStorage.setItem('mins', JSON.stringify((prevState.totalMins + this.state.tempMins) - 60))
        localStorage.setItem('hrs', JSON.stringify(prevState.totalHrs + this.state.tempMins + 1))
        return {totalHours: (prevState.totalHours + this.state.tempHours) + 1, totalMins: (prevState.totalMins + this.state.tempMins) - 60, tempHours: 0, tempMins: 0, notes: prevState.notes + this.state.tempNote, tempNote: '' }
      }
      else {
        localStorage.setItem('hrs', JSON.stringify(prevState.totalHours + this.state.tempHours))
        localStorage.setItem('mins', JSON.stringify(prevState.totalMins + this.state.tempMins))
        return {totalHours: prevState.totalHours + this.state.tempHours, totalMins: prevState.totalMins + this.state.tempMins, tempHours: 0, tempMins: 0, notes: prevState.notes + this.state.tempNote, tempNote: '' }
      }
    }))
    
  }
  
  handleChange(e) {
    this.setState({tempNote: e.target.value});
  }

  clearStorage() {
    localStorage.setItem('hrs', JSON.stringify(0)),
    localStorage.setItem('mins', JSON.stringify(0)),
    this.setState((prevState => {
      return {totalHours: 0, totalMins: 0}
    }))
  }

    render() {
      
        return (
            <div className="overview">
                <div className="weekTotals">
                    <p className="totalTime"> This week: <strong>{this.state.totalHours}  hours {this.state.totalMins}  minutes</strong><br/> Notes: {this.state.notes} </p>
                </div>
                <form role="form" id="sessionForm" onSubmit={this.submitSession.bind(this)} >
                  <h3>Create a new session</h3>
                  <p> {this.state.tempHours} hours {this.state.tempMins} minutes </p>
                  <div className="row">
                    <input type="button" onClick={this.addHour.bind(this)} value="Add Hour" />
                    <input type="button" onClick={this.addMins.bind(this)} value="Add 20 Minutes" />
                  </div>
                  <textarea ref="notes" id="notes" rows="4" placeholder="Session Notes" onChange={this.handleChange.bind(this)} value={this.state.tempNote} />
                  <input type="submit" value="Submit session" />
                </form>
                  
                <input type="button" onClick={this.clearStorage.bind(this)} value="Clear storage" />
            </div>
        );
    }
};

class App extends React.Component {

  render() {
    return (
      <div>
        <Header title = "Disciplain" />
        <HourTracker />
      </div> );
    }

};

ReactDOM.render(<App />, document.getElementById("app"));
