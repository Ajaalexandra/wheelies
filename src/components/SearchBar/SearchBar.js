import React, { Component } from "react";
import "./SearchBar.css";

//using third party library Algolia

export default class SearchBar extends Component {
  componentDidMount() {
    const client = window.algoliasearch(
      "ZBTDNLTEA0",
      "55f05e2829b6cfdf26c5daf1084b1146"
    );
    const index = client.initIndex("motorcycles");
    window
      .autocomplete("#search-input", { hint: false }, [
        {
          source: window.autocomplete.sources.hits(index, { hitsPerPage: 8 }),
          displayKey: "my_attribute",
          templates: {
            suggestion: function(suggestion) {
              return (
                '<div class="name">' +
                suggestion._highlightResult.brand.value +
                " " +
                suggestion._highlightResult.model.value +
                "</div>"
              );
            }
          }
        }
      ])
      .on("autocomplete:selected", function(event, suggestion, dataset) {
        console.log("Selected Item: ", suggestion, dataset);
        console.log("Desc: ", suggestion);
        window.location.replace(
          `http://localhost:3000/details/${suggestion.id}`
        );
      });
  }

  render() {
    return <input id="search-input" type="text" />;
  }
}
