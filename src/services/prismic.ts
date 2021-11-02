import Prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown){
    const prismic = Prismic.client(
        
        process.env.PRISMIC_ENDPOINT,
        {
            req,
            accessToken: 'MC5ZWUJhSmhFQUFDOEFkMG5W.fu-_vWPvv70R77-977-977-9FFJoMe-_ve-_ve-_ve-_ve-_vXXvv70PEu-_vVLvv73vv73vv73vv71P77-977-9Hu-_vQ'
        }
    )

    return prismic
}