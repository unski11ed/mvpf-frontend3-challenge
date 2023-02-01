import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import styled from '@emotion/styled';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <Head>
        <title>Frontend Challenge 3 | MVPF</title>
        <meta name="description" content="Challange project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={defaultTheme}>
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
          <MainLayoutSidebar>
            <SideNav collapsed={sidebarCollapsed}>
              <SideNavItem
                title="Overview"
                to="/"
                icon={<Image src={navIconOverview} alt="Overview" />}
              />
              <SideNavItem
                title="Widgets"
                to="/widgets"
                icon={<Image src={navIconWidgets} alt="Widgets" />}
              />
              <SideNavItem
                title="Payments"
                to="/payments"
                icon={<Image src={navIconPayments} alt="Payments" />}
              />
              <SideNavItem
                title="Reports"
                to="/reports"
                icon={<Image src={navIconReports} alt="Reports" />}
              />
              <SideNavItem
                title="Settings"
                to="/settings"
                icon={<Image src={navIconSettings} alt="Settings" />}
              />
            </SideNav>
          </MainLayoutSidebar>
          <MainLayoutContent>
            <Component {...pageProps} />
          </MainLayoutContent>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
