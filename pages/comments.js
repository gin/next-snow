import {Component} from 'react'
import Page from '../components/page'
import fetch from '../lib/fetch'

export default class extends Component {
  static async getInitialProps({query}) {
    return {
      item: await fetch(`/item/${query.id}`)
    }
  }

  render() {
    return (
      <Page>
        {this.props.item.user}
      </Page>
    )
  }
}
