import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'


describe('Pruebas en el view home', () => {

    test('Debe renderizar el componente correctamente', ()=>{

        //montamos wrapper
        const wrapper = shallowMount( Home )
        expect( wrapper.html() ).toMatchSnapshot()

    })
    test('hacer click en un boton debe redireccionar a no-entry', () => {
        
        //mock del router usando jest
        const mockRouter = {
            push: jest.fn()
        } 
        // montamos wrapper
        const wrapper = shallowMount( Home, {
            //probamos elementos globales
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        //estimulo del botón
        wrapper.find('button').trigger('click')
        //espero que el mockrouter.push haya sido llamado
        expect( mockRouter.push ).toHaveBeenCalled()
        //para porbar si fue llamado con el parametro que le entregamos en el componente
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })


    })
})