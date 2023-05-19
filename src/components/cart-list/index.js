import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import Item from "../item";
import {memo} from "react";
import "./styles.css";


function CartList({items, onDeleteItem}) {

  const cn = bem("CartList");

  return <div className={cn()}>
    {items.map(item => {
      return <div key={item.code} className={cn("item")}>
        <Item item={item} actions={<div className={cn("item-actions")}>
          {item.quantity}
          <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
        </div>} />
      </div>
    })}
  </div>
}

CartList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })),
  onDeleteItem: PropTypes.func
}

export default memo(CartList);