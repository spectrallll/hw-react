import {memo, useCallback, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function AddReplyForm(props) {
  const cn = bem('ReplyForm');
  const [value, setValue] = useState('');

  const callbacks = {
    onChange: (e) => setValue(e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit(value);
    }
  }

  return <form onSubmit={callbacks.onSubmit} className={cn()}>
    <span className={cn('label')}>Новый ответ</span>
    <textarea value={value} onChange={callbacks.onChange} className={cn('textarea')} />
    <div className={cn('actions')}>
      <button type='submit' className={cn('button')}>Отправить</button>
      <button onClick={props.onClose} type='button' className={cn('button')}>Отмена</button>
    </div>
  </form>
}

AddReplyForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

AddReplyForm.defaultArgs = {
  onClose: () => {},
  onSubmit: () => {}
}

export default memo(AddReplyForm)