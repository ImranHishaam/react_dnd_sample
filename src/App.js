import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './Component/SourceBox';
import TargetBox from './Component/TargetBox';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

class App extends Component {

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
      }, {
        id: 2,
        text: 'Make it generic enough',
      }, {
        id: 3,
        text: 'Write README',
      }, {
        id: 4,
        text: 'Create some examples',
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      }, {
        id: 6,
        text: '???',
      }, {
        id: 7,
        text: 'PROFIT',
      }],
      nextCards: []

    };

  }

  moveCard(dragIndex, item) {

    const { cards, nextCards } = this.state;

    console.log('item', item)

    const dragCard = cards[dragIndex]
    cards.splice(dragIndex, 1);
    nextCards.push(dragCard)

    this.setState({
      cards: cards,
      nextCards: nextCards
    })
  }

  renderCell(props) {
    const { text } = props;

    return (
      <div style={{ ...style }}>
        {text}
      </div>
    );
  }

  render() {
    const { cards, nextCards } = this.state;

    return (
      <div className="col-md-offset-4">
        <div className="container-fluid col-md-12">

          <div className="col-md-2">
            {cards.map((card, i) => (
              <SourceBox
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                renderView={this.renderCell}
              />
            ))}
          </div>

          <div className="col-md-4">
            <TargetBox moveCard={this.moveCard} nextCards={nextCards} renderView={this.renderCell} />
          </div>
        </div>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(App);
