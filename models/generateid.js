//Generate a uniqe ID to the ticketnumber

module.exports = {
    createID() {
        let chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomSerial = '';
    
        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            randomSerial += chars.substring(randomNumber, randomNumber +1);
        }

        return randomSerial;
    }
}