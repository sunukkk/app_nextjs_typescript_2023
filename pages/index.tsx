/* import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] }) */

import { GetStaticProps, } from "next"
import homestyles from '../styles/Home.module.css'
import Head from "next/head"
import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"



const Home = ({allPostsData}:{
  
  allPostsData : {
    date:string, title:string, id:string
  }[]
  
}) => {
  return (
    <div>
      <Head>
        <title> Your Name </title>
      </Head>
      <section className={homestyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homestyles.headingMd} ${homestyles.padding1px}`}>
        <h2 className={homestyles.headingLg}>Blog</h2>
        <ul className={homestyles.list}>
          {allPostsData.map(({date, title, id}) => (
            <li className = {homestyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <span>{title}</span>
              </Link>
              <br />
              <small className={homestyles.lightText}>
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return{
    props : {
     allPostsData // date, title , id 포함, date로 정렬되어있음
    }
  }
}

//getStaticProps 함수를 async로 export 하면, getStaticProps에서 retun 되는 props를 가지고
//페이지를 pre-render. build time에 페이지를 렌더링 한다.


//getStaticProps / getStaticPaths / getServerSideProps