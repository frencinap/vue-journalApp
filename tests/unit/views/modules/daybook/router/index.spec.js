// no usaremos shallowmount ya que no hya componentes que montar
import Router from '@/modules/daybook/router';


describe('Pruebas en el router del modulo daybook', () => {
    //hacemos la funcion async para probar las rutas con lazyloading, que son async
    test('el router debe tener esta configuracion', async () => {
        
      
        expect( Router ).toMatchObject({
            name: "daybook",
            component: expect.any( Function ),
            children: [
              {
                path: "",
                name: "no-entry",
                component: expect.any( Function ),
              },
              {
                path: ":id",
                name: "entry",
                component: expect.any( Function ),
                props: expect.any( Function ),
              },
            ],
        })
        //console.log( await Router.children[0].component() );
        //console.log(( await Router.children[0].component() ).default.name)
        // expect(( await Router.children[0].component() ).default.name).toBe('NoEntrySelected')
        // expect(( await Router.children[1].component() ).default.name).toBe('EntryView')
        //al probar por el index quedan sujetas a no ser modificadas en el futuro

        //entonces lo haremos de la siguiente manera
        const promiseRoutes = []
        Router.children.forEach( child => promiseRoutes.push( child.component() ) )
        const routes = (await Promise.all ( promiseRoutes )).map( r => r.default.name)
        //console.log(routes);
        expect( routes ).toContain('EntryView')
        expect( routes ).toContain('NoEntrySelected')
    });

    test('debe de retornar el id de la ruta', () => {

        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        //console.log( Router.children[1].props( route ) );
        //expect( Router.children[1].props( route ) ).toEqual({ id: 'ABC-123' })
        const entryRoute = Router.children.find( route => route.name === 'entry')
        //console.log(entryRoute);
        expect( entryRoute.props( route )).toEqual({ id: 'ABC-123' })
        
    });

})