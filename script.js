let todoInput //miejsce gdzie użytkoniwk wpisuje treść zadania
let errorInfo //info o braku zadań, konieczności wpisania tekstu
let addBtn //przycisk ADD, dodaje nowe elemeny do listy
let ulList //lista zadań tagi li
let popup //popup
let popupInfo //text w popupie, jeśli się doda pusty tekst
let todoToEdit //edytowany todo
let popupInput //input w popupie
let popupAddBtn //przycisk zatwierdź w ppupie
let popupCloseBtn //przycisk anuluj

const main = () => {
	prepereDOMElements()
	prepereDOMEvents()
}
const prepereDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCancelBtn = document.querySelector('.cancel')
}

const prepereDOMEvents = () => {
	//nadajemy nasłuchianie
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkClick)
	popupAddBtn.addEventListener('click', changeTodoItem)
	popupCancelBtn.addEventListener('click', closePopup)
	todoInput.addEventListener('keyup', addTodosEnter)
}

const addNewTask = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)
		createTodosItem(newTodo)
		todoInput.value = ''
		errorInfo.textContent = 'zadanie zostało dodane, możesz dodać kolejne'
	} else {
		errorInfo.textContent = 'musisz podać zadanie do wykonania'
	}
}

const createTodosItem = newTodo => {
	const toolsPanel = document.createElement('div')
	const btnComplete = document.createElement('button')
	const btnEdit = document.createElement('button')
	const btnDelete = document.createElement('button')
	toolsPanel.classList.add('tools')
	btnComplete.classList.add('complete')
	btnComplete.innerHTML = '<i class="fas fa-check"></i>'
	btnEdit.classList.add('edit')
	btnEdit.textContent = 'EDIT'
	btnDelete.classList.add('delete')
	btnDelete.innerHTML = '<i class="fas fa-times"></i>'
	toolsPanel.append(btnComplete, btnEdit, btnDelete)
	newTodo.append(toolsPanel)
	// console.log(toolsPanel)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		// todoItem = e.target.closest('li').textContent
		changeTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const changeTodo = e => {
	popup.style.display = 'flex'
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
}
const deleteTodo = e => {
	e.target.closest('li').remove()
	const liItems = document.querySelectorAll('li')
	if (liItems.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	}
}

const changeTodoItem = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'nie możesz wprowadzić pustego pola'
	}
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}
const addTodosEnter = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

document.addEventListener('DOMContentLoaded', main()) 
