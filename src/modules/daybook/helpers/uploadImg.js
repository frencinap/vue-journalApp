// usando cloudinary
// usando axios que ya está instalado en el proyecto
import axios from "axios";

const uploadImage = async (file) => {
  if (!file) {
    return;
  }

  try {
    const formData = new FormData();
    // nombre del upload preset en cloudinary
    formData.append("upload_preset", "xu6qsfbx");
    // llave de file para subir archivo file definido arriba
    formData.append("file", file);

    // antes de image va el cloud name
    const url = "https://api.cloudinary.com/v1_1/dtit4pat1/image/upload";
    //en las respuestas de accios la info esta en la data
    const { data } = await axios.post(url, formData);
    console.log(data);

    //elemento con la url de la imagen subida a la api de cloudinary
    return data.secure_url;
  } catch (error) {
    console.log("Error al cargar la imagen");
    console.log(error);
    return null;
  }
};

export default uploadImage;
