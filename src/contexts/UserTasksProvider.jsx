import PropTypes from 'prop-types';
import { Component } from 'react';
import { UserTasksContext } from './UserTasksContext';
import { setUserTracks, loadMemberData, saveChanges } from '../services/services';

export class UserTasksProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [],
      userTasks: [],
      userTracks: [],
      isLoading: false,
    };
  }

  loadUserData = async () => {
    loadMemberData()
      .then((res) => {
        const { userData } = res;
        this.setState({
          ...res,
          memberData: userData,
        });
        console.log(res);
      })
      .catch(console.log);
  };

  addUserTasks = (taskId, assigners) => {
    let tracks = [];
    assigners.forEach((id) => {
      const track = {};
      track.userId = id;
      track.taskId = taskId;
      track.trackName = ['My first track...'];
      track.date = ['23.03.11'];
      track.note = ['23.03.11'];
      track.status = 'active';
      tracks = tracks.concat([track]);
    });
    setUserTracks(taskId, tracks);
    this.loadUserData();
  };

  setTaskStatus = (taskNumber, value, index) => {
    const { userTracks } = this.state;
    const newTracks = userTracks.map((el, i) => {
      if (i === index) {
        el.status = value;
      }
      return el;
    });
    this.setState({
      userTracks: newTracks,
    });

    saveChanges(newTracks[taskNumber]);
  };

  saveTrackData = (data, track, subtask, action) => {
    const { userTracks } = this.state;
    const { trackName, note, date, taskId, status, userId } = userTracks[track];
    const newTrack = {};
    const newUserTracks = { ...userTracks };
    newTrack.taskId = taskId;
    newTrack.status = status;
    newTrack.userId = userId;
    if (action === 'save') {
      newTrack.trackName = trackName.concat([data.trackName]);
      newTrack.note = note.concat([data.note]);
      newTrack.date = date.concat([data.date]);
    } else if (action === 'edit') {
      newTrack.trackName = trackName;
      newTrack.trackName[subtask] = data.trackName;
      newTrack.date = date;
      newTrack.date[subtask] = data.date;
      newTrack.note = note;
      newTrack.note[subtask] = data.note;
    } else if (action === 'delete') {
      newTrack.trackName = trackName.filter((el, i) => i !== subtask);
      newTrack.note = note.filter((el, i) => i !== subtask);
      newTrack.date = date.filter((el, i) => i !== subtask);
    }

    newUserTracks[track] = newTrack;
    this.setState({
      userTracks: newUserTracks,
    });
    saveChanges(newTrack);
  };

  showUserTasks = async (e) => {
    this.setState({ isLoading: true });
    const { userData, userTasks, userTracks } = await loadMemberData(e);
    this.setState({
      memberData: userData,
      userTasks,
      userTracks,
      isLoading: false,
    });
  };

  render() {
    const { memberData, userTasks, userTracks, isLoading } = this.state;
    const { addUserTasks, setTaskStatus, showUserTasks, saveTrackData } = this;
    const value = {
      memberData,
      userTasks,
      userTracks,
      isLoading,
      addUserTasks,
      setTaskStatus,
      showUserTasks,
      saveTrackData,
    };
    const { children } = this.props;
    return <UserTasksContext.Provider value={value}>{children}</UserTasksContext.Provider>;
  }
}

UserTasksProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
