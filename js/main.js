const {createApp, ref} = Vue

createApp({
    setup() {

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
                this.responseData = parseResponse(await response.json())
            } catch (error) {
                this.responseMessage = error
            }
            this.isResponseLoading = false
        }

        function parseResponse(response) {
            for (let i = 0; i < response.length; i++) {
                let curr = response[i];
                let actionBtn = ""

                let pname = curr["param_name"]
                let pval = curr["param_value"]
                let parid = curr["param_id"]
                let pparnt = curr["param_parent"]
                let tln = curr["param_parent_name"]
                let domain = "tbd"

                switch (pname) {
                    case "ref to sow":
                        actionBtn = `<a class="button find_cases" href="/cgi-bin/Param/find_sfdc_cases.pl?report=${tln}&domain=${domain}" target="_blank">Find Cases</a>`
                        break
                    case "spool":
                        let tmp = pval
                        tmp = tmp.replace(/\/\*f9pcr/gi, "/Customer")
                        actionBtn = `<a class="button" href="${tmp}" target="_blank">Open</a>`
                        break;
                    case "host":
                    case "port":
                    case "user":
                    case "pass":
                    case "rcpt":
                    case "dir":
                        let param_path = `${tln}/${pname}`
                        actionBtn = `<a class="button" href="/cgi-bin/Param/change_min.pl?param_id=${parid}&param_path=${param_path}&top_level_name=${tln}">Edit`
                        break
                }

                response[i]["action_button"] = actionBtn

            }
            return response;
        }

        return {
            dataCenters,
            dataCenterKey,
            isResponseLoading,
            responseData,
            responseMessage,

            // methods
            fetchData
        }
    }
}).mount('#app')