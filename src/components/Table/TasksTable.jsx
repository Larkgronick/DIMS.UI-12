import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit, openConfirmation, selectItem } from '../../store/actions/modalAction';
import { updateData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';
import { convertDate, getNewOrder } from '../../services/helpers';
import dragIcon from '../../assets/images/dragIcon.png';

export function TasksTable() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.main);

  const [rows, updateRows] = useState(tasks);
  const [isDragged, setDragged] = useState(false);

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const update = (newData, field) => dispatch(updateData(newData, field));

  const confirm = (page) => (e) => {
    dispatch(selectItem(e, 'selected'));
    dispatch(openConfirmation(page));
  };

  useEffect(() => {
    updateRows(tasks);
  }, [tasks]);

  const handleOnDragEnd = (result) => {
    setDragged(false);
    if (result.destination) {
      update(getNewOrder(rows, result), 'tasks');
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
                    <td className='name'>
                      <img className='drag-icon' src={dragIcon} {...dragProvided.dragHandleProps} alt='drag-icon' />
                      <p className='adapt'>Task:</p>
                      {name}
                    </td>
                    <td>
                      <p className='adapt'>Start:</p>
                      {convertDate(start)}
                    </td>
                    <td>
                      <p className='adapt'>Deadline:</p>
                      {convertDate(deadline)}
                    </td>
                    <td className='actions'>
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
