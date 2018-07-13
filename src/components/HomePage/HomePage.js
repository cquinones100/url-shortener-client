import React, { Component } from 'react'
import LoadingUrl from '../LoadingUrl/LoadingUrl'
import UrlForm from '../UrlForm/UrlForm'
import { Alert } from 'react-bootstrap'
import LeaderBoard from '../LeaderBoard/LeaderBoard'
import { API_PATH } from '../../constants'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loadingUrl: false,
      notFound: false
    }
  }

  componentDidMount() {
    const { pathname:shortUrl } = window.location
    const loadingUrl = shortUrl.replace('/', '')

    if (shortUrl !== '/') {
      this.setState({
        loadingUrl 
      }, () => {
        fetch(`${API_PATH}/${loadingUrl}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
          .then(resp => {
            const { url } = resp

            if (resp.status === 302) {
              if (url === `http://${window.location.host}/`) { return }
            }
            return resp.json()
          })
          .then(data => {
            if (data.message === 'not found') { 
              return this.setState({ loadingUrl: false, notFound: true })
            }

            window.location = data.url
          })
      })
    }
  }

  render() {
    const { loadingUrl, notFound } = this.state

    if (loadingUrl) { return <LoadingUrl url={loadingUrl}/> }

    return (
      <div>
        { notFound && (
          <Alert bsStyle="danger">
            <strong>URL Not Found</strong> please try again or create a new url
          </Alert>
        ) }
        <UrlForm />
        { !loadingUrl && <LeaderBoard /> }
      </div>
    )
  }
}

export default HomePage
