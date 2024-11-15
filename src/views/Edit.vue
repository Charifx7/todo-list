<script setup>
import { useTodoStore } from '@/stores/counter';
import { RouterLink, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';


const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref()

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    todoId.value = parseInt(route.params.id)
    console.log(todoStore.selectedTodo)
})

const editTodo = async (selectedTodo) => {
    try {
        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
        alert("Edit complete")
    } catch (error) {
        console.log('error', error)
    }

}

</script>

<template>
    <div class="flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8 relative">
            <!-- Back Button -->
            <RouterLink class="btn absolute top-4 left-4 bg-gray-600 hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
                :to="{ name: 'todolist' }">
                Back
            </RouterLink>

            <!-- Edit Title -->
            <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6 text-black">Edit</h1>

            <!-- Form for Editing -->
            <div class="form-control w-full mb-6">
                <input type="text" placeholder="Type here" class="input input-bordered w-full px-4 py-2 text-xl"
                    v-model="todoStore.selectedTodo.name">
            </div>

            <!-- Status Dropdown -->
            <div class="mb-6">
                <label class="block text-2xl mb-2 text-black">Status</label>
                <div class="relative">
                    <select v-model="todoStore.selectedTodo.status"
                        class="block appearance-none w-full bg-gray-200 border border-gray-300 text-black text-xl py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option v-for="status in todoStore.statuses" :value="status" :key="status">
                            {{ status }}
                        </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.061a.75.75 0 111.08 1.04l-4.25 4.656a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01-.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Apply Button -->
            <div class="flex">
                <button class="btn bg-yellow-600 mt-3 w-full text-white text-xl sm:text-2xl rounded-lg text-center"
                    @click="editTodo(todoStore.selectedTodo)">
                    Apply
                </button>
            </div>
        </div>
    </div>
</template>