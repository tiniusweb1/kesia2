// src/types.ts
export interface Image {
    url: string
    id: string
}

export interface ImageError extends Error {
    message: string
    name: string
    code?: string
}

export type ImageResult =
    | { status: 'fulfilled'; value: string | { url: string; id: string } }
    | { status: 'rejected'; reason: ImageError }
    | { status: 'placeholder'; value: string }

export interface ErrorReason {
    message: string
    code?: string
    name: string
}
