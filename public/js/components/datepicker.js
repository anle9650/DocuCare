app.component('datepicker', {
    props: {
        name: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        }
    },
    template: 
        /*html*/
        `<div id="picker-container" class="col">
            <input :name="this.name" type="date" class="form-control" id="datepicker" v-model="value">
        </div>`
})