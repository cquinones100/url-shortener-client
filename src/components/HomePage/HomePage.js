import React, { Component } from 'react'
import LoadingUrl from '../LoadingUrl/LoadingUrl'
import UrlForm from '../UrlForm/UrlForm'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loadingUrl: false
    }
  }

  componentDidMount() {
    const shortUrl = window.location.pathname.replace('/', '')

    if (shortUrl !== '/') {
      this.setState({
        loadingUrl: shortUrl.replace('/')
      }, () => {
        fetch(`/${shortUrl}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
          .then(resp => {
            const { url } = resp

            if (resp.status === 302) {
              if (url === `http://${window.location.host}/`) { return }
              return resp.json()
            }
          })
          .then(data => {
            window.location = data.url
          })
      })
    }
  }

  render() {
    const { loadingUrl } = this.state

    if (loadingUrl) { return <LoadingUrl url={loadingUrl}/> }
    return <UrlForm />
  }
}

export default HomePage
