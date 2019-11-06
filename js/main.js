const container = document.getElementById('myContainer');

var board = new Kanban(container);

// container.addEventListener('render', () => {
//     console.log('renderizou!');
// })

board
.addColumn('Sla')
.addColumn('Sla')
.addColumn('Sla')
.addColumn('Sla')
.render()
.createCard()
.createCard()
