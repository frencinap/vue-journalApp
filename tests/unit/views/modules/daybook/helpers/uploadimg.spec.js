import uploadImage from '@/modules/daybook/helpers/uploadImg'
import cloudinary from 'cloudinary'
import axios from 'axios'

cloudinary.config({
    cloud_name: 'dtit4pat1',
    api_key:'486265355824973',
    api_secret: 'VRHPOcqLolZJXHm1jrYwYpnL6ug'
})

describe('Pruebas en el uploadImage', () => {

    test('Debe de cargar un archivo y devolver el url', async( done ) => {

        //imagen de referencia ya subida a cloudinary
        const {data} = await axios.get('https://res.cloudinary.com/dtit4pat1/image/upload/v1638302666/qsoxitkngv5o6hihwxwx.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'FotoLago.jpg')
        
        const url = await uploadImage( file )
        //si revisamos cloudinary, acabamos de subir la imagen
        expect( typeof url).toBe('string')
        
        //tomar id
        const segments = url.split('/')
        const imgId = segments[ segments.length -1].replace('.jpg', '')
        //console.log({imgId});
        cloudinary.v2.api.delete_resources( imgId, {}, ()=> {
            done()
        })
    });
    
});