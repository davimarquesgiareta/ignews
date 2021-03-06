import { GetServerSideProps } from "next"
import Head from 'next/head'
import { getSession, useSession } from "next-auth/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"

import styles from './post.module.scss'

interface PostProps {
    post: {
        slug: string,
        title: string,
        content: string,
        udpatedAt: string
    }
}

export default function Post({post}){
    const [session] = useSession()

    return session? (
        <>
            <Head>
                <title>{post.title } | Ignews </title>
            </Head>

            
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={styles.postContent}
                        dangerouslySetInnerHTML ={{__html: post.content}} 
                    />
                </article>
            </main>
        </>
    ) : (<h1> Você precisa estar logado para ver este post!</h1>)
}

export const getServerSideProps: GetServerSideProps = async ({ req, params}) =>{
    const session = await getSession({req})
    console.log("ta ou nao")
   
    const { slug } = params;

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), { })

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-Br', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        }
    }
}