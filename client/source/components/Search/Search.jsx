import React, { Component } from 'react';
import renderHTML from 'react-render-html';

import './search.scss';

class Search extends Component {
  static propTypes = {};
  static defaultProperty = {
    suggestions: [],
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: '',
  };

  onChange = (e) => {
    let { suggestions } = this.props;
    const userInput = e.target.value;

    const filteredSuggestions = suggestions.filter((suggestion) => {
      return (
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1 ||
        suggestion.id.indexOf(userInput) > -1 ||
        suggestion.address.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.target.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      // userInput: e.currentTarget.innerText,
      userInput: e.target.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].name,
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  getName = (suggestion) => {
    const { userInput } = this.state;
    const regEx = new RegExp(userInput, 'g');
    let text = (
      <div className="suggestion-name">{`${suggestion.name.replace(
        regEx,
        `<span className="highlight">${userInput}</span>`
      )}`}</div>
    );
    return text.props.children;
  };

  handleActiveSuggestion = (i) => {
    this.setState({ activeSuggestion: i + 1 });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput },
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestion">
            {filteredSuggestions.map((suggestion, i) => {
              return (
                <li
                  key={i}
                  onClick={onClick}
                  onMouseOver={() => this.handleActiveSuggestion(i)}
                  className={activeSuggestion === i + 1 ? 'highlight' : ''}
                >
                  <div className="suggestion-id">{suggestion.id}</div>
                  {renderHTML(this.getName(suggestion))}
                  <div className="suggestion-address">{`${suggestion.address} Pincode: ${suggestion.pincode}`}</div>
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = <div className="no-suggestions">No User Found</div>;
      }
    }
    return (
      <div className="search-wrapper">
        <div className="search-text">
          <input
            type="text"
            placeholder="Search users by ID, address, name"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {userInput ? (
            <img
              className="search-close"
              src="public/assets/images/close-icon-caret.svg"
              alt="close.svg"
              onClick={this.clearInput}
            />
          ) : (
            <img src="/assets/images/search-grey-icon.svg" alt="search-grey-icon.svg" />
          )}
          {suggestionsListComponent}
        </div>
      </div>
    );
  }
}

export default Search;
