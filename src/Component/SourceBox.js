import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      containerName: props.containerName
    };
  },
};

class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const { isDragging, connectDragSource, renderView } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div style={ [opacity] }>
        {renderView(this.props)}
      </div>
    );
  }
}

export default DragSource('Item', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Card)
