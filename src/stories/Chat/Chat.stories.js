import React from 'react';

import Chat from './Chat';

export default {
    title: 'Chat',
    component: Chat,
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

const Template = (args) => <Chat {...args} />;

export const ChatPrimary = Template.bind({});

ChatPrimary.args = {
    infoProyecto: {_id: 15, nombre: 'WorkZone', owner: 'Luis', descripcion: 'Proyecto para elaborar el proyecto 2 de Admin de BD'},
    usuario: {nombre: 'Rocco', apellido: 'Madonna', email: 'roccaxxo@gmail.com', username: 'roccomado', fechaNacimiento: '04/11/2000'},
};
