Vue.component('bill', {
    props: ['item'],
    template: `
      <div>
         <h3>{{item.title}}</h3>
         <div class="divFlex">
            <div>
                <label>Рахунок від</label>
                <input v-model="item.billDateFrom" v-on:change="$emit('change')"/>
            </div>
            <div>
                <label>Рахунок за</label>
                <input v-model="item.billDate" v-on:change="$emit('change')"/>
            </div>
            <div>
                <label>Номер рахунку</label>
                <input v-model="item.billNumber" v-on:change="$emit('change')"/>
            </div>
            <div>
                <label>Cума</label>
                <input  type="number"  v-model="item.price"  v-on:change="$emit('change')"/> +3грн комісія банку за платіж
            </div>
            <div>
                <input type="checkbox" v-model="item.enabled"  v-on:change="$emit('change')"/>
            </div>
        </div>
    </div>
  `
})

Vue.component('print-bill', {
    props: ['item'],
    template: `
        <tr>
            <td>{{item.billText}} за {{item.billDate}} від {{item.fromName}} рах №сф-{{item.billNumber}} від {{item.billDateFrom}}</td>
            <td class="paymentVal">{{item.price}}</td>
        </tr>
  `
})


var app = new Vue({
    el: '#app',
    data() {
        return {
            orgLabel: '',
            nomerRahunku: 'номер рахунку',
            summa: "сума",
            billDateFrom: this.getDateFrom(),
            currentMounth: this.getCurrentDate(),
            nextMounth: this.getNextDate(),
            utilityBill: "",
            utilityBillSumm: 0,
            teritoryBill: "",
            teritoryBillSumm: 170,
            rentBill: "",
            rentBillSumm: 0,
            electricityBill: "",
            electricityBillSumm: 0,
            billSumm: 0,
            billa: 0,
            billc: 0,
            billd: 0,
            prices: [
                {
                    'title': 'A',
                    'area': 0.65,
                    'price': 0
                },
                {
                    'title': 'B',
                    'area': 0.05,
                    'price': 0
                },
                {
                    'title': 'C',
                    'area': 0.3,
                    'price': 0
                }
            ],
            bills: [
                {
                    'id': 1,
                    'title': "Земля",
                    'fromName': 'Фоп Пітвало В.І.',
                    'billNumber': 0,
                    'price': 170,
                    'billDateFrom': '20.1.2021',
                    'billDate': '2.2021',
                    'billDateType': 'before',
                    'billText': 'Відшкодування витрат за користування земельною ділянкою ',
                    'enabled': null
                },
                {
                    'id': 2,
                    'title': "Комуналка",
                    'fromName': 'Фоп Пітвало В.І.',
                    'billNumber': 0,
                    'price': 0,
                    'billDateFrom': '20.1.2021',
                    'billDate': '2.2021',
                    'billDateType': 'after',
                    'billText': 'Відшкодування комунальних витрат',
                    'enabled': null
                },
                {
                    'id': 3,
                    'title': "Електрика",
                    'fromName': 'Фоп Пітвало В.І.',
                    'billNumber': 0,
                    'price': 0,
                    'billDateFrom': '20.1.2021',
                    'billDate': '2.2021',
                    'billDateType': 'after',
                    'billText': 'Відшкодування комунальних витрат за',
                    'enabled': null
                },
                {
                    'id': 4,
                    'title': "Оренда",
                    'fromName': 'Фоп Пітвало В.І.',
                    'billNumber': 0,
                    'price': 3750,
                    'billDateFrom': '20.1.2021',
                    'billDate': '2.2021',
                    'billDateType': 'before',
                    'billText': 'Оренда приміщення',
                    'enabled': null
                }
            ]
        }
    },
    methods: {
        change() {
            this.updateBill();
        },

        getDateFrom() {
            let currDate = new Date();
            var day = 20;
            var month = (" 0" + (currDate.getMonth() + 1)).slice(-2);
            var year = currDate.getFullYear();
            return [day, month, year].join('.');
        },
        getCurrentDate() {
            let currDate = new Date();
            var month = (" 0" + (currDate.getMonth() + 1)).slice(-2);
            var year = currDate.getFullYear();
            return [month, year].join('.');
        },
        getNextDate() {
            var now = new Date();
            if (now.getMonth() == 11) {
                var current = new Date(now.getFullYear() + 1, 0, 1);
            } else {
                var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            }

            var month = (" 0" + (current.getMonth() + 1)).slice(-2);
            var year = current.getFullYear();
            return [month, year].join('.');
        },

        updateBill() {
            this.billSumm = 0;
            this.bills.forEach((bill) => {
                if (bill.enabled) {
                    var price = parseFloat(bill.price);
                    if (!isNaN(price)) {
                        this.billSumm += price;
                        if (price) {
                            this.billSumm += 3;//bank fee
                        }
                    }
                }
            });

            localStorage.setItem('bills', JSON.stringify(this.bills));

            this.prices.forEach((price) => {
                price.price = (this.billSumm * price.area).toFixed(2);
            });
        },
        updateCurrentMonth(){
            this.bills.forEach((bill) => {
                if(bill.billDateType === 'after'){
                    bill.billDate = this.currentMounth;
                }
            });
        },
        updateNextMonth(){
            this.bills.forEach((bill) => {
                console.log(this.nextMounth);
                if(bill.billDateType === 'before'){
                    console.log(this.nextMounth);
                    bill.billDate = this.nextMounth;
                }
            });
        }
    },
    mounted() {
        this.updateBill();
        this.updateCurrentMonth();
        this.updateNextMonth();
    },
    beforeMount() {
        console.log('App mounted!');
        if (localStorage.getItem('orgLabel')) this.orgLabel = JSON.parse(localStorage.getItem('orgLabel'));
        if (localStorage.getItem('bills')) this.bills = JSON.parse(localStorage.getItem('bills'));
        this.updateBill();
    },
    watch: {
        orgLabel: {
            handler() {
                this.bills.forEach((bill) => {
                    bill.fromName = this.orgLabel;
                });
                localStorage.setItem('orgLabel', JSON.stringify(this.orgLabel));
            },
            // deep: true,
        },
        nextMounth: {
            handler() {
                this.updateNextMonth();
            },
            // deep: true,
        },
        currentMounth: {
            handler() {
                this.bills.forEach((bill) => {
                    if(bill.billDateType === 'after'){
                        bill.billDate = this.currentMounth;
                    }
                });
            },
            // deep: true,
        },
        billDateFrom: {
            handler() {
                this.bills.forEach((bill) => {
                    bill.billDateFrom = this.billDateFrom;
                });
            },
            // deep: true,
        },
    }
});
