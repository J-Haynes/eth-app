import React from 'react'
import './App.css'

import EthHeader from './components/Header'
import EthOverview from './components/Eth-Overview'
import SearchBar from './components/Search'
import Footer from './components/Footer'
import EthContainer from './components/Eth-Container'

function App() {
  return (
    <div>
      <EthHeader></EthHeader>
      <EthOverview></EthOverview>
      <SearchBar></SearchBar>
      <EthContainer></EthContainer>
      <Footer></Footer>
    </div>
  )
}

export default App
