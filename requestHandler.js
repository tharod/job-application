import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import rootReducer from './src/reducers/index';

import { match, RouterContext } from 'react-router'
import routes from './src/routes'

import thunkMiddleware from 'redux-thunk' 

import { browserHistory } from 'react-router';

function handleRender(req,res) {
  
  const routesMap = {
    routes,
    location: '/'
  }

  match(routesMap, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send("Could not fulfill this request. Please try again later.")
    } else if (redirectLocation) {
      console.log("=============error1===========================")
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
      const body = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const initialState = store.getState();
      res.status(200).send(renderFullPage(body, initialState))
    } else {
      console.log("=============error22222===========================")
      res.status(404).send('Not found')
    }

  })
}

function renderFullPage(component,initialState){

  return `<!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <title>Redux Universal Example</title>
      </head>
    <body>
      <div id="app">${component}</div>
      <script>
       window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>`
}

module.exports = handleRender
