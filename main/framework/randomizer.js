class Randomizer {
    static async getRandomElement(baseElements, exceptionsList) {
        const baseElementsList = baseElements.slice(0, baseElements.length);
        let element;
        do {
            element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
        } while ((exceptionsList.map((elem) => elem.elementId)).includes(element.elementId));

        return element;
    }

    static async getRandomString(hasUpperCase=false, hasNumber=false, hasCyrillic=false, chosenLetter=false, minLength=1, maxLength=10) {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      
        let length = await this.getRandomNumber(maxLength, minLength);
      
        let randomString = '';
        if (chosenLetter) randomString += chosenLetter;
      
        let requiredCharacters = '';
        if (hasUpperCase) requiredCharacters += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        if (hasNumber) requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
        if (hasCyrillic) requiredCharacters += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));

        randomString += requiredCharacters;
      
        const characters = (hasUpperCase ? upperCaseLetters : '') + lowerCaseLetters + (hasNumber ? numbers : '') + (hasCyrillic ? cyrillicLetters : '');
        const charactersLength = characters.length;
        const randomLength = length - randomString.length;

        for (let i = 0; i < randomLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return await this.stringShuffler(randomString);
    }

    static async getRandomNumber(max=9, min=1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async stringShuffler(inputString) {
        let array = inputString.split('');
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array.join('');
    }
}

export default Randomizer;