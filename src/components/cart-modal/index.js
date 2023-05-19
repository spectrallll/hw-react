import Modal from "../modal";
import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import CartList from "../cart-list";
import "./style.css";


function CartModal(props) {
  const cn = bem("CartModal")
  return <Modal title="Корзина" onClose={props.onClose} isOpen={props.isOpen}>
    <CartList onDeleteItem={props.onDeleteItem} items={props.list} />
    <div className={cn("footer")}>
      <span>Итого</span> <span>{props.totalPrice}</span>
    </div>
  </Modal>
}

export default memo(CartModal);

CartModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  list: PropTypes.array,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.string
}

CartModal.defaultArgs = {
  onClose: () => {},
  onDeleteItem: () => {},
}