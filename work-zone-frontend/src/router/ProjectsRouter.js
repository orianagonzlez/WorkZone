import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import ProjectsPage from '../pages/projects';



export const ProjectsRouter = () => {

    return (
      
        <div className='App'>
          <div className='AppPage'>
            <Switch>
              <Route
                  exact
                  path="/"
                  component={ProjectsPage}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>   
  
    
    )
}
