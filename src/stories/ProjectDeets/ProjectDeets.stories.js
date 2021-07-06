import React from 'react';

import ProjectDeets from './ProjectDeets';

export default {
    title: 'ProjectDeets',
    component: ProjectDeets,
    argTypes: {
        infoProyecto: {
            description:
                "Contiene la informacion del proyecto seleccionado por el usuario",
        },
        usuario: {
            description:
                'Contiene la informacion del usuario loggeado en ese momento',
        },
      },
};

const Template = (args) => <ProjectDeets {...args} />;

export const ProjectDeetsOwner = Template.bind({});

ProjectDeetsOwner.args = {
    infoProyecto: {nombre: 'WorkZone', owner: 'Rocco', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD'},
    usuario: {nombre: 'Rocco', apellido: 'Madonna'},
};

export const ProjectDeetsColaborador = Template.bind({});

ProjectDeetsColaborador.args = {
    infoProyecto: {nombre: 'WorkZone', owner: 'Luis', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD'},
    usuario: {nombre: 'Rocco', apellido: 'Madonna'},
};
