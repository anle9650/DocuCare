app.component('record-form', {
    props: {
        record: {
            type: String,
            required: true,
            default: null
        }
    },
    emits: {
        recordChange: null
    },
    template:
        /*html*/
        `<div>
            <div class="pb-2 mt-4 mb-2 border-bottom">
                <h1>
                    {{ this.recordObj.patient.name.first }} {{ this.recordObj.patient.name.last }} &#183; {{ this.recordObj.date.toLocaleDateString("en-US") }}
                </h1>
                <div class="text-muted">{{ this.recordObj.patient.gender }} &#183; Date of birth: {{ this.recordObj.patient.DOB.toLocaleDateString("en-US") }}</div>
            </div>
            <div v-if="!this.complete">
                <form onsubmit="return false;">
                    <div class="form-group"> 
                        <label for="hpi">History of Patient Illness</label>
                        <textarea-autosize id="hpi" name="hpi" v-model="this.hpi"></textarea-autosize>
                    </div>
                    <div class="form-group">
                        <label for="ros">Review of Systems</label>
                        <textarea-autosize id="ros" name="ros" v-model="this.ros"></textarea-autosize>
                    </div>
                    <div class="form-group">
                        <label for="exam">Physical Exam</label>
                        <textarea-autosize id="exam" name="exam" v-model="this.exam"></textarea-autosize>
                    </div>
                    <div class="form-group">
                        <label>Diagnoses</label>
                        <search-diagnoses :key="this.recordObj._id" @select-diagnosis="addDiagnosis"></search-diagnoses>
                        <div v-for="diagnosis in this.diagnoses">
                            <div class="badge badge-pill badge-secondary">
                                {{ diagnosis.name }} &#183; {{ diagnosis.icd }}
                                <a href="#" @click="removeDiagnosis(diagnosis.icd)"><i class="bi bi-x"></i></a>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="assessment">Assessment & Plan</label>
                        <textarea-autosize id="assessment" name="assessment" v-model="this.assessment"></textarea-autosize>
                    </div>
                    
                    <button type="button" class="btn btn-primary" @click="this.complete = !this.complete">Sign-off record</button>
                </form>
            </div>
            <div class="formatted-record" v-else>
                <div>
                    <b>History of Patient Illness</b>
                    <br/>
                    {{ this.hpi }}
                </div>
                <hr/>
                <div>
                    <b>Review of Systems</b>
                    <br/>
                    {{ this.ros }}
                </div>
                <hr/>
                <div>
                    <b>Physical Exam</b>
                    <br/>
                    {{ this.exam }}
                </div>
                <hr/>
                <div>
                    <b>Diagnoses</b>
                    <br/>
                    <ul>
                        <li v-for="diagnosis in this.diagnoses">{{ diagnosis.name }} &#183; {{ diagnosis.icd }}</li>
                    </ul>
                </div>
                <hr/>
                <div>
                    <b>Assessment & Plan</b>
                    <br/>
                    {{ this.assessment }}
                </div>
                <hr/>
                <button type="button" class="btn btn-primary" @click="this.complete = !this.complete">Ammend record</button>
            </div>
        </div>
        `,
    data() {
        return {
            hpi: "",
            ros: "",
            exam: "",
            diagnoses: new Set(),
            assessment: "",
            complete: null
        }
    },
    created() {
        this.hpi = this.recordObj.hpi;
        this.ros = this.recordObj.ros;
        this.exam = this.recordObj.exam;
        this.recordObj.diagnoses.forEach(icd => this.fetchDiagnosis(icd));
        this.assessment = this.recordObj.assessment;
        this.complete = this.recordObj.complete;
    },
    watch: {
        record() {
            this.hpi = this.recordObj.hpi;
            this.ros = this.recordObj.ros;
            this.exam = this.recordObj.exam;
            this.diagnoses = new Set();
            this.recordObj.diagnoses.forEach(icd => this.fetchDiagnosis(icd));
            this.assessment = this.recordObj.assessment;
            this.complete = this.recordObj.complete;
        },
        hpi(newValue) {
            this.updateRecord({ "hpi": newValue });
        },
        ros(newValue) {
            this.updateRecord({ "ros": newValue });
        },
        exam(newValue) {
            this.updateRecord({ "exam": newValue });
        },
        assessment(newValue) {
            this.updateRecord({ "assessment": newValue });
        },
        complete(newValue) {
            this.updateRecord({ "complete": newValue });
        }
    },
    computed: {
        recordObj() {
            if (this.record) {
                let record = JSON.parse(this.record);
                record.date = new Date(record.date);
                record.patient.DOB = new Date(record.patient.DOB);
                return record;
            }
            else
                return null;
        }
    },
    methods: {
        fetchDiagnosis(icd) {
            fetch('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' + icd)
                .then(response => response.json())
                .then(json => this.diagnoses.add(
                    {
                        icd: icd,
                        name: json[3][0][1]
                    })
                );
        },
        updateRecord(patch) {
            axios.patch('/api/records/' + this.recordObj._id + '/patch', patch)
                .then(() => this.$emit('recordChange'));
        },
        addDiagnosis(icd) {
            this.fetchDiagnosis(icd);
            axios.patch('/api/records/' + this.recordObj._id + '/addDiagnosis/' + icd)
                .then(() => this.$emit('recordChange'));
        },
        removeDiagnosis(icd) {
            this.diagnoses.forEach(diagnosis => {
                if (diagnosis.icd === icd)
                    this.diagnoses.delete(diagnosis);
            });
            axios.patch('/api/records/' + this.recordObj._id + '/removeDiagnosis/' + icd)
                .then(() => this.$emit('recordChange'));
        }
    }
})