import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

      console.log(e.target);
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
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
                  className={activeSuggestion === i + 1 ? 'highlight' : ''}
                >
                  <div className="suggestion-id">{suggestion.id}</div>
                  <div className="suggestion-name">{`${suggestion.name.replace(
                    /userInput/g,
                    `<span>${userInput}</span>`
                  )}`}</div>
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
          {suggestionsListComponent}
        </div>
      </div>
    );
  }
}

export default Search;
