import styles from './styles.module.scss'

interface SubscribeButtonProps {
    pricedId: string;
}

export function SubscribeButton ({ priceId }: SubscribeButtonProps){
    return(
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe Now!
        </button>
    )
}