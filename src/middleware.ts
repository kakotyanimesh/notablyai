
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { authenticatedRoutes, publicRoutes, REDIRECT_URL } from './lib/route_middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}



export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value}) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )


  const {
    data: { user },
  } = await supabase.auth.getUser()
  
//   const d = await supabase.auth.getUser()
//   console.log(d);
  

//   console.log(user);
  

  const urlPathName = request.nextUrl.pathname

  const isOnAuthPage = authenticatedRoutes.includes(urlPathName)
  const isPublicRoutes = publicRoutes.includes(urlPathName)

  if(isOnAuthPage){
    if(user){
        return NextResponse.redirect(new URL(REDIRECT_URL, request.nextUrl))
    }
    return
  }

  if(isPublicRoutes && user){
    return NextResponse.redirect(new URL(REDIRECT_URL, request.nextUrl))
  }

  if(!isPublicRoutes && !user){
    return NextResponse.redirect(new URL("/signin", request.nextUrl))
  }
  
  


  return supabaseResponse
}