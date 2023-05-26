import { cn as bem } from '@bem-react/classname';
import {Link} from "react-router-dom";
import {getRouteMain} from "../../routes";
import BasketTool from "../basket-tool";
import './style.css';
import {memo} from "react";
import {useTranslation} from "../../locales";

function PageTool({sum, amount, onOpen}) {
  const cn = bem('PageTool')
  const {t} = useTranslation();
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={getRouteMain()}>{t('mainLink')}</Link>
      <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
    </div>
  )
}

export default memo(PageTool);