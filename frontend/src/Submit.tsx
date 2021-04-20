import React from "react";


type MyProps = {
  message: string;
};

type MyState = {
  text: string;
};

export class SubmitPage extends React.Component<MyProps, MyState> {
  state: MyState = {
    text: "Begin writing here...",
  };

  static defaultProps = {
    message: ""
  }

  constructor(props: MyProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert('A name was submitted: ' + this.state.text);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <textarea className="max-w-full w-full h-48 p-3.5 bg-gray-50" value={this.state.text} onChange={this.handleChange} />
        <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full content-end" />
      </form>
    );
  }
}

export default SubmitPage