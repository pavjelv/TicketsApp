import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {userService} from "../Services/UserService";


class AddAnswer extends Component<any, {answer: string}> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value: string) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    if (!userService.isAuthenticated() || userService.hasRole("User")) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <input
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(AddAnswer);