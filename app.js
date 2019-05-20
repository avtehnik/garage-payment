var app = new Vue({
    el: '#app',
    data() {
        return {
            orgLabel: '',
            nomerRahunku: 'номер рахунку',
            summa: "сума",
            fromDate: this.getPreviosDate(),
            currentMounth: this.getCurrentDate(),
            nextMounth: this.getNextDate(),
            utilityBill: "",
            utilityBillSumm: 0,
            teritoryBill: "",
            teritoryBillSumm: 0,
            rentBill: "",
            rentBillSumm: 0,
            billa: 0,
            billb: 0,
            billc: 0,
        }
    },
    methods: {
        getPreviosDate() {
            let currDate = new Date();
            let strDate = "20" + "." + currDate.getMonth().toString() + '.' + currDate.getFullYear().toString();
            return strDate;
        },
        getCurrentDate() {
            let currDate = new Date();
            let strDate = (currDate.getMonth() + 1).toString() + '.' + currDate.getFullYear().toString();
            return strDate;
        },
        getNextDate() {
            let currDate = new Date();
            let strDate = (currDate.getMonth() + 2).toString() + '.' + currDate.getFullYear().toString();
            return strDate;
        },
        updateBill() {

            var sum =
                parseFloat(this.utilityBillSumm) +
                parseFloat(this.teritoryBillSumm) +
                parseFloat(this.rentBillSumm);

            this.billa = sum * 0.45;
            this.billb = sum * 0.15;
            this.billc = sum * 0.05;
        }
    },
    mounted() {
        console.log('App mounted!');
        if (localStorage.getItem('orgLabel')) this.orgLabel = JSON.parse(localStorage.getItem('orgLabel'));
        if (localStorage.getItem('utilityBillSumm')) this.utilityBillSumm = JSON.parse(localStorage.getItem('utilityBillSumm'));
        if (localStorage.getItem('teritoryBillSumm')) this.teritoryBillSumm = JSON.parse(localStorage.getItem('teritoryBillSumm'));
        if (localStorage.getItem('rentBillSumm')) this.rentBillSumm = JSON.parse(localStorage.getItem('rentBillSumm'));
    },
    watch: {
        orgLabel: {
            handler() {
                console.log('orgLabel changed!');
                localStorage.setItem('orgLabel', JSON.stringify(this.orgLabel));
            },
            // deep: true,
        },
        utilityBillSumm: {
            handler() {
                this.updateBill();
                console.log('utilityBillSumm changed!');
                localStorage.setItem('utilityBillSumm', JSON.stringify(this.utilityBillSumm));
            },
            // deep: true,
        },
        teritoryBillSumm: {
            handler() {
                this.updateBill();
                console.log('teritoryBillSumm changed!');
                localStorage.setItem('teritoryBillSumm', JSON.stringify(this.teritoryBillSumm));
            },
            // deep: true,
        },
        rentBillSumm: {
            handler() {
                this.updateBill();
                console.log('rentBillSumm changed!');
                localStorage.setItem('rentBillSumm', JSON.stringify(this.rentBillSumm));
            },
            // deep: true,
        },
    }
});