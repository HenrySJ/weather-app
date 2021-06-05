import React, { Component } from 'react'
import '../styles/home.css'

class home extends Component {
  state = {}
  componentDidMount() {
      console.log('hello world')
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
