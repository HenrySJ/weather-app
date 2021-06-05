import React, { Component } from 'react'
import http from '../services/httpService'
import '../styles/home.css'

class home extends Component {
  state = {}
   async componentDidMount() {
      const { data } = await http.get(`${http.url}`)
      console.log(data)
  }
  render() {
    return (
        <main>
            <div className="background"/>
            <section className="content">
                <article className="glass">
                    <section id="top"></section>
                    <section id="bottom">
                    </section>
                </article>
            </section>
        </main>
    )
  }
}

export default home
