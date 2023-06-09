import './style.css';
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import {memo} from "react";

function AuthMessage(props) {
  const cn = bem('AuthMessage');
  return (
    <div className={cn()}>
      <span>
        <Link className={cn('link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать
      </span>
    </div>
  )
}

export default memo(AuthMessage);