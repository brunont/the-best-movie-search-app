import React from "react";
import Client from "./Client";
import Pagination from "rc-pagination";

class MovieSearch extends React.Component {
  state = {
    movies: [],
    showPagination: false,
    searchValue: "",
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
    visiblePages: 3
  };

  handleSearchChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSearchSubmit = e => {
    Client.search(this.state.searchValue, this.state.page, movies => {
      this.setState({
        showPagination: (movies.total > 10) ? true : false,
        movies: movies.data,
        perPage: movies.per_page,
        total: movies.total,
        totalPages: movies.total_pages
      });
    });
    e.preventDefault();
  };

  handlePageChange = (newPage) => {
    Client.search(this.state.searchValue, newPage, movies => {
      this.setState({
        showPagination: (movies.total > 10) ? true : false,
        movies: movies.data,
        page: movies.page.parseInt,
        perPage: movies.per_page,
        total: movies.total,
        totalPages: movies.total_pages
      });
    });
  };

  render() {
    const { showPagination, movies } = this.state;
    const paginationVisible = showPagination ? {} : { visibility: "hidden" };

    const movieRows = movies.map((movie, idx) => (
      <div className="col-xs-6 col-md-3 movie" key={idx}>
        <div className="movie-content">
          <div className="thumbnail">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : require("./images/defaultPoster.jpg")} alt={"Movie poster of " + movie.Title} />
            <div className="caption">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <a className="imdb_link" target="_blank" href={'http://www.imdb.com/title/' + movie.imdbID}>
                <img className="imdb_logo" src={require("./images/cinemaImdb.jpg")} alt={"Imdb logo for link " + movie.Title} />
              </a>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div id="movie-search">
        <form onSubmit={this.handleSearchSubmit}>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="input-group search">
                  <div className="input-group-addon">
                    <i className="glyphicon glyphicon-search" />
                  </div>
                  <input
                    className="form-control prompt"
                    type="text"
                    placeholder="Search movies..."
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                  />
                  <span className="input-group-btn">
                    <input type="submit" value="Search" className="btn btn-primary" />
                  </span>
              </div>
            </div>
          </div>
        </form>
        <br/>
        <br/>
        <div className="results">
          <div className="row">
            {movieRows}
          </div>
        </div>
        <Pagination
          style={paginationVisible}
          total={this.state.total}
          current={this.state.page}
          pageSize={this.state.perPage}
          onChange={this.handlePageChange}
          className={"pagination"}
        />
      </div>
    );
  }
}

export default MovieSearch;
