import React from 'react';

import Sidebar from './Sidebar';

export default {
    title: 'Sidebar',
    component: Sidebar,
    argTypes: {
        task: {
            description:
                "Contiene el nombre de la tarea que se esta cronometrando",
        },
        activo: {
            description:
                'Especifica si hay una tarea en progreso en el cronometro',
        },
      },
};

const Template = (args) => <Sidebar {...args} />;

export const SidebarPrimary = Template.bind({});

SidebarPrimary.args = {
    task: "",
    activo: true,
};

