app.component('search-records', {
    emits: {
        selectRecord: null,
        focus: null,
        focusout: null
    },
    template:
        /*html*/
        `<input type="text" class="form-control" placeholder="Search records by patient name" 
            v-model="query" 
            @focus="$emit('focus'); focusSearchbar = true;" 
            @focusout="$emit('focusout'); focusSearchbar = false;"
        />
        
        <div class="position-absolute w-100" style="z-index: 999;" v-show="query && (focusSearchbar || hoverResults)">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
                    v-for="(record, index) in results" 
                    :key="record.id" 
                    @mouseover="hoverResults = true" 
                    @mouseleave="hoverResults = false"
                    @click="selectRecord(record)" 
                >
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ record.patient.name.first }} {{ record.patient.name.last }}</h5>
                        <small class="text-muted">DOB: {{ new Date(record.patient.DOB).toLocaleDateString("en-US") }}</small>
                    </div>
                    <p class="mb-1">Visit Date: {{ new Date(record.date).toLocaleDateString("en-US") }}</p>
                    <small class="text-muted">{{ record.problem }}</small>
                </a>
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
            this.fetchRecords();
        }
    },
    methods: {
        fetchRecords() {
            fetch('api/records?nameStarts=' + this.query)
                .then(response => response.json())
                .then(json => this.results = json.data.records);
        },
        selectRecord(record) {
            this.$emit('selectRecord', record);
        }
    }
})