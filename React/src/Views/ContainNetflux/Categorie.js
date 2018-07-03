import React, { Component } from 'react';

import CardFilm from '../../Component/CardFilm';

class Categorie extends Component {
  constructor() {
    super();
    this.state = {
      listFilm: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.match.params.type === 'comedie') {
      this.setList('comedie');
    }
  }

  setList = () => {
    this.setState({
      listFilm: [
        {
          idFilm: 1,
          titreFilm: 'film 1',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '5/10',
        },
        {
          idFilm: 2,
          titreFilm: 'film 2',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '3/10',
        },
        {
          idFilm: 3,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
        {
          idFilm: 4,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
        {
          idFilm: 5,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
        {
          idFilm: 6,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
        {
          idFilm: 7,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
        {
          idFilm: 8,
          titreFilm: 'film 3',
          imgFilm: '../../../ressources/img/img_exemple.jpg',
          noteFilm: '4/10',
        },
      ],
    });
  }

  render() {
    return (
      <div className="RowCards">
        {this.state.listFilm.map(item => (
          <CardFilm
            key={item.id}
            titreFilm={item.titreFilm}
            imgFilm={item.imgFilm}
            noteFilm={item.noteFilm}
          />
    ))}
      </div>
    );
  }
}

export default Categorie;
