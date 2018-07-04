import React, { Component } from 'react';
import Img from 'react-image';
import { Card } from 'antd';

const { Meta } = Card;

class CardFilm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titreFilm: props.titreFilm,
      imgFilm: props.imgFilm,
      noteFilm: props.noteFilm,
    };
  }

  render() {
    return (
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<Img src={this.state.imgFilm} />}
      >
        <Meta
          title={this.state.titreFilm}
          description={this.state.noteFilm}
        />
      </Card>
    );
  }
}

export default CardFilm;
