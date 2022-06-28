export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    const year: number = 2011 - (Math.floor(Math.random() * 3));
    const month: number = Math.floor(Math.random() * 12);
    const day: number = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}

export function fullName(firstName: string, lastName: string): string {
    let returnString = lastName + " " + firstName;
    return returnString;
}

export function calculateAge(birthDate: Date): number {
    let now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    if ((now.getMonth() < birthDate.getMonth()) || (now.getMonth() == birthDate.getMonth() && now.getDay() < birthDate.getDay())) age--;
    return age;
}

export function sortArray(array: any[], sortBy: string): any[] {
    const sortedArray: any[] = [];

    for (let i = 0; i < array.length; i++) {
        let cur = array[i];

        if (sortedArray.length == 0) {
            sortedArray.push(cur);
        }
        else {
            let foundPosition = false;
            for (let j = 0; j < sortedArray.length; j++) {
                if (sortedArray[j][sortBy] < cur[sortBy]) {
                    sortedArray.splice(j, 0, cur);
                    foundPosition = true;
                    break;
                }
            }
            if (!foundPosition) {
                sortedArray.push(cur);
            }
        }
    }
    return sortedArray.reverse();
}