import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';

import {
  MainLayout,
  MainLayoutSidebar,
  MainLayoutNavbar,
  MainLayoutContent,
  AppBar,
} from '@app/components';
import defaultTheme from '@app/theme';

import logoImage from '@public/logo.svg';

function App({ Component, pageProps }: AppProps) {
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
              <Image src={logoImage} alt="Brand name" />
            </AppBar>
          </MainLayoutNavbar>
          <MainLayoutSidebar>Sidebar</MainLayoutSidebar>
          <MainLayoutContent>
            <Component {...pageProps} />
          </MainLayoutContent>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
