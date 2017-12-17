
import { shallow } from 'enzyme';
import React from 'react';
import MovieSearch from './MovieSearch';
import Client from './Client';

jest.mock('./Client');

describe('MovieSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MovieSearch />,
    );
  });

  afterEach(() => {
    Client.search.mockClear();
  });

  it('should display zero rows', () => {
    expect(
      wrapper.find('div img').length,
    ).toEqual(0);
  });

  describe('user populates search field', () => {
    const value = 'rock';

    beforeEach(() => {
    	const fakeEvent = { preventDefault: () => {} };
      const input = wrapper.find('input').first();
      const form = wrapper.find('form').first();
      input.simulate('change', {
        target: { value },
      });
      form.simulate('submit', fakeEvent);
    });

    it('should update state property `searchValue`', () => {
      expect(
        wrapper.state().searchValue,
      ).toEqual(value);
    });

    it('should call `Client.search() with `value`', () => {
      const invocationArgs = Client.search.mock.calls[0];
      expect(
        invocationArgs[0],
      ).toEqual(value);
    });

    describe('and API returns results', () => {
      const movies = [
				{
				  page: "1",
				  per_page: 10,
				  total: 1,
				  total_pages: 1,
				  data: [
				    {
				      Poster: "http://ia.media-imdb.com/images/M/MV5BMjAxMTIwMzA0Ml5BMl5BanBnXkFtZTcwMjg1MDI2NA@@._V1_SX300.jpg",
				      Title: "Take a Walk on the Dark Side: Rock and Roll Myths, Legends, and Curses",
				      Type: "movie",
				      Year: 2008,
				      imdbID: "tt1849108"
				    }
				  ]
				}
      ];
      beforeEach(() => {
        const invocationArgs = Client.search.mock.calls[0];
        const cb = invocationArgs[2];
        cb(movies[0]);
        wrapper.update();
      });

      it('should set the state property `movies`', () => {
        expect(
          wrapper.state().movies,
        ).toEqual(movies[0].data);
      });

      it('should display one movie', () => {
        expect(
          wrapper.find('div.movie').length,
        ).toEqual(1);
      });

      it('should render the description the movie', () => {
        expect(
          wrapper.html(),
        ).toContain(movies[0].data[0].Title);
      });
    });
  });
});
