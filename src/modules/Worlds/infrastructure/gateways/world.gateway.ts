import {APIBasePath} from '@common/utils';
import {IWorld} from '@modules/Worlds/infrastructure/interfaces';

export class WorldGateway
{
    private static routes = {
        list:
            {
                url: '/worlds',
                method: "GET"
            }
    }
    static async list(universeId: string): Promise<IWorld[]>
    {
        const url = `${APIBasePath}${this.routes.list.url}`;
        const query = new URLSearchParams();
        query.append('universeId', universeId)
        return fetch(url.concat('?', query.toString()), {
            method: this.routes.list.method
        })
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => { throw error });
    }
}