import { shallowMount } from "@vue/test-utils";
import EntryList from "@/modules/daybook/components/EntryList.vue";
import { createStore } from "vuex";
import { getEntries } from "@/modules/daybook/store/journal/getters";
import { journalState } from '../../../mock-data/test-journal-state'

describe('Pruebas en el EntryList component', () => {
    
    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntries
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }
    const store = createStore({
        modules: {
            journalModule: { ...journalMockModule }
        }
    })

    const wrapper = shallowMount( EntryList, {
        global: {
            mocks: {
               
            },
            plugins: [ store ]
        }
    } )

    test('debe de llamar el getEntries y mostrar 2 entradas', () => {
        console.log( wrapper.html() );
    });
});