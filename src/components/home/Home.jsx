import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import Header from "../common/header/Header"
import Chatbot from "../chatbot/chatbot"

const Home = () => {
  return (
    <>
     <Header />
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
      <Chatbot/>
    </>
  )
}

export default Home
