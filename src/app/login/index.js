import PageLayout from "../../components/page-layout";
import HeaderMain from "../../containers/header-main";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";


function Login(props) {
  const {t} = useTranslate();

  const store = useStore();

  const select = useSelector(state => ({
    error: state.loginForm.error,
    fields: state.loginForm.fields,
    waiting: state.loginForm.waiting
  }));

  const callbacks = {
    onSubmit: useCallback(() => {
      store.actions.loginForm.submit()
    }, [store]),
    onChangeField: useCallback((key, value) => {
      store.actions.loginForm.changeField(key, value)
    }, [store])
  }

  return (
    <PageLayout>
      <HeaderMain />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation/>
      <LoginForm
        isLoading={select.waiting}
        fields={select.fields}
        onChangeField={callbacks.onChangeField}
        error={select.error}
        onSubmit={callbacks.onSubmit}
      />
    </PageLayout>
  )
}

export default memo(Login);