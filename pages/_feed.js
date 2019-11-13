import {Component} from 'react'
import Link from 'next/link'
import fetch from '../lib/fetch'
import Page from '../components/page'

const Feed = ({feed}) => (
  <li>
    <span className='points'>{feed.points || 1}</span>
    <span>
      <div>
        <a href='{feed.url}' target='_blank'>{feed.title}</a>
      </div>
      <div>
        <span>
          <Link href={`/user?id=${feed.user}`}>
            <a>{feed.user}</a>
          </Link>
        </span>
        {feed.user && <span> | </span>}
        <span>
          <Link href={`/comments?id=${feed.id}`}>
            <a>{feed.comments_count || 0} {feed.comments_count !== 1 ? 'comments' : 'comment'}</a>
          </Link>
        </span>
      </div>
    </span>
    <style jsx>{`
      li {
        color: #777;
        list-style-type: none;
        position: relative;
        padding: 20px 30px 20px 80px;
        border-bottom: 1px solid #eee;
        line-height: 20px;
      };
      .points {
        font-size: 18px;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: 0;
        width: 80px;
        text-align: center;
        //margin-top: -10px;
        line-height: 0px;
      };
    `}</style>
  </li>
)
const Feeds = ({feeds, url: {pathname, query}}) => (
  <div>
    <ul>
      {
        feeds.map(f => <Feed key={f.id} feed={f} />)
      }
    </ul>
    <style jsx>{`
      ul {
        padding: 0
      };
    `}</style>
  </div>
)

//export default () => (
//  <Page>
//    <div>Resort Weather Forecast</div>
//  </Page>
//)

export default class extends Component {
  static async getInitialProps({pathname, query}) {
    const feed = pathname = '/' ? '/news' : pathname
    const page = query.page ? `${query.page}` : '1'

    return {
      feeds: await fetch(`${feed}/${page}`)
    }
  }
  render() {
//    return (
//      <Page>
//        <div><h2>Resort Weather Forecast</h2></div>
//        {
//          this.props.feeds.map(f => <div>{f.title}</div>)
//        }
//      </Page>
//    )
    return (
      <Page>
        <Feeds
          feeds={this.props.feeds}
          url={this.props.url}
        />
      </Page>
    )
  }
}
