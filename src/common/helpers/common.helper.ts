export class CommonHelper {
    static splitIntoPairs<T>(array: T[]): Array<[T, T?]> {
        const pairs: Array<[T, T?]> = [];

        for (let i = 0; i < array.length; i += 2) {
            pairs.push([array[i], array[i + 1]]);
        }

        return pairs;
    }
}
