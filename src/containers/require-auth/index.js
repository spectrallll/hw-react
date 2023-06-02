import {Navigate, useLocation} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import PropTypes from "prop-types";


// Возможно стоит перенести компонент в app?
function RequireAuth({ children, href = '/login' }) {
    const location = useLocation();

    const store = useStore();

    const select = useSelector(state => ({
        session: state.session
    }));

    useInit(async () => {
      if (!select.session.isAuth) {
        await store.actions.session.self();
      }
    })

    if (select.session.waiting) {
        return null;
    }

    if (select.session.isAuth) {
        return children;
    }

    return <Navigate to={href} state={{from: location}} replace />
}

RequireAuth.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
}

export default RequireAuth;