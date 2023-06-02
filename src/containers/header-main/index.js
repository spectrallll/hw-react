import Header from "../../components/header";
import useStore from "../../hooks/use-store";
import {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import UserPanel from "../../components/user-panel";
import useTranslate from "../../hooks/use-translate";


function HeaderMain(props) {

  const store = useStore();

  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    session: state.session
  }))

  const callbacks = {
    onClick: useCallback(() => navigate('/login'), [navigate]),
    onLogout: useCallback(() => store.actions.session.deleteSession(), [store])
  }

  const renders = {
    right: useCallback(() => {
      if (select.session.isAuth) {
        return <UserPanel t={t} onLogout={callbacks.onLogout} authData={select.session.authData} />
      } else {
        return <button onClick={callbacks.onClick}>{t('login')}</button>
      }
    }, [select.session, t])
  }

  return <Header right={renders.right()} />
}

export default HeaderMain;