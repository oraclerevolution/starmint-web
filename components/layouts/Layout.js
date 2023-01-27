import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

function Layout({children}) {
  return (
    <div>
      
      <main>
      
        {children}
      </main>
    </div>
  )
}

export default Layout;