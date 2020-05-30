import React from "react";
import ReactDOM from "react-dom";
import { FaTwitterSquare, FaTumblrSquare } from "react-icons/fa";
import "../src/app.css";

class App extends React.Component {
  state = {
    quote: null,
    author: "Kanye West",
  };

  fetchKanye = () => {
    fetch("https://api.kanye.rest")
      .then((response) => response.json())
      .then((data) => this.setState({ quote: data.quote }));
  };

  authorGen = () => {
    fetch("dummy fetch");
    let authors = ["Kanye West", "Yeezy", "Yeezus", "Ye", "Mr. West", "Pablo"];
    this.setState({
      author: authors[Math.floor(Math.random() * authors.length)],
    });
  };

  handleQuoteGen = () => {
    this.fetchKanye();
    this.authorGen();
  };

  componentDidMount = () => {
    this.fetchKanye();
  };

  render() {
    const { quote, author } = this.state;
    return (
      <QuoteBox>
        <Text quote={quote} author={author}></Text>
        <div id="btn-wrapper">
          <SocialBtn quote={quote}></SocialBtn>
          <QuoteBtn quoteGen={this.handleQuoteGen}></QuoteBtn>
        </div>
      </QuoteBox>
    );
  }
}

const QuoteBox = (props) => {
  return <div id="quote-box">{props.children}</div>;
};

const Text = ({ quote, author }) => {
  return (
    <div>
      <h2 id="text">"{quote}"</h2>
      <p id="author">-{author}</p>
    </div>
  );
};

const QuoteBtn = (props) => {
  return (
    <button id="new-quote" onClick={props.quoteGen}>
      Send It Up
    </button>
  );
};

const SocialBtn = (props) => {
  return (
    <div id="socials-wrapper">
      <a
        id="tweet-quote"
        className="icon-button twitter"
        href={`https://twitter.com/intent/tweet?text=${props.quote}`}
        target="_blank"
      >
        <FaTwitterSquare />
      </a>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
