import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import PageTool from "../../components/page-tool";
import {useParams} from "react-router-dom";
import ProductDetails from "../../components/product-details";


function Product(props) {

  const store = useStore();

  const { id } = useParams();

  const select = useSelector(state => ({
    product: state.product.data,
    sum: state.basket.sum,
    amount: state.basket.amount
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAddToCart: useCallback((id) => store.actions.basket.addToBasket(id), [store])
  }

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  if (!select.product) return null;

  return (
    <PageLayout>
      <Head title={select.product.title}/>
      <PageTool sum={select.sum} amount={select.amount} onOpen={callbacks.openModalBasket} />
      <ProductDetails item={select.product} onAdd={callbacks.onAddToCart} />
    </PageLayout>
  )
}

export default Product;