import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { getAllPostIds, getPostData } from '@/lib/posts'
import homeStyles from '../../styles/Home.module.css'

export default function post({postData}:{
  postData:{
    date: string;
    title: string;
    id: string;
    contentHtml: string;
  }
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div className={homeStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  )
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = getAllPostIds()
  console.log('paths', paths)
  return{
    paths,
    fallback: false 
     //false 면 getStaticPaths로 리턴되지 않는 것은 모두 404 오류 페이지
     //true면 fallback 대체페이지 출력
  }
}

export const getStaticProps:GetStaticProps = async ({params}) =>{
  console.log('params-->',params);
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}


//일반적으로 getStaticPaths 를 사용하는 경우 ,getStaticProps 도 함께 사용해야함
// getStaticPaths 동적 경로생성하는데 사용, 
// getStaticProps 해당 경로에 필요한 데이터를 가져와 pre-rendering 하는데 사용
