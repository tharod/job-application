import React from 'react';
 import { Button, Navbar, Nav,  NavItem, Input } from 'react-bootstrap';

const buttonsInstance = (
  <Button onClick={() => alert('good')}>Click me!</Button>
);

export default class Home extends React.Component {
  render() {
    return (
      <div className='row'>
        { buttonsInstance }
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}
