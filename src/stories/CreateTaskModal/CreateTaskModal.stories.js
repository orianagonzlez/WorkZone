import React from 'react';

import CreateTaskModal from './CreateTaskModal';

export default {
    title: 'CreateTaskModal',
    component: CreateTaskModal,
    argTypes: {
        infoProyecto: {
            description:
                "Contiene la informacion del proyecto seleccionado por el usuario",
        },
        mostrar: {
            description: 
                'aq',
        },
      },
};

const Template = (args) => <CreateTaskModal {...args} />;

export const CreateTaskModalStory = Template.bind({});

CreateTaskModalStory.args = {
    infoProyecto: {nombre: 'WorkZone', owner: 'Rocco', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD'},
    mostrar: false,
};
