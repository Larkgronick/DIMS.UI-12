import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalContext } from './ModalContext';
import { getIndex } from '../services/helpers';

export class ModalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      edit: false,
      selected: 0,
      track: 0,
      subtask: 0,
    };
  }

  selectItem = (e, field) => {
    this.setState({
      [field]: getIndex(e),
    });
  };

  openEdit = (e, field) => {
    this.setState({
      openModal: true,
    });
    if (field) {
      this.setState({
        edit: true,
        [field]: getIndex(e),
      });
    }
  };

  closeEdit = () => {
    this.setState({
      edit: false,
      openModal: false,
    });
  };

  editTrack = (e) => {
    this.setState({ edit: true });
    this.selectItem(e, 'subtask');
    this.openEdit();
  };

  render() {
    const { edit, openModal, selected, track, subtask } = this.state;
    const { selectItem, openEdit, closeEdit, editTrack } = this;
    const value = {
      edit,
      openModal,
      selectItem,
      openEdit,
      closeEdit,
      editTrack,
      selected,
      track,
      subtask,
    };
    const { children } = this.props;
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
  }
}

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
