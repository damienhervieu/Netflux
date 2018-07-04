import React, { Component } from 'react';

const listFilmStart = [{ name: 'superfilm1' }];

class BoxLittle extends Component {
  constructor() {
    super();
    this.state = {
      listFilm: listFilmStart,
    };
  }

  setList = () => {
    this.setState({ listFilm: [{ name: 'superfilm1' }, { name: 'superfilm2' }, { name: 'superfilm3' }] });
  }

  render() {
    const documentListFilm = this.state.listFilm.map(item => (
      <li key={item.name}>{item.name}</li>
    ));
    return (
      <div>
        <button onClick={this.setList} />
        <ul>
          {documentListFilm}
        </ul>
      </div>
    );
  }
}

export default BoxLittle;
