import PageLayout from "../../components/page-layout";
import HeaderMain from "../../containers/header-main";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {memo} from "react";
import useTranslate from "../../hooks/use-translate";
import ProfileDetails from "../../components/profile-details";
import useSelector from "../../hooks/use-selector";

function Profile(props) {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    profile: {
      name: state.session.authData?.profile?.name,
      email: state.session.authData?.email,
      phone: state.session.authData?.profile?.phone
    }
  }))

  return (
    <PageLayout>
      <HeaderMain />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation/>
        <ProfileDetails data={select.profile} />
    </PageLayout>
  )
}

export default memo(Profile);