import React from "react";
import ReactDOM from "react-dom";
import students from '../cohort-data/hrnyc20';
import NameItem from './nameItem.jsx';
import randomize from './../randomizer.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentList: students,
      randomizedStudents: null,
      itemToAdd: '',
      currentNumber: 1,
      showNames: true,
      showNormal: true,
      showWinner: false,
      winner: null,
      nextDay: 'Tuesday, 02/26/19'
    };
    
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.randomizeClass = this.randomizeClass.bind(this);
    this.handleWinner = this.handleWinner.bind(this);
    this.saveWinnerToSpreadsheet = this.saveWinnerToSpreadsheet.bind(this);
  }
  
  randomizeClass() {
    var orderedStudents = this.state.studentList;
    console.log(orderedStudents);
    var randomized = randomize(orderedStudents);
    this.setState({
      showNormal: false,
      randomizedStudents: randomized
    })
  }

  handleNumberChange(e) {
    e.preventDefault();
    var newNumber = e.target.value;
    console.log("Number Selection", newNumber);
    this.setState({
      currentNumber: parseInt(newNumber)
    })
  }

  saveWinnerToSpreadsheet(winner) {
    console.log('save winner to sp called', winner);
    axios.post('/sp', {
      winner: winner
    });
  }

  handleWinner(ind, name) {
    if (ind + 1 === this.state.currentNumber) {
      console.log('winner is', name)
      this.setState({
        showWinner: true,
        winner: name
      }, () => {
        this.saveWinnerToSpreadsheet(this.state.winner);
      });
    }
  }

  render() {

    let copy = this.state.studentList.slice();
    let randomList = randomize(copy);

    if (this.state.showWinner) {
      return (
        <div style={{fontSize:"100px"}}>
          PRESENTER IS {this.state.winner} ON {this.state.nextDay}
        </div>
      )
    }
    return (
      <div style={{textAlign: 'center', margin: '25px'}}>
        <h1>Random Picker</h1>
        <div className="mainBody" style={{display: 'inline-block'}}>

          <div className="pickNumber">  
            <select value={this.state.value} onChange={this.handleNumberChange}>
              {students.map((name, ind) => {
                return (
                  <option value={ind + 1}>{ind + 1}</option>
                )
              })}
            </select>
            <button className="add" onClick={this.randomizeClass}>Randomize Class</button>
          </div>

          <div className="container" style={{width: '250px', padding:'30px', fontSize: '20px', fontStyle: 'Helvetica'}}>
            <div style={{float:'left'}}>
              <div className="numbersList">
                {students.map((randItem, ind) => {
                  return (
                    <div key={ind} style={this.state.currentNumber === (ind + 1) ? {color: 'blue'} : {color:'red'}}>
                        {ind+1}
                      </div>
                    )
                  })}
              </div>
            </div>
            
            {this.state.showNormal ? 
              <div className="normalNames" style={{float:'right'}}>
                {!this.state.showNames ? null : 
                students.map((randItem, ind) => {
                  return (
                    <div>{randItem}</div>
                  )
                })}
              </div>
              :

              <div className="randomizedNames" style={{float:'right'}}>
                {!this.state.showNames ? null : 
                randomList.map((randItem, ind) => {
                  return (
                    <NameItem handleWinner={this.handleWinner} keyInd={ind} item={randItem} wait={1000 * ind} />
                    )
                  })}
              </div>
            }   

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
