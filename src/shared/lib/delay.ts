export function resolveAfter<T>(seconds: number, value?: T): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve(value), seconds * 1000))
}

export function rejectAfter<T>(seconds: number, value?: T): Promise<T> {
    return new Promise((_, reject) => setTimeout(reject(value), seconds * 1000))
}
