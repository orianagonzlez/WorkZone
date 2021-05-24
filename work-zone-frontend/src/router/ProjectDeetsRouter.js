import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import ProjectDeetsPage from '../pages/projects/projectDeets';



export const ProjectDeetsRouter = () => {

    return (
      
        <div className='App'>
          <div className='AppPage'>
            <Switch>
              <Route
                  exact
                  path="/projectDetails"
                  component={ProjectDeetsPage}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>   
  
    
    )
}
