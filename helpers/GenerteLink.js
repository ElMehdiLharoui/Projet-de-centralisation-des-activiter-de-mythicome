const axios = require("axios");
const fs = require("fs");
const FormData = require('form-data');
exports.genereteLink = async (data) => {
    

    const formData = new FormData();
    formData.append('image', data);

    const tab= await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        Authorization: "Client-ID 1d2be74fa8ae5fd", // Remplacez par votre token Imgur
        'Content-Type': 'multipart/form-data',
      },
    });
 
    return tab;
};

exports.genereteLinkUpdated = async (data) => {
    

  const formData = new FormData();
  formData.append('image', data);

  const tab= await axios.post('https://api.imgur.com/3/image/${req.params.imageId}', formData, {
    headers: {
      Authorization: "Client-ID 1d2be74fa8ae5fd", // Remplacez par votre token Imgur
      'Content-Type': 'multipart/form-data',
    },
  });
//console.log("tab"+tab);
  return tab;
};
