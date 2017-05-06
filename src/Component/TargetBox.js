import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import SourceBox from './SourceBox';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    height: '400px'
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

class TargetBox extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        canDrop: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
    };

    render() {
        const { connectDropTarget, isOver, nextCards, renderView, canDrop } = this.props;
     
       return connectDropTarget(
            <div style={{ ...style }} >
                {nextCards.map((card, i) => (
                    <SourceBox
                        key={card.id}
                        index={i}
                        id={card.id}
                        text={card.text}
                        renderView={renderView}
                    />
                ))}
            </div>
        );
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;


        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        
        // Determine mouse position
        const clientOffset = monitor.getSourceClientOffset();   

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // console.log('apple', hoverClientY, clientOffset, hoverBoundingRect)

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, monitor.getItem());

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

export default DropTarget('Item', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
}))(TargetBox);
