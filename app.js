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
            billSumm: 0,
            billa: 0,
            billb: 0,
            billc: 0,
            billd: 0,
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

            var utilityBillSumm = parseFloat(this.utilityBillSumm);
            var teritoryBillSumm = parseFloat(this.teritoryBillSumm);
            var rentBillSumm = parseFloat(this.rentBillSumm);

            if (isNaN(utilityBillSumm)) {
                utilityBillSumm = 0;
            }
            if (isNaN(teritoryBillSumm)) {
                teritoryBillSumm = 0;
            }
            if (isNaN(rentBillSumm)) {
                rentBillSumm = 0;
            }


            if (utilityBillSumm > 0) {
                utilityBillSumm += 3;
            }
            if (teritoryBillSumm > 0) {
                teritoryBillSumm += 3;
            }
            if (rentBillSumm > 0) {
                rentBillSumm  += 3;
            }


            var sum = utilityBillSumm + teritoryBillSumm + rentBillSumm;

            this.billSumm = sum;
            this.billa = sum * 0.45;
            this.billb = sum * 0.15;
            this.billc = sum * 0.05;
            this.billd = sum * 0.30;
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