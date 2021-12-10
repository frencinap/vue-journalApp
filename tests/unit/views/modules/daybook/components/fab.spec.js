import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab'

describe('Pruebas en el FAB component', () => {
    
    test('debe de mostrra el ícono por defecto fa-plus', () => {
        const wrapper = shallowMount( Fab )
        const iTag = wrapper.find('i')
        // esperamos que el tag i (ícono) contenga la clase fa-plus
        expect( iTag.classes('fa-plus')).toBeTruthy()
    });
    // como esta clase se define como prop en el componente, debemos agregarla
    test('debe mostrar el ícono por argumento fa-save', () => {
        const wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-save'
            }
        } )
        const iTag = wrapper.find('i')
        // esperamos que el tag i (ícono) contenga la clase fa-plus
        expect( iTag.classes('fa-save')).toBeTruthy()
    });
    test('debe emitir el evento on:click ', () => {
        
        const wrapper = shallowMount( Fab )
        wrapper.find('button').trigger('click')
        //comprobamos si se ha emitido un evento, al definir on:click nos dice que se emitió 1 vez
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    });
});