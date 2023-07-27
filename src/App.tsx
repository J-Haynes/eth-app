import React, { useState } from 'react'
import './App.css'

import EthHeader from './components/Header'
import EthOverview from './components/Eth-Overview'
import SearchBar from './components/Search'
import Footer from './components/Footer'
import EthContainer from './components/Eth-Container'

function App() {
  const [ethPrice, setEthPrice] = useState(0)

  return (
    <div>
      <EthHeader></EthHeader>
      <EthOverview setEthPrice={setEthPrice}></EthOverview>
      <SearchBar></SearchBar>
      <EthContainer ethPrice={ethPrice}></EthContainer>
      <Footer></Footer>
    </div>
  )
}

export default App
