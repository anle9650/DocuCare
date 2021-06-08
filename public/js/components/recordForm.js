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
        `<div class="pb-2 mt-4 mb-2 border-bottom">
            <h1>
                {{ this.recordObj.patient.name.first }} {{ this.recordObj.patient.name.last }} &#183; {{ this.recordObj.date.toLocaleDateString("en-US") }}
            </h1>
            <div class="text-muted">{{ this.recordObj.patient.gender }} &#183; Date of birth: {{ this.recordObj.patient.DOB.toLocaleDateString("en-US") }}</div>
        </div>
        <div v-if="!this.complete">
            <form onsubmit="return false;">
                <div class="form-group"> 
                    <label for="hpi">History of Patient Illness</label>
                    <textarea-autosize id="hpi" name="hpi" :value="this.hpi" :key="this.recordObj._id" @input="updateHpi"></textarea-autosize>
                </div>
                <div class="form-group">
                    <label for="ros">Review of Systems</label>
                    <textarea-autosize id="ros" name="ros" :value="this.ros" :key="this.recordObj._id" @input="updateRos"></textarea-autosize>
                </div>
                <div class="form-group">
                    <label for="exam">Physical Exam</label>
                    <textarea-autosize id="exam" name="exam" :value="this.exam" :key="this.recordObj._id" @input="updateExam"></textarea-autosize>
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
                    <textarea-autosize id="assessment" name="assessment" :value="this.assessment" :key="this.recordObj._id" @input="updateAssessment"></textarea-autosize>
                </div>
                
                <button type="button" class="btn btn-primary" @click="toggleComplete">Sign-off record</button>
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
            <button type="button" class="btn btn-primary" @click="toggleComplete">Ammend record</button>
        </div>`,
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
        updateHpi(updatedValue) {
            this.hpi = updatedValue;
            this.updateRecord({ "hpi": updatedValue });
        },
        updateRos(updatedValue) {
            this.ros = updatedValue;
            this.updateRecord({ "ros": updatedValue });
        },
        updateExam(updatedValue) {
            this.exam = updatedValue;
            this.updateRecord({ "exam": updatedValue });
        },
        updateAssessment(updatedValue) {
            this.assessment = updatedValue;
            this.updateRecord({ "assessment": updatedValue });
        },
        addDiagnosis(icd) {
            this.fetchDiagnosis(icd);
            axios.patch('/api/records/' + this.recordObj._id + '/addDiagnosis', { "diagnosis": icd })
                .then(() => this.$emit('recordChange'));
        },
        removeDiagnosis(icd) {
            this.diagnoses.forEach(diagnosis => {
                if (diagnosis.icd === icd)
                    this.diagnoses.delete(diagnosis);
            });
            axios.patch('/api/records/' + this.recordObj._id + '/removeDiagnosis', { "diagnosis": icd })
                .then(() => this.$emit('recordChange'));
        },
        toggleComplete() {
            this.complete = !this.complete;
            this.updateRecord({ "complete": this.complete });
        }
    }
})