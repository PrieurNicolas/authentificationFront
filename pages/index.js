import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Authentification</title>
        <meta name="description" content="Brief Simplon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        <h1>Acceuil Works !</h1>
      </main>
    </div>
  )
}
