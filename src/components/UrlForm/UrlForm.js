import React, { Component } from 'react'
import { Row, Col, FormGroup, FormControl, Grid, Button, HelpBlock } from 'react-bootstrap'

class UrlForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      errors: null
    }
  }

  onChange(e) {
    e.preventDefault()
    const { value:url } = e.target
    const { errors, url:original_url } = this.state

    if (errors && url.length < original_url.length) {
      return (
        this.setState({
          errors: null,
          url
        })
      )}

    this.setState({ url })
  }

  onSubmit(e) {
    const { url } = this.state
    e.preventDefault()

    fetch('/urls', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'post',
      body: JSON.stringify({
        url: { original_url: url }
      })
    })
      .then(resp => {
        if (resp.ok || resp.status === 422) return resp.json()
      })
      .then(data => this.handleData(data))
  }

  handleData(data) {
    const { errors } = data

    if (errors) {
      this.setState({ errors: errors.original_url })
    }
  }

  getValidationState() {
    const { errors } = this.state

    if (errors) {
      return 'error'
    }

    return null
  }

  render() {
    const { url, errors } = this.state

    return(
      <Grid>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Row>
              <header>
                <h1 className='text-center'> 
                  Welcome to URL Shortener
                </h1>
              </header>
            </Row>
            <Row>
              <form onSubmit={e => this.onSubmit(e)}>
                <FormGroup 
                  controlId="formBasicText" 
                  validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    placeholder="Enter your url"
                    value={url}
                    onChange={e => this.onChange(e)}
                  />
                  { errors && (
                    errors.map((error, index) => (
                      <HelpBlock key={index}>Url: {error}</HelpBlock>
                    )
                    ))}
                    <Button type='submit'>Submit</Button>
                  </FormGroup>
                </form>
              </Row>
            </Col>
          </Row>
        </Grid>
    )
  }
}

export default UrlForm
