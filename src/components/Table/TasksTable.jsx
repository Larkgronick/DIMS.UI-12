import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit, openConfirmation, selectItem } from '../../store/actions/modalAction';
import { Button } from '../Buttons/Button/Button';
import { updateData } from '../../services/services';
import { convertDate } from '../../services/helpers';
import dragIcon from '../../assets/images/dragIcon.png';

export function TasksTable() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.main);

  const [rows, updateRows] = useState(tasks);
  const [isDragged, setDragged] = useState(false);

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const confirm = (page) => (e) => {
    dispatch(selectItem(e, 'selected'));
    dispatch(openConfirmation(page));
  };

  const handleOnDragEnd = (result) => {
    setDragged(false);
    if (result.destination) {
      const items = Array.from(rows);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateRows(items);
      updateData(items, 'tasks');
    }
  };

  const handleOnDragStart = () => {
    setDragged(true);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
      <Droppable droppableId='tasks'>
        {(dropProvided) => (
          <tbody className='table-body' {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
            {rows.map(({ id, name, start, deadline }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(dragProvided) => (
                  <tr
                    className={isDragged ? 'dragged' : 'row'}
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                  >
                    <td className='tasks-adapt name'>
                      <img className='drag-icon' src={dragIcon} {...dragProvided.dragHandleProps} alt='drag-icon' />
                      {name}
                    </td>
                    <td className='tasks-adapt'>{convertDate(start)}</td>
                    <td className='tasks-adapt'>{convertDate(deadline)}</td>
                    <td className='tasks-adapt actions'>
                      <Button onClick={edit(true, 'selected')} className='button dev'>
                        Edit
                      </Button>
                      <Button onClick={confirm('tasks')} className='button danger'>
                        Delete
                      </Button>
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
}
