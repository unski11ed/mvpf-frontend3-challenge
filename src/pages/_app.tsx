import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import {
  MainLayout,
  MainLayoutSidebar,
  MainLayoutNavbar,
  MainLayoutContent,
  AppBar,
  SideNav,
  SideNavItem,
  UnstyledButton,
  Box,
} from '@app/components';
import LoggedInUser from '@app/features/loggedInUser';
import defaultTheme from '@app/theme';
import config from '@app/config';
import initMocks from '@app/mocks';

import logoImage from '@public/logo.svg';

import navIconOverview from '@public/nav-icon-overview.svg';
import navIconPayments from '@public/nav-icon-payments.svg';
import navIconReports from '@public/nav-icon-reports.svg';
import navIconSettings from '@public/nav-icon-settings.svg';
import navIconWidgets from '@public/nav-icon-widgets.svg';
import iconSidebar from '@public/icon-sidebar.svg';

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
`;

function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('common');
  const [mocksInitialized, setMocksInitialized] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );

  const renderContent = config.apiMocking ? mocksInitialized : true;

  useEffect(() => {
    if (config.apiMocking) {
      initMocks().then(() => setMocksInitialized(true));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Frontend Challenge 3 | MVPF</title>
        <meta name="description" content="Challange project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {renderContent && (
        <ThemeProvider theme={defaultTheme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <MainLayout>
                <MainLayoutNavbar>
                  <AppBar>
                    <LogoContainer>
                      <Image src={logoImage} alt="Brand name" />
                      <UnstyledButton
                        type="button"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      >
                        <Image src={iconSidebar} alt="Toggle sidebar" />
                      </UnstyledButton>
                    </LogoContainer>

                    <LoggedInUser />
                  </AppBar>
                </MainLayoutNavbar>
                <MainLayoutSidebar collapsed={sidebarCollapsed}>
                  <SideNav collapsed={sidebarCollapsed}>
                    <SideNavItem
                      title={t('sideNav.overview')}
                      to="/"
                      icon={
                        <Image
                          src={navIconOverview}
                          alt={t('sideNav.overview')}
                        />
                      }
                    />
                    <SideNavItem
                      title={t('sideNav.widgets')}
                      to="/widgets"
                      icon={
                        <Image
                          src={navIconWidgets}
                          alt={t('sideNav.widgets')}
                        />
                      }
                    />
                    <SideNavItem
                      title={t('sideNav.payments')}
                      to="/payments"
                      icon={
                        <Image
                          src={navIconPayments}
                          alt={t('sideNav.payments')}
                        />
                      }
                    />
                    <SideNavItem
                      title={t('sideNav.reports')}
                      to="/reports"
                      icon={
                        <Image
                          src={navIconReports}
                          alt={t('sideNav.reports')}
                        />
                      }
                    />
                    <SideNavItem
                      title={t('sideNav.settings')}
                      to="/settings"
                      icon={
                        <Image
                          src={navIconSettings}
                          alt={t('sideNav.settings')}
                        />
                      }
                    />
                  </SideNav>
                </MainLayoutSidebar>
                <MainLayoutContent>
                  <Component {...pageProps} />
                </MainLayoutContent>
              </MainLayout>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      )}
    </>
  );
}

export default appWithTranslation(App);
