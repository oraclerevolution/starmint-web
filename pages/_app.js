import Layout from '../components/layouts/Layout';
import { UserContextProvider } from '../modules/context/userContext';
import '../styles/globals.css';
// import {Provider} from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
