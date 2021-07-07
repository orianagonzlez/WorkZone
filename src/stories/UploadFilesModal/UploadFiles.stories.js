import React from 'react';

import UploadFilesModal from './UploadFilesModal';

export default {
    title: 'UploadFilesModal',
    component: UploadFilesModal,
    argTypes: {
        mostrar: {
            description: 
                'aq',
        },
        mostrarProgreso: {
            description: 
                'mostrar progress bar',
        },
        urls: {
            description: 
                'lista de urls de imagenes',
        },
        images: {
            description: 
                'lista de objetos donde cada uno guarda el nombre y el url de una imagen',
        },
        success: {
            description: 
                'indica si el upload funcionó o no',
        },
        files: {
            description: 
                'lista de urls',
        },
        fileNames: {
            description: 
                'lista de nombres de los archivos',
        },
      },
};

const Template = (args) => <UploadFilesModal {...args} />;

export const UploadFilesModalStory = Template.bind({});

UploadFilesModalStory.args = {
    mostrar: false,
    mostrarProgreso: false,
    urls: ['https://lh3.googleusercontent.com/proxy/89F2RYiBYaDO1_LhTIsVk1khW2WU7nNRbEPP10SI1CmQwkeQDFPYUhAqTVqK97PJRAVlnsaOfbzm70-ZLttj9umoNjrenE8eAFIUHx_3pKgwluI_gGndhTA2sg', 'https://www.eluniversal.com.mx/sites/default/files/2021/05/18/shrek_20_aniversario.jpg'],
    images: [{name: 'File #1', url: 'https://lh3.googleusercontent.com/proxy/89F2RYiBYaDO1_LhTIsVk1khW2WU7nNRbEPP10SI1CmQwkeQDFPYUhAqTVqK97PJRAVlnsaOfbzm70-ZLttj9umoNjrenE8eAFIUHx_3pKgwluI_gGndhTA2sg'}, {name: 'File #2', url: 'https://www.eluniversal.com.mx/sites/default/files/2021/05/18/shrek_20_aniversario.jpg'}],
    success: false,
    files: ['https://lh3.googleusercontent.com/proxy/89F2RYiBYaDO1_LhTIsVk1khW2WU7nNRbEPP10SI1CmQwkeQDFPYUhAqTVqK97PJRAVlnsaOfbzm70-ZLttj9umoNjrenE8eAFIUHx_3pKgwluI_gGndhTA2sg', 'https://www.eluniversal.com.mx/sites/default/files/2021/05/18/shrek_20_aniversario.jpg'],
    fileNames: ['File #1', 'File #2'],
};