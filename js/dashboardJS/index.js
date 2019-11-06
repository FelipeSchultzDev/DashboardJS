var isMouseDown = false;
var card;
var offset = [];

const createColumn = (column, container) => {
    const kanbanColumn = document.createElement('kanban-column')
    kanbanColumn.setAttribute('id', column.id)

    const title = document.createElement('kanban-column-title');
    title.innerHTML = column.title;

    const content = document.createElement('kanban-column-content');
    content.setAttribute('id', column.id)


    kanbanColumn.appendChild(title);
    kanbanColumn.titleElement = title;

    kanbanColumn.appendChild(content);
    kanbanColumn.contentElement = content;

    container.appendChild(kanbanColumn);
    container.columns.push(kanbanColumn)
}

const onCardMouseDown = (e) => {
    window.getSelection().removeAllRanges();

    isMouseDown = true;

    card = e.target.cloneNode();
    
    offset = [
        card.offsetLeft - e.clientX,
        card.offsetTop - e.clientY
    ];
    
    const mousePosition = {
        x: e.clientX,
        y: e.clientY
    }
    
    card.style.width = `${e.target.clientWidth}px`;
    card.style.position = 'absolute'
    card.style.left = (mousePosition.x + offset[0]) + 'px';
    card.style.top = (mousePosition.y + offset[1]) + 'px';
    // console.log(e);
    e.target.parentElement.appendChild(card);
    console.log(e);
    console.log(offset);
}

const onMouseMove = (e) => {
    if (isMouseDown) {
        // console.log(e);
        const mousePosition = {
            x: e.clientX,
            y: e.clientY
        }
        card.style.width = `${card.clientWidth}px`;
        card.style.position = 'absolute'
        card.style.left = (mousePosition.x + offset[0]) + 'px';
        card.style.top = (mousePosition.y + offset[1]) + 'px';
    }
}

class Kanban {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.wrapper.columns = [];
        this.columns = [];
    }

    setCardsList() {}

    setColumnsList() {}

    addColumn(title) {
        const column = {
            title,
            id: this.columns.length
        }
        this.columns.push(column)
        return this;
    }

    removeColumn(idColumn) {
        this.columns = this.columns.filter(column => column.id !== idColumn);
        return this;
    }

    render() {
        this.columns.forEach(column => createColumn(column, this.wrapper));
        this.wrapper.dispatchEvent(new CustomEvent('render'));

        return this;
    }

    createCard() {
        const card = document.createElement('kanban-card');
        const teste = this.wrapper.columns[0].contentElement;
        card.addEventListener('mousedown', onCardMouseDown)
        document.addEventListener('mouseup', () => isMouseDown = false)
        document.addEventListener('mousemove', onMouseMove)
        teste.appendChild(card)
        return this;
    }
}

class KanbanContainer extends HTMLElement {
    constructor() {
        super()
    }
}
class KanbanColumn extends HTMLElement {
    constructor() {
        super()
    }
}
class KanbanColumnTitle extends HTMLElement {
    constructor() {
        super()
    }
}
class KanbanColumnContent extends HTMLElement {
    constructor() {
        super()
    }
}
class KanbanCard extends HTMLElement {
    constructor() {
        super()
    }
}

window.customElements.define('kanban-container', KanbanContainer);
window.customElements.define('kanban-column', KanbanColumn);
window.customElements.define('kanban-column-title', KanbanColumnTitle);
window.customElements.define('kanban-column-content', KanbanColumnContent);
window.customElements.define('kanban-card', KanbanCard);