import { shallowMount } from "@vue/test-utils";
import EntryList from "@/modules/daybook/components/EntryList.vue";
import { createStore } from "vuex";
// import { getEntries } from "@/modules/daybook/store/journal/getters";
import { journalState } from '../../../mock-data/test-journal-state'

import journalModule from '@/modules/daybook/store/journal';

const createVuexStore = ( initialState ) => 
        createStore({
            modules: {
                journalModule: {
                    ...journalModule,
                    state: { ...initialState }
                }
            }
        })

describe('Pruebas en el EntryList component', () => {
    
    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntries
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }
    // const store = createStore({
    //     modules: {
    //         journalModule: { ...journalMockModule }
    //     }
    // })

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }
    // de esta manera inicializa los mocks por cada prueba
    let wrapper 

    beforeEach(()=> {

        jest.clearAllMocks()

        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [ store ]
            }
        } )
    })

    test('debe de llamar el getEntries y mostrar 2 entradas', () => {
        //console.log( wrapper.html() );
        expect( wrapper.findAll('entry-stub').length).toBe(2)
    });

    test('debe de llamar el entriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')
        await input.setValue('segunda')

        expect( wrapper.findAll('entry-stub').length).toBe(1)
    });

    test('el boton de nuevo debe redireccionar a /new', () => {

        wrapper.find('button').trigger('click')
        
        expect( mockRouter.push)
        //data del boton en el componente
            .toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
    });
});