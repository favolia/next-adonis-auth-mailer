import { NextResponse } from "next/server"

const url = "http://localhost:3333/"

export const GET = async () => {
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    return NextResponse.json(data)
}