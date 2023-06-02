import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import {memo} from "react";

function Error(props) {
  const cn = bem('Error');
  return <div className={cn()}>
    <span>{props.message}</span>
  </div>
}

Error.propTypes = {
  message: PropTypes.node,
}

export default memo(Error);