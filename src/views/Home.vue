<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/counter';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const todoStore = useTodoStore()
const todoText = ref('')
const statusSelected = ref('Pending')
const filterTodo = computed(() => {
    return todoStore.list.filter(todo => todo.status === statusSelected.value)
})

onMounted(async () => {
    await todoStore.loadTodos()
})

const addTodo = async (todoText) => {
    try {
        await todoStore.addTodo(todoText)
        await todoStore.loadTodos()
    } catch (error) {
        console.log('error', error)
    }
}

const editStatus = async (todoData, todoId) => {
    try {
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
    } catch (error) {
        console.log('error', error)
    }
}

const deleteTodo = async (todoId) => {
    try {
        await todoStore.deleteTodo(todoId)
        await todoStore.loadTodos()
    } catch (error) {
        console.log('error', error)
    }
}
const changeStatus = async (event, todoId) => {
    try {
        if (event.target.checked) {
            await todoStore.editTodo({ status: 'Done' }, todoId)
        } else {
            await todoStore.editTodo({ status: 'Doing' }, todoId)
        }
        await todoStore.loadTodos()
    } catch (error) {
        console.log('error', error)
    }

}
const changeSelected = async (newStatus) => {
    statusSelected.value = newStatus
}
</script>



<template>
    <div class="flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6 text-black">To-do List</h1>
            <div>
                <!-- Input and Add Button -->
                <div class="flex flex-col sm:flex-row mb-4">
                    <input
                        class="input input-bordered w-full px-4 py-2 text-xl text-black border-gray-300 rounded-lg mb-4 sm:mb-0"
                        placeholder="Insert todo" type="text" v-model="todoText" />
                    <button class="btn btn-primary ml-0 sm:ml-2 px-6 py-2 text-xl text-white bg-blue-500"
                        @click="addTodo(todoText)">
                        Add
                    </button>
                </div>

                <!-- Tabs for Status (Sticky Tabs) -->
                <div class="tabs tabs-bordered mb-6 text-xl text-black sticky top-0 bg-white z-10 shadow-md">
                    <a v-for="status in todoStore.statuses" :key="status"
                        :class="status === statusSelected ? 'tab tab-active' : 'tab'" @click="changeSelected(status)"
                        class="px-4 py-2">
                        {{ status }}
                    </a>
                </div>

                <!-- To-Do Items -->
                <div class="flex flex-col space-y-4">
                    <div class="flex items-center justify-between py-2 border-b border-gray-300"
                        v-for="todo in filterTodo" :key="todo.id">
                        <div>
                            <input type="checkbox" :checked="todo.status === 'Done'"
                                @change="changeStatus($event, todo.id)" class="checkbox w-6 h-6 bg-gray-400" />
                        </div>
                        <div :class="todo.status === 'Done' ? 'line-through text-gray-500' : 'text-xl text-black'">
                            {{ todo.name }}
                        </div>
                        <div class="flex space-x-2">
                            <RouterLink :to="{ name: 'edit', params: { id: todo.id } }">
                                <button class="btn bg-yellow-600 px-4 py-2 text-white text-xl">
                                    Edit
                                </button>
                            </RouterLink>
                            <button class="btn bg-red-700 px-4 py-2 text-white text-xl" @click="deleteTodo(todo.id)">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
