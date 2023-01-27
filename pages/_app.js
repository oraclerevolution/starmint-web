import Layout from '../components/layouts/Layout';
import { UserContextProvider } from '../modules/context/userContext';
import '../styles/globals.css';
// import {Provider} from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    
    <UserContextProvider >
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
    
  )
}

export default MyApp;
