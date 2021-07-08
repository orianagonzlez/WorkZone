import React from 'react';

import ProfileDeets from './ProfileDeets';

export default {
    title: 'ProfileDeets',
    component: ProfileDeets,
    argTypes: {
        usuario: {
            description:
                'Contiene la informacion del usuario loggeado en ese momento',
        },
      },
};

const Template = (args) => <ProfileDeets {...args} />;

export const ProfileDeetsPrimary = Template.bind({});

ProfileDeetsPrimary.args = {
    usuario: {nombre: 'Rocco', apellido: 'Madonna', email: 'roccaxxo@gmail.com', username: 'roccomado', fechaNacimiento: '04/11/2000'},
};
