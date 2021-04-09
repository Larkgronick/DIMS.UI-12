import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit, selectItem, openConfirmation } from '../../store/actions/modalAction';
import { showUserTasks } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';
import { updateData } from '../../services/services';
import { convertDate } from '../../services/helpers';
import dragIcon from '../../assets/images/dragIcon.png';

export function MembersTable() {
  const dispatch = useDispatch();
  const { role, members } = useSelector((state) => state.main);

  const [rows, updateRows] = useState(members);
  const [isDragged, setDragged] = useState(false);

  const isAdmin = role === 'Admin';

  const edit = (isNew, category) => (e) => dispatch(openEdit(e, isNew, category));

  const show = (e) => dispatch(showUserTasks(e));

  const confirm = (page) => (e) => {
    dispatch(selectItem(e, 'subtask'));
    dispatch(openConfirmation(page));
  };

  const handleOnDragEnd = (result) => {
    setDragged(false);
    if (result.destination) {
      const items = Array.from(rows);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateRows(items);
      updateData(items, 'members');
    }
  };

  const handleOnDragStart = () => {
    setDragged(true);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
      <Droppable droppableId='members'>
        {(dropProvided) => (
          <tbody className='table-body' {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
            {rows.map(({ id, name, lastName, direction, email, education, mobilePhone, startDate }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(dragProvided) => (
                  <tr
                    className={isDragged ? 'dragged' : 'row'}
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                  >
                    <td className='name members-adapt'>
                      <img className='drag-icon' src={dragIcon} {...dragProvided.dragHandleProps} alt='drag-icon' />
                      <span>{`${name} ${lastName}`}</span>
                      <span className='attention'>{` ${direction}`}</span>
                    </td>
                    <td className='members-adapt'>{email}</td>
                    <td className='members-adapt'>{education}</td>
                    <td className='members-adapt'>{mobilePhone}</td>
                    <td className='members-adapt'>{convertDate(startDate)}</td>
                    <td className='members-adapt actions'>
                      <Link to='/progress'>
                        <Button onClick={show} className='button dev'>
                          Progress
                        </Button>
                      </Link>
                      <Link to='/user-tasks'>
                        <Button onClick={show} className='button tasks'>
                          Tasks
                        </Button>
                      </Link>
                      {isAdmin ? (
                        <span>
                          <Button onClick={edit(true, 'selected')} className='button edit'>
                            Edit
                          </Button>
                          <Button onClick={confirm('members')} className='button danger'>
                            Delete
                          </Button>
                        </span>
                      ) : null}
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
