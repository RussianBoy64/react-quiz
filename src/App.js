import React from 'react'
import classes from './App.module.css'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/Quiz/Quiz'


function App() {
  return (
    <div className = { classes.App }>
      <Layout>
        <Quiz />
      </Layout>
    </div>
  );
}

export default App;
