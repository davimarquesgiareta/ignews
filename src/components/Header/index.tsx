import { SignInButton } from '../SignInButton';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ActiveLink } from '../ActiveLink';
import styles from './styles.module.scss'

export function Header(){

    const { asPath } = useRouter()

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"></img> 
                <nav>
                    <ActiveLink href='/' activeClassName={styles.active}  >
                        <a className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink href='/posts' prefetch activeClassName={styles.active} >
                        <a >Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton/>
            </div>
        </header>
    );
}