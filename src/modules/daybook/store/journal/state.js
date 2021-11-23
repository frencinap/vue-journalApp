

export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum recusandae sapiente perferendis, accusamus harum voluptas ex facere consectetur et cum nemo voluptate consequuntur placeat, quas quisquam velit necessitatibus architecto debitis?',
            picture: null
        },
        {
            id: new Date().getTime() +100, 
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, numquam, eligendi nisi temporibus ex officia officiis eius nam facere nobis, at impedit? Architecto eligendi ex repellendus. Numquam provident quibusdam exercitationem?',
            picture: null
        },
        {
            id: new Date().getTime() +200, 
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatum obcaecati provident consequatur deserunt? Aspernatur, corrupti at aut cupiditate doloribus ratione pariatur quod praesentium, ut minus quidem accusantium libero enim.',
            picture: null
        }
    ]
})
