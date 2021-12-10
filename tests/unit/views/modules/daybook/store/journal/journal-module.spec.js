import { createStore } from 'vuex';
import journalModule from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journalModule: {
                ...journalModule,
                state: {...initialState}
            }
        }
    })

describe('pruebas en vuex, journal module', ()=>{

    //básicas
    test('este es el estado inicial, debe de tener este state', () => {

        const store = createVuexStore( journalState )
        //console.log(store.state);
        const { isLoading, entries } = store.state.journalModule

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
    });

    // Mutations
    test('mutation => setEntries', () => {

        //establecemos parametros propios, no los del mock, para este ejemplo
        const store = createVuexStore({ isLoading: true, entries: []})
        //hacemos un commit del mock state para poblar el store creado para esta prueba
        store.commit('journalModule/setEntries', journalState.entries)
        expect( store.state.journalModule.entries.length).toBe(2)
        expect( store.state.journalModule.isLoading).toBeFalsy()
        
    });
    test('mutation=> updateEntry', () => {
        //aqui necesitamos un store con elementos parea modificarlos en la prueba
        const store = createVuexStore( journalState )
        //tomamos una entrada del mock para "actualizarla"
        const updatedEntry = {
            id: '-Mph2WIRwZQM4DovmTS3',
            text : "Estoy aprendiendo Vuejs con el profesor Fernando Herrera",
            date : 1638212161884
        }

        store.commit('journalModule/updateEntry', updatedEntry)
        //length de mi arreglo no deberia crecer
        expect( store.state.journalModule.entries.length).toBe(2)
        //buscar una entrada cuyo id sea el mismo del updatedEntry
        expect( store.state.journalModule.entries.find( e => e.id === updatedEntry.id) ).toEqual( updatedEntry )
        
    });
    test('mutation => addEntry y deleteEntry', () => {
        
        //creamos el store
        const store = createVuexStore( journalState )
        //entry de prueba para probar los metodos
        const testEntry = {
            id: 'ABC-123',
            text: 'Hola mundo, agregando desde jest'
        }
        //addEntry
        store.commit('journalModule/addEntry', testEntry )
        const stateData = store.state.journalModule.entries
        // el largo del arreglo debe crecer en un elemento
        expect( stateData.length ).toBe(3)
        // en el arreglo debemos encontrar un elemento con id: ABC-123
        expect( stateData.find( e=> e.id ==='ABC-123')).toBeTruthy()
        //deleteEntry(aqui debemos acceder a la info directa del store y usamos el id)
        store.commit('journalModule/deleteEntry', 'ABC-123')
        // el largo del arreglo debe disminuir a 2
        expect( store.state.journalModule.entries.length ).toBe(2)
        // en el arreglo no debemos encontrar un elemento con id: ABC-123
        expect( store.state.journalModule.entries.find( e=> e.id ==='ABC-123')).toBeFalsy()

    });

    //Getters
    test('getters => getEntries y getEntryById', () => {

        //establecemos el store desde el mock
        const store = createVuexStore( journalState )
        //buscamos los getters en cuestion llamado a los entries en gral.
        //console.log(store.getters['journalModule/getEntries'](''));
        expect(store.getters['journalModule/getEntries']('').length).toBe(2)
        //buscamos una palabra que solo aparezca en un elemento
        expect(store.getters['journalModule/getEntries']('mock').length).toBe(1)
        // transformamos el state en entry1 y entry2 para hacer match en las pruebas
        const [ entry1, entry2 ] = journalState.entries
        expect(store.getters['journalModule/getEntries']('mock')).toEqual([ entry2 ])
        expect(store.getters['journalModule/getEntries']('profesor')).toEqual([ entry1 ])

        //getEntryById, con el id de -Mph2WIRwZQM4DovmTS3, tambien sirve con entry1.id
        expect(store.getters['journalModule/getEntryById']('-Mph2WIRwZQM4DovmTS3')).toEqual( entry1 )

        
    });

    //Actions
    test('actions => loadEntries', async () => {

        const store = createVuexStore({ isLoading: true, entries: []})

        await store.dispatch('journalModule/loadEntries')
        expect( store.state.journalModule.entries.length).toBe(2)
        
    });
    test('actions => updateEntry', async () => {

        const store = createVuexStore( journalState )
        const updatedEntry = {
            id: '-Mph2WIRwZQM4DovmTS3',
            text : "Haremos update desde la suit de pruebas",
            date : 1638212161884,
            test: true
        }

        await store.dispatch('journalModule/updateEntry', updatedEntry)
        expect(
            store.state.journalModule.entries.find( e => e.id === updatedEntry.id )
        ).toEqual({
            id: '-Mph2WIRwZQM4DovmTS3',
            text : "Haremos update desde la suit de pruebas",
            date : 1638212161884
        })
        
    });

    test('actions => createEntry y deleteEntry', async () => {

        //store
        const store = createVuexStore( journalState )
        const newEntry = {
            date: 1638212161345,
            text: 'Nueva entrada desde las pruebas'
        }
        //createEntry
        const id = await store.dispatch('journalModule/createEntry', newEntry)
        //console.log(store.state.journalModule.entries);
        expect( typeof id).toBe('string')
        expect(
            store.state.journalModule.entries.find( e=> e.id === id)
        ).toBeTruthy()
        //deleteEntry, usamos el id ya que es el dato requerido para realizar la accion
        await store.dispatch('journalModule/deleteEntry', id)
        expect(
            store.state.journalModule.entries.find( e=> e.id === id)
        ).toBeFalsy()
    });
})