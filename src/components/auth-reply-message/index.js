import './style.css';
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import {memo} from "react";
import PropTypes from "prop-types";

function AuthReplyMessage(props) {
  const cn = bem('AuthReplyMessage');
  return (
    <div className={cn()}>
      <span>
        <Link className={cn('link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность ответить
        <button onClick={props.onClose} className={cn('back')}>Отмена</button>
      </span>
    </div>
  )
}

AuthReplyMessage.propTypes = {
  onClose: PropTypes.func
}

AuthReplyMessage.defaultArgs = {
  onClose: () => {}
}

export default memo(AuthReplyMessage);