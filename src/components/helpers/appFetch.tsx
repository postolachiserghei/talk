export default async function (action: 'list' | 'create' | 'update' | 'delete' | 'view' | 'search', params: object,
                               method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST') {

    const fetchData = async () => {

        let conf: any = {
            method: method,
        }

        if (method !== 'GET') {
            conf.body = JSON.stringify(
                {
                    data: params
                }
            )
        }

        let u = new URL(`https://api.talk.arew.ru`)

        u.searchParams.set('action', action)
        Object.keys(params).map((e) => u.searchParams.set(e, Object(params)[e]))

        return fetch(u, conf).then(async (r) => {
            return await r.json()
        })
    }

    return await fetchData()
}
