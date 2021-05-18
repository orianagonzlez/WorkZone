import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/sidebar/Sidebar';
import Projects from '../components/projects/Projects';
import ProjectsPage from '../pages/projects';



export const ProjectsRouter = () => {

    return (
      
        <div className='App'>
          <div className='AppPage'>
          
            
            <Switch>
              <Route
                  exact
                  path="/"
                  component={Projects}
              />


              <Redirect to="/" />
          </Switch>
          </div>
        </div>   
  
    
    )
}
