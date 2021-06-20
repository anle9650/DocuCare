app.component('datepicker', {
    props: {
        name: {
            type: String,
            default: null
        },
        modelValue: {
            type: String,
            default: null
        }
    },
    emits: {
        'update:modelValue': null
    },
    template: 
        /*html*/
        `<div id="picker-container" class="col">
            <input :name="this.name" type="date" class="form-control" id="datepicker" v-model="value">
        </div>`,
    mounted() {
        const self = this;
        self.$nextTick(function() {
            $('#datepicker').datepicker({
                container: "#picker-container",
                orientation: "left",
                autoclose: true,
                todayHighlight: true
            })
                .on('changeDate', function() {
                    self.value = $('#datepicker').val();
                });
        });
    },
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
})