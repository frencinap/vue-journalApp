import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'


describe('Pruebas en el view about', () => {

    test('Debe renderizar el componente correctamente', ()=>{

        const wrapper = shallowMount( About )
        expect( wrapper.html() ).toMatchSnapshot()

    })
})