export const randomString = (length: number) => {
    const set = `abcdefghijklmnopqrstuvwxyz0123456789`;

    let result = ``;
    for (let index = 0; index < length; index++) {
        const idx = Math.floor(Math.random() * set.length);
        result += set[idx];
    }
    return result;
};
