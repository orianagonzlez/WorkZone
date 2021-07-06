import React from 'react';

import Navbar from './Navbar';

export default {
    title: 'Navbar',
    component: Navbar,
    argTypes: {
        usuario: {
          description:
            "Contiene el nombre del usuario que esta loggeado en ese momento",
        },
      },
};

const Template = (args) => <Navbar {...args} />;

export const NavbarStory = Template.bind({});

NavbarStory.args = {
    usuario: 'Rocco Madonna',
};

