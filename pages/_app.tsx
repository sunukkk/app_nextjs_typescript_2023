import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Footer from './component/Footer'
import Header from './component/Header'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </div>
  )
  
  
}


/*

_app.tsx
최초로 실행되는 컴포넌트
공통레이아웃 만들때 사용

Component : 현재ㅔㅍ이지, 변경시 해당 component 변경
pageProps : DataFetching 메서드를 이용해, 미리 가져온 초기 객체
이 메서드를 사용하지 않으면 빈 객체 전달

_app.tsx, .document.tsx : 두 파일은 server only file
Next.js 서버로직에 사용되는 파일, client 에서는 사용 불가

*/