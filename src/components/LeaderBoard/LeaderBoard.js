import React, { Component } from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { API_PATH } from '../../constants'

class LeaderBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch(`${API_PATH}/urls?order=view_count&direction=desc`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(resp => {
        const { url } = resp

        if (!resp.ok) { return }

        return resp.json()
      })
      .then(data => {
        this.setState({ data })
      })
  }

  render() {
    const { data } = this.state

    if (data) {
      return (
        <Row>
          <Col xs={4} xsOffset={4}>
            <h2 className='text-center'>
              Top Urls
            </h2>
            <Table>
              <thead>
                <tr>
                  <td>
                    Original URL
                  </td>
                  <td>
                    Shortened URL
                  </td>
                  <td>
                    Visit Count
                  </td>
                </tr>
              </thead>
              <tbody>
                { data.map((url, index) => (
                  <tr key={index}>
                    <td>
                      { url.original_url }
                    </td>
                    <td>
                      { url.url }
                    </td>
                    <td>
                      { url.view_count }
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>

          </Col>
        </Row>
      )
      return <div />
    }
  }
}

export default LeaderBoard
