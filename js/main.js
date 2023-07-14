const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('Hello vue!')
        function test() {
            alert('sadg')
        }
        return {
            message,
            test
        }
    }
}).mount('#app')