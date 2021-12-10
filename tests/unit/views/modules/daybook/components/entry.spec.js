import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
//como necesitamos entry usamos el mock-store
import { journalState } from '../../../mock-data/test-journal-state'

describe('Pruebas en entry Component', () => {
    //mockrouter
    const mockRouter = {
        push: jest.fn()
    }
    //wrapper
    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('Debe hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    });

    test('Debe redireccionar al hacer click en el entry-container', () => {
        
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        })
    });

    test('pruebas en las propiedades computadas', () => {
        // console.log(wrapper.vm.day)
        // console.log(wrapper.vm.month)
        // console.log(wrapper.vm.yearDay);
        expect( wrapper.vm.day).toBe(29)
        expect( wrapper.vm.month).toBe('Noviembre')
        expect( wrapper.vm.yearDay).toBe('2021, Lunes')
    });

})