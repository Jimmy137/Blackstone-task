let items = []

const items_div = document.querySelector('.items')
const add_buttons_div = (id) => {
    return `
    <div class="btns">
        <button class="update-btn" onclick = 'updateItem(${JSON.stringify(id)})'>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-labelledby="edit-title">
                <title id="edit-title" >edit</title>
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" fill="white"/></svg>
        </button>
        <button class="delete-btn" onclick = 'deleteItem(${JSON.stringify(id)})' >
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-labelledby="delete-title">
                <title id="delete-title" >delete</title>
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" fill="white"/></svg>
        </button>
    </div>
    `
} 
const new_item_input = document.querySelector('#new-item-input') 
const add_button = document.querySelector('#add-button')
add_button.disabled = true

const toggleDisable = () => {
    if (new_item_input.value.trim() === "") {
        add_button.disabled = true; // Disable Add button if input is empty
    } else {
        add_button.disabled = false; // Enable Add button if input is not empty
    }
};

new_item_input.addEventListener('input', toggleDisable)
new_item_input.addEventListener('keydown', (e)=> {
    if (new_item_input.value.trim() !== "") {
        if (e.key === 'Enter') {
            addItem()
        }
    }
})
const showItems = (isEditingOrDeleting = false) => {
    items_div.innerHTML = ''
    
    items.forEach((item, i) => {
        const item_div = document.createElement('div')
        item_div.id = item.id
        item_div.classList.add('item')
        if (!isEditingOrDeleting) {
            if (i == items.length - 1) {
                item_div.classList.add('new-item')
            }
            else {
                item_div.classList.remove('new-item')
            }
        }

        
        const item_text_div = document.createElement('div')
        item_text_div.innerHTML = item.name
        item_text_div.classList.add('item-text')

        // the edit input

        // add divs to the item div
        item_div.appendChild(item_text_div)
        const btns = add_buttons_div(item.id)
        item_div.innerHTML += btns

        // add the item div to items div    
        items_div.appendChild(item_div)

    })
}


const addItem = () => {
    const new_item_obj = {
        name: new_item_input.value,
        id: new_item_input.value + '-' + items.length
    }
    items.push(new_item_obj)
    new_item_input.value = ''
    toggleDisable()
    showItems()
}

add_button.addEventListener('click', addItem)

const toggleItemText = (id, toShow) => {
    toShow.display = 'flex'
}

const updateItem = (id) => {
    const to_update_item = document.querySelector(`#${id}`)
    const to_update_text = to_update_item.querySelector('.item-text')
    const to_update_button = to_update_item.querySelector('.update-btn')
    to_update_button.disabled = true

    old_text = to_update_text.innerText
    to_update_item.classList.add('editing-item')
    to_update_text.style.display = 'none'

    const edit_input = document.createElement('input')
    edit_input.classList.add('edit-input')
    edit_input.value = old_text
    to_update_item.appendChild(edit_input)

    edit_input.addEventListener('keydown', (e)=> {
        if (edit_input.value.trim() !== "") {
            if (e.key === 'Enter') {
                to_update_button.disabled = false
                //handle the change in the 'items' list
                new_items = items.map(item => item.id === id ? {...item, name:edit_input.value} : item)
                items = [...new_items]
                showItems(true)
            }
        }
    })
}

const deleteItem = (id) => {
    const new_items = items.filter(item => item.id !== id)
    items = [...new_items]
    showItems(true)
    
}

document.addEventListener('DOMContentLoaded', ()=> {
    showItems()
})
