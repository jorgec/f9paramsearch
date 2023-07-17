const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('Hello vue!')

        const dataCenters = ref([
            {label: "Local", url: "./data.json"},
            {label: "Mock", url: "https://dummyjson.com/products/"},
            {label: "Dev", url: "http://pcr005.scl.five9.com"},
            {label: "Sta. Clara", url: "http://pcr004.scl.five9.com"},
            {label: "Atlanta", url: "http://pcr001.atl.five9.com/"},
        ])

        let dataCenterKey = ref(0)

        let isResponseLoading = ref(false)
        let responseMessage = ref("")
        let responseData = ref(null)

        async function fetchData() {
            this.responseData = null
            this.responseMessage = ""
            const dataCenter = this.dataCenters[this.dataCenterKey];
            this.isResponseLoading = true
            try {
                const response = await fetch(dataCenter.url)
                this.responseMessage = "Success"
                this.responseData = await response.json()
            } catch (error) {
                this.responseMessage = error
            }
            this.isResponseLoading = false
        }

        return {
            dataCenters,
            dataCenterKey,
            message,
            isResponseLoading,
            responseData,
            responseMessage,

            // methods
            fetchData
        }
    }
}).mount('#app')