import React from 'react';

import Stats from './Stats';

export default {
    title: 'Stats',
    component: Stats,
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

const Template = (args) => <Stats {...args} />;

export const StatsPrimary = Template.bind({});

StatsPrimary.args = {
    infoProyecto: {nombre: 'WorkZone', owner: 'Rocco', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD'},
    usuario: {nombre: 'Rocco', apellido: 'Madonna'},
};