import { images } from '../../services/constants';

export function AboutTable() {
  return (
    <tbody className='table-body'>
      <tr className='row'>
        <td>
          <p className='description'>
            <b>Dev Incubator Management system</b> - application, that allows create, edit, and manage tasks for
            participants of Dev Incubator. It has flexible interface and a certain set of capabilities depending on the
            role of the participant (student, mentor and administrator).
          </p>
        </td>
      </tr>
      <tr className='row'>
        <td>
          <p>
            Developed by <b>Larkgronick</b>
          </p>
          <a href='http://devincubator.by/'>
            <img src={images.incubatorIcon} alt='incubator-icon' />
          </a>
          <a href='https://larkgronick.github.io/nikita-zhavoronkov-cv/'>
            <img src={images.larkgronickIcon} alt='larkgronick-icon' />
          </a>

          <p>
            <b>Dev Incubator</b>, 2021
          </p>
          <p>© All rights reserved.</p>
        </td>
      </tr>
    </tbody>
  );
}
