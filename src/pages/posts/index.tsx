import styles from './styles.module.scss'
import Head from "next/head"
import { useSession } from 'next-auth/client'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

type Posts = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string

}

interface PostProps {
 posts: Posts[]
}

export default function Posts({ posts }: PostProps){

    const [session] = useSession()

    return session? (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map( post => (
                        <Link href={`/posts/${post.slug}` } >
                            <a key={post.slug} href="#">
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                    </Link>
                    )) }
                </div>     
            </main>
        </>
    ): (
        <h1>Você precisa estar logado para ler os posts!</h1>
    )
}

export const getStaticProps: GetStaticProps = async()=>{
    const prismic = getPrismicClient()

    const response = await prismic.query(
       [ Prismic.predicates.at('document.type', 'post')],
       {
           fetch: ['post.title', 'post.content'],
           pageSize: 100,
       })

       const posts = response.results.map(post=>{
           return {
               slug: post.uid,
               title: RichText.asText(post.data.title),
               excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
               updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                   day: '2-digit',
                   month: 'long',
                   year: 'numeric'
               })
           }
       })

    return {
        props:{
            posts
        }
    }
}