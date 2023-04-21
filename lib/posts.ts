import fs from 'fs'
import matter from 'gray-matter';

import path from 'path'
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(),'posts')

console.log('process.cwd()--->', process.cwd());
console.log('postsDirectory ------>', postsDirectory);

export function getSortedPostsData(){
  const fileNames = fs.readdirSync(postsDirectory); //동기식Sync, 비동기식async
  console.log('filenames-->', fileNames)

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/.\md$/ ,'' );
      //id = 'pre-rendering'
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    console.log('matterResult', matterResult)
    return {
      id,
      ...(matterResult.data as {date:string, title:string})
    }
  });

  return allPostsData.sort((a,b) => {
    if(a.date < b.date) {
      return 1;
    }else{
      return -1;
    }
  })
}

export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return{
      params:{
        id: fileName.replace(/.\md$/ ,'' )
      }
    }
  })
}

export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents); //
  const processedContent = await remark().use(html).process(matterResult.content);
      //remark 는 markdown 을 html 로 변환
  //npm install remark remark-html --save
  const contentHtml = processedContent.toString();
  return{
    id,
    contentHtml,
    ...(matterResult.data as {data:string, title:string})
  };
}