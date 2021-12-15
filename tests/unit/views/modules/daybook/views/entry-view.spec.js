import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import journalModule from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView.vue'
import Swal from 'sweetalert2';

const createVuexStore = ( initialState ) => 
        createStore({
            modules: {
                journalModule: {
                    ...journalModule,
                    state: { ...initialState }
                }
            }
        })
//mock de las funciones de sweetalert2
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView.vue', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }
    // de esta manera inicializa los mocks por cada prueba
    let wrapper 

    beforeEach(()=> {

        jest.clearAllMocks()

        wrapper = shallowMount( EntryView, {
            props: {
                id: '-Mph2WIRwZQM4DovmTS3'
            },
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [ store ]
            }
        } )
    })

    test('debe de sacar al usuario si el id no existe', () => {
        
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'este id no existe en store'
            },
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name:'no-entry' })
    });

    test('Debe de mostrar la entrada correctamente', () => {
        
        //console.log( wrapper.html() );
        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()
    });

    test('debe de borrar la entrada y salir', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )
        // buscamos el boton de eliminar por la clase btn-danger
        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            // objeto del componente
            title: "Estás seguro?",
            text: "Una vez borrado, no se puede recuperar",
            showDenyButton: true,
            confirmButtonText: "Si, estoy seguro",
        })

        setTimeout(()=>{
            expect( store.dispatch ).toHaveBeenCalledWith('journalModule/deleteEntry', '-Mph2WIRwZQM4DovmTS3')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()
        }, 1)
        

    });
    
});