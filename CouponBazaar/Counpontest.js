const peterPk = 'AaZAj9rcP6yoVVVypLxwBrpt7TvB41evF6hyjxUnVkxE';
const peterAddr = '3MxHj1zN6NYhPHvZ5Sa1hx96NTfoSWvLmyF';

const dAppAddr = '3MxbjHEMGavJhAwKvn8kS14ihgAZoBLZP4y';
const dAppPk = '4ny4FTTi5RDgJAZfUnLBCAJnDa1JFG7cyEkkCRQEbY43';



describe('Coupon Test Case', () => {
    it('Buy Coupon Alpha', async () => {
        let key1 = "status:purchase_item_A_customer_" + peterAddr
        let key2 = "price:purchase_item_A_customer_" + peterAddr

        let payment = [{
            amount: 30000000, assetId: null
        }]

        let invokePeter = invokeScript({
            dApp: dAppAddr,
            call: {
            function: "purchase",
            args: [
                {
                    "type": "string",
                    "value": "A"
                }
            ]
        },
            payment: payment
        }, {privateKey: peterPk})

        await expect(broadcast(invokePeter)).fulfilled
        let key1_val = await accountDataByKey(key1, dAppAddr)
        let key2_val = await accountDataByKey(key2, dAppAddr)
        

        expect(key1_val.value).equals("confirmed");
        expect(key2_val.value).equals(234000000);
        })

    it("Buy Coupon BETA high price", async() => {

        let payment = [{
            amount: 43100000, assetId: null
        }]

        let invokePeter = invokeScript({
            dApp: dAppAddr,
            call: {
            function: "purchase",
            args: [
                {
                    "type": "string",
                    "value": "B"
                }
            ]
        },
            payment: payment
        }, {privateKey: peterPk})

        await expect(broadcast(invokePeter)).rejectedWith("payment cant be higher than price")
    })

    it("Test no name", async () => {
        let payment = [{
            amount: 28100000, assetId: null
        }]

        let invokePeter = invokeScript({
            dApp: dAppAddr,
            call: {
            function: "purchase",
            args: []
        },
            payment: payment
        }, {privateKey: peterPk})

        await expect(broadcast(invokePeter)).rejectedWith("Unsuccessful purchase as item name was not given")
    })



    it("Test authorization", async() => {
        let invokeSetPrice = invokeScript({
            dApp: dAppAddr,
            call: {
                function: "setPrices",
                args: []
            }
        }, {privateKey: PeterPk});

        await expect(broadcast(invokeSetPrice)).rejectedWith("Only owner can set prices")
    })
})

async function clearDataStorage(addr, key) {
    broadcast(invokeScript({
        dApp: addr,
        fee: 900000,
        call: {
            function: "deleteEntry",
            args: [
                    {
                       "type": "string",
                       "value": key
                    }
                ]
            }
        }, {privateKey: dAppPk}))
}