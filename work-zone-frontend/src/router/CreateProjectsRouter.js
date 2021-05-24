import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateProjectsScreen from '../pages/projects/CreateProjectsScreen';



export const CreateProjectsRouter = () => {

    return (
      
        <div className='App'>
          <div className='AppPage'>
            <Switch>
              <Route
                  exact
                  path="/projects/create"
                  component={CreateProjectsScreen}
              />
              <Redirect to="/projects/create" />
            </Switch>
          </div>
        </div>   
  
    
    )
}
