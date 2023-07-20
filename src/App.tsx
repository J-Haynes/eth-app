import React from 'react'
import './App.css'

import EthHeader from './components/Header'
import EthOverview from './components/Eth-Overview'
import SearchBar from './components/Search'

function App() {
  return (
    <div>
      <EthHeader></EthHeader>
      <EthOverview></EthOverview>
      <SearchBar></SearchBar>
    </div>
  )
}

export default App
