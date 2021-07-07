import React from 'react';

import CreateColumnModal from './CreateColumnModal';

export default {
    title: 'CreateColumnModal',
    component: CreateColumnModal,
    argTypes: {
        infoProyecto: {
            description:
                "Contiene la informacion del proyecto seleccionado por el usuario",
        },
        mostrar: {
            description: 
                'aq',
        },
        columnas: {
            description: 
                'columnas para clasificar las tareas',
        },
        disabled: {
            description: 
                'botón de crear columna habilitado o no',
        },
      },
};

const Template = (args) => <CreateColumnModal {...args} />;

export const CreateColumnModalStory = Template.bind({});

CreateColumnModalStory.args = {
    infoProyecto: {nombre: 'Walmart', owner: 'Rocco', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD', miembros: [{_id: '0', nombre: 'Isabel', apellido: ''}]},
    mostrar: false,
    columnas: [{_id: '0', nombre: 'Not started'}, {_id: '1', nombre: 'Doing'}, {_id: '2', nombre: 'Done'}],
    disabled: false,
};
