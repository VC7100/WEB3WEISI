const ericAddr = "3N6qANATfYJFY1hM9Bu9ACAHMQY3Q1dRTVM";

const bobPk = "14kE6E1fAPh9d6TKEXkwBXkZxCLf9JctmtaQL17J3HLv";



describe('Testing Multisig Code', () => {
      
    it('Postive Testing', async () => {
        const aliceTx = transfer({amount: 1300000, fee: 50000, recipient: ericAddr});
        const bobTx = transfer(aliceTx, {privateKey: bobPk});
        expect(bobTx.proofs.length).to.equal(2); 
        await expect(broadcast(bobTx)).fulfilled; 
    });




    
    it('Negative Testing', async () => {
        const aliceTx = transfer({amount: 22000000, fee: 400000, recipient: ericAddr});
        await expect(broadcast(aliceTx)).rejectedWith("Transaction is denied");
    })
})