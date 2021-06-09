app.component('search-diagnoses', {
    emits: {
        selectDiagnosis: null
    },
    template:
        /*html*/
        `<div>
            <input type="text" class="form-control" placeholder="Search for a diagnosis" 
                v-model="query" 
                @focus="focusSearchbar = true" 
                @focusout="focusSearchbar = false"
            />
        </div>
        <div v-show="query && (focusSearchbar || hoverResults)">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action" 
                    v-for="(diagnosis, index) in results" 
                    :key="diagnosis.id" 
                    @mouseover="hoverResults = true" 
                    @mouseleave="hoverResults = false"
                    @click="selectDiagnosis(diagnosis)" 
                >{{ diagnosis[1] }}</a>
            </div>
       </div>`,
    data() {
        return {
            query: "",
            results: [],
            focusSearchbar: false,
            hoverResults: false
        }
    },
    watch: {
        query() {
            this.fetchDiagnoses();
        },
        key() {
            this.query = "";
        }
    },
    methods: {
        fetchDiagnoses() {
            fetch('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' + this.query)
                .then(response => response.json())
                .then(json => this.results = json[3]);
        },
        selectDiagnosis(diagnosis) {
            this.query = "";
            this.$emit('selectDiagnosis', diagnosis[0]);
        }
    }
})