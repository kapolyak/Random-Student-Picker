import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';

class NameItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showName: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showName: true
      })
      console.log('key:', this.props.keyInd)
      this.props.handleWinner(this.props.keyInd, this.props.item);
    }, this.props.wait)
  }

  render() {
    console.log('key in render:', this.props.keyInd)
    return (
      // <CSSTransition
      //   in={this.state.showName}
      //   timeout={300}
      //   classNames="message"
      //   // unmountOnExit
      //   // onExited={() => {
      //   //   this.setState({
      //   //     showValidationButton: true,
      //   //   });
      //   // }}
      // >
      
      <div>
        {!this.state.showName ? null : 
          this.props.item
        }
      </div>
      
      // </CSSTransition>
    )
  }
}

export default NameItem;