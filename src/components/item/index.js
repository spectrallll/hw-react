import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {formatPrice} from "../../utils";

function Item(props){
  const cn = bem("Item")
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <span className={cn('price')}>{formatPrice(props.item.price)}</span>
        {props.actions}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  actions: PropTypes.node
};

export default React.memo(Item);
