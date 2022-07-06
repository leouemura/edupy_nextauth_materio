import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import themeConfig from '../configs/themeConfig'
import { SessionProvider } from 'next-auth/react'
import ThemeComponent from '../@core/theme/ThemeComponent'
import type { EmotionCache } from '@emotion/cache'
import UserLayout from '../layouts/UserLayout'
import '../styles/globals.css'
import { SettingsConsumer, SettingsProvider } from '../@core/context/settingsContext'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}
function MyApp({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{`${themeConfig.templateName} - learn python`}</title> /** TODO: change this */
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SettingsProvider>

        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </SessionProvider>
  )
}

export default MyApp
