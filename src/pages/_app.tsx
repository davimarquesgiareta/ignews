import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { useSession } from 'next-auth/client'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {

  const [session] = useSession()

 
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header/>
       <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
