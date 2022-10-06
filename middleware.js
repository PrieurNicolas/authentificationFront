import { NextResponse } from "next/server";


export default function middleware(req) {

    let verif = req.cookies.get("accessToken");
    let url = req.url

    if (!verif && url.includes('/dashboard/user')) {
        return NextResponse.redirect('http://localhost:3000/login')
    }

    if (!verif && url.includes('/dashboard')) {
        return NextResponse.redirect('http://localhost:3000/login')
    }

    if (verif && url === "http://localhost:3000/") {
        return NextResponse.redirect('http://localhost:3000/dashboard/user')
    }
}