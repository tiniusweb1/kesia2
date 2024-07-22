// src/types.ts
// src/types.ts
export type ImageResult =
    | { status: 'fulfilled'; value: string }
    | { status: 'rejected'; reason: ImageError }

export interface ImageError extends Error {
    message: string
    code?: string
}

export interface ErrorReason {
    message: string
    code: string
}
