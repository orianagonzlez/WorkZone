import React from 'react';

import Projects from './Projects';

export default {
    title: 'Projects',
    component: Projects,
    argTypes: {
        archivado: {
            description:
                "Determina si el boton inferior muestra u oculta los proyectos archivados",
        },
        vacio: {
            description:
                'Determina si el usuario tiene proyectos para mostrar o no',
        },
      },
};

const Template = (args) => <Projects {...args} />;

export const ProjectsUnarchived = Template.bind({});

ProjectsUnarchived.args = {
    archivado: true,
    vacio: false,
};
